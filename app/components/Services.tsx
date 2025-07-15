"use client";

import { HeartPulse, Stethoscope, Microscope, Users } from "lucide-react";

const services = [
  {
    icon: HeartPulse,
    title: "Kidney Health Screening",
    description:
      "Early detection and regular screening to monitor kidney function and prevent disease progression.",
  },
  {
    icon: Stethoscope,
    title: "Patient Support Programs",
    description:
      "Comprehensive support including counseling, education, and assistance for patients and families.",
  },
  {
    icon: Microscope,
    title: "Research & Awareness",
    description:
      "Advancing kidney disease research and raising awareness about prevention and treatment.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description:
      "Engaging local communities to educate and promote healthy lifestyles for kidney health.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-extrabold text-sky-500 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Icon className="mx-auto mb-4 text-sky-500" size={48} />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                {title}
              </h3>
              <p className="text-sky-800 leading-relaxed text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
