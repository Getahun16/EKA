"use client";

import { useEffect, useState } from "react";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then(setFaqs);
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-sky-500 mb-12 text-center">
        Frequently Asked Questions (FAQs)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className={
                `transition-shadow duration-300 rounded-2xl border border-gray-300 bg-white/80 hover:bg-sky-50 ` +
                (isOpen ? "ring-2 ring-sky-400" : "")
              }
            >
              <button
                className="w-full flex justify-between items-center px-8 py-6 text-left text-lg font-semibold text-sky-800 focus:outline-none transition-colors duration-200 group cursor-pointer"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span className="transition-colors duration-200 group-hover:text-sky-600">
                  {faq.question}
                </span>
                <span
                  className={
                    `ml-4 text-2xl font-bold transition-transform duration-300 ` +
                    (isOpen ? "rotate-180 text-sky-500" : "text-gray-400")
                  }
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: isOpen ? 200 : 0,
                  opacity: isOpen ? 1 : 0,
                  padding: isOpen ? "1.5rem 2rem" : "0 2rem",
                  background: isOpen ? "#f9fafb" : "transparent",
                  borderTop: isOpen ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div className="text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
