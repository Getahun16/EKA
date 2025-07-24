"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import LoadingSpinner from "./LoadingSpinner";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

export default function PartnerSlider() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/partner");

        if (!res.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setPartners(data);
        } else {
          setPartners([]);
          setError("Invalid partners data format");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load partners"
        );
        setPartners([]);
      } finally {
        setIsLoading(false);
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

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        ) : partners.length === 0 ? (
          <p className="text-sky-400">No partners found.</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
            className="py-4"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300 p-2">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white shadow-md">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 80px, 100px"
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
