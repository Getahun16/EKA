"use client";

import { useState } from "react";
import Image from "next/image";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="about"
      className="py-20 bg-white max-w-7xl mx-auto px-6 sm:px-10 lg:px-20"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="flex-1 w-full">
          <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <Image
              src="/images/about.png"
              alt="Kidney Health Awareness"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-sky-500 mb-6 leading-tight">
            About Us
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
            The{" "}
            <span className="font-semibold text-sky-500">
              Ethiopian Kidney Association
            </span>{" "}
            works to prevent kidney disease and hypertension in Ethiopia by
            raising public awareness, hosting educational seminars, and
            conducting screening programs. We promote kidney and high blood
            pressure care in collaboration with healthcare institutions
            nationwide.
          </p>

          {/* Collapsible Content */}
          {showMore && (
            <>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
                በሰፊው ለህብረተሰቡና ለጤና ባለሙያዎች ስለኩላሊትና የደም ግፊት በሽታ መከላከያና ሕክምና መሰረታዊ
                ምርመራዎችን በመስጠት፣ በተመሳሳይ ዓይነት ህክምና በአገራችን እንዲስፋፋ ከተወሰኑ አካላት ጋር
                በመተባበር ስራ እንከናወናለን።
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                እኛ በኩላሊት ታማሚዎችና ባለሙያዎች መካከል የኩላሊት ሕመም መገንዘብና ትምህርት ማቅረብ ላይ
                እየተጋለጠን ነው።
              </p>
            </>
          )}

          {/* See More / See Less Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 inline-block text-sm sm:text-base font-semibold text-sky-500 border border-sky-500 rounded-full px-5 py-2 hover:bg-sky-500 hover:text-white transition cursor-pointer"
          >
            {showMore ? "See Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
}
