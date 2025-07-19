"use client";

import Image from "next/image";
import { Droplet, ShieldCheck } from "lucide-react";

export default function OurKidney() {
  const englishFunctions = [
    "Filter up to 200 liters of blood daily",
    "Eliminate waste and excess water",
    "Maintain blood pressure balance",
    "Regulate minerals and calcium metabolism",
    "Support red blood cell production",
  ];

  const preventionEnglish = [
    "Control high blood pressure",
    "Reduce salt and protein intake",
    "Stay physically active and manage weight",
    "Avoid unnecessary painkillers",
    "Stop smoking and check kidneys regularly",
  ];

  type ListItemProps = {
    text: string;
    icon: React.ElementType;
    color?: string;
  };

  const ListItem = ({
    text,
    icon: Icon,
    color = "text-blue-300",
  }: ListItemProps) => (
    <li className="flex items-start gap-3 text-gray-800 text-base leading-relaxed">
      <Icon className={`${color} mt-1 shrink-0`} size={20} />
      <span>{text}</span>
    </li>
  );

  return (
    <section className="bg-gray-100 py-12 px-4 lg:px-20 mt-16">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-500 mb-4">Our Kidney</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Learn about the vital role of the kidneys, how to protect them, and
            the impact of kidney disease.
          </p>
        </div>

        {/* Function of Kidney */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              Function of the Kidney
            </h3>
            <ul className="space-y-4">
              {englishFunctions.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  icon={Droplet}
                  color="text-sky-500"
                />
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/new2.png"
              alt="Kidney Diagram"
              width={500}
              height={350}
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* How to Prevent Kidney Disease */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-sky-500 mb-6">
              How to Prevent Kidney Disease
            </h3>
            <ul className="space-y-4">
              {preventionEnglish.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  icon={ShieldCheck}
                  color="text-green-500"
                />
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/new1.png" // Make sure this image exists in /public/images/
              alt="Preventing Kidney Disease"
              width={450}
              height={300}
              className="rounded-xl shadow-lg object-cover max-w-full"
            />
          </div>
        </div>

        {/* Kidney Disease in Ethiopia */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            Kidney Disease in Ethiopia
          </h3>
          <p className="text-gray-800 leading-relaxed">
            In Ethiopia, kidney disease is rising due to lifestyle changes,
            hypertension, and diabetes. EKA works with the Ministry of Health to
            raise awareness and reduce the impact.
          </p>
        </div>

        {/* World Kidney Day */}
        <div className="bg-sky-50 rounded-xl shadow-lg p-8 md:p-12 text-center border border-blue-200">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4c1.657 0 3 1.79 3 4s-1.343 4-3 4-3-1.79-3-4 1.343-4 3-4zm0 0v16"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-sky-600 mb-4">
            World Kidney Day
          </h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            World Kidney Day is celebrated every second Thursday of March to
            raise global awareness about the importance of kidney health and the
            prevention of kidney-related diseases. It’s a call to action for
            education and early detection worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
