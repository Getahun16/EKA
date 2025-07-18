"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

export default function PartnerSlider() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partner");
        if (!res.ok) throw new Error("Failed to fetch partners");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPartners(data);
        } else {
          console.error("Unexpected response:", data);
          setPartners([]);
        }
      } catch (err) {
        console.error("Partner fetch error:", err);
        setPartners([]);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-500 mb-8">
          Our Partners
        </h2>

        {partners.length === 0 ? (
          <p className="text-sky-400">No partners found.</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      priority={false}
                    />
                  </div>
                  <p className="text-sm font-medium text-sky-700 text-center">
                    {partner.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
