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

  const amharicFunctions = [
    "በየቀኑ 200 ሊትር ውሃ ያጣራል",
    "መርዛማ ነገሮችን እና አሲድ በሽንት ያስወግዳል",
    "የደም ግፊትን ይቆጣጠራል",
    "የጨው መጠንን ይቆጣጠራል",
    "የቀይ ደም ሴል መራባት ይረዳል",
  ];

  const preventionEnglish = [
    "Control high blood pressure",
    "Reduce salt and protein intake",
    "Stay physically active and manage weight",
    "Avoid unnecessary painkillers",
    "Stop smoking and check kidneys regularly",
  ];

  const preventionAmharic = [
    "ስኳርን እና ቅባትን ማስተካከል",
    "ሲጋራ አለመጨስ",
    "የሰውነት ክብደትን ማስተካከል",
    "ጤናማ መመገብ እና ንቁ እንቅስቃሴ",
    "ኩላሊትን መመርመር",
  ];

  type ListItemProps = {
    text: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    color?: string;
  };

  const ListItem = ({
    text,
    icon: Icon,
    color = "text-blue-300",
  }: ListItemProps) => (
    <li className="flex items-start gap-3 text-gray-800">
      <Icon className={`${color} mt-1 shrink-0`} size={20} />
      <span>{text}</span>
    </li>
  );

  return (
    <section className="bg-gray-100 py-12 px-4 lg:px-20 mt-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-sky-500 mb-4">
            Our Kidney
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Learn about the vital role of the kidneys, how to protect them, and
            the impact of kidney disease.
          </p>
        </div>

        {/* Function of Kidney */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Function of the Kidney
            </h3>
            <ul className="space-y-3 leading-relaxed">
              {englishFunctions.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  icon={Droplet}
                  color="text-sky-500"
                />
              ))}
            </ul>

            <h4 className="mt-6 text-lg font-semibold text-blue-300">
              የኩላሊት ተግባር
            </h4>
            <ul className="space-y-3 leading-relaxed mt-2">
              {amharicFunctions.map((item, i) => (
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
              src="/images/diagram.jpg"
              alt="Kidney Diagram"
              width={500}
              height={350}
              className="rounded-lg shadow w-full max-w-md"
            />
          </div>
        </div>

        {/* How to Prevent Kidney Disease */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-300 mb-6 text-center">
            How to Prevent Kidney Disease
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-3 leading-relaxed">
              {preventionEnglish.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  icon={ShieldCheck}
                  color="text-blue-300"
                />
              ))}
            </ul>
            <ul className="space-y-3 leading-relaxed">
              {preventionAmharic.map((item, i) => (
                <ListItem
                  key={i}
                  text={item}
                  icon={ShieldCheck}
                  color="text-blue-300"
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Kidney Disease in Ethiopia */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">
            Kidney Disease in Ethiopia
          </h3>
          <p className="text-gray-800 leading-relaxed mb-3">
            In Ethiopia, kidney disease is rising due to lifestyle changes,
            hypertension, and diabetes. EKA works with the Ministry of Health to
            raise awareness and reduce the impact.
          </p>
          <p className="text-gray-800 leading-relaxed">
            በኢትዮጵያ ኩላሊት ሕመም በፍጥነት በመጨመር ላይ ነው። የህይወት መኖሪያ ቀውስና ሌሎች ምክንያቶች የተነሳ
            በሰብስ ስሜት እና አደጋ እየተጨመረ ነው።
          </p>
        </div>

        {/* World Kidney Day */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">
            World Kidney Day
          </h3>
          <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto">
            World Kidney Day is celebrated every second Thursday of March to
            raise global awareness about the importance of kidney health and the
            prevention of kidney-related diseases.
          </p>
        </div>
      </div>
    </section>
  );
}
