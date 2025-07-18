"use client";

import { useState } from "react";
import {
  Users,
  Stethoscope,
  Megaphone,
  BookOpenCheck,
  Microscope,
  Landmark,
  FileBarChart2,
  Syringe,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Community-Based CKD Screening",
    description:
      "Offering kidney disease screening services directly within local communities for early detection and intervention.",
  },
  {
    icon: BookOpenCheck,
    title: "CME & Capacity-Building",
    description:
      "Organizing Continuing Medical Education (CME) programs and training for healthcare workers to improve kidney care.",
  },
  {
    icon: Megaphone,
    title: "Public Awareness & Education",
    description:
      "Running campaigns to educate the public about kidney health, prevention, and treatment options.",
  },
  {
    icon: Stethoscope,
    title: "Nephrology Workshop Facilitation",
    description:
      "Hosting specialized workshops to enhance skills and knowledge in nephrology for medical professionals.",
  },
  {
    icon: Landmark,
    title: "Advocacy and Policy Engagement",
    description:
      "Working with government and stakeholders to influence health policy and improve kidney care systems.",
  },
  {
    icon: Microscope,
    title: "Research and Data Collection",
    description:
      "Conducting studies and collecting data to inform decision-making and improve kidney disease outcomes.",
  },
  {
    icon: Syringe,
    title: "Hemodialysis Access Advocacy",
    description:
      "Advocating for better access to affordable and quality hemodialysis services across Ethiopia.",
  },
  {
    icon: FileBarChart2,
    title: "Health Program Evaluation",
    description:
      "Assessing the effectiveness of kidney health initiatives to inform future planning and strategy.",
  },
];

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate current services slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentServices = services.slice(indexOfFirst, indexOfLast);

  // Calculate total pages
  const totalPages = Math.ceil(services.length / itemsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section id="services" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-extrabold text-sky-500 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {currentServices.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Icon className="mx-auto mb-4 text-sky-500" size={48} />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                {title}
              </h3>
              <p className="text-sky-800 leading-relaxed text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-10 flex justify-center space-x-3">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 rounded cursor-pointer ${
                number === currentPage
                  ? "bg-sky-600 text-white"
                  : "bg-white text-sky-600 border border-sky-600"
              } hover:bg-sky-500 hover:text-white transition`}
              aria-current={number === currentPage ? "page" : undefined}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
