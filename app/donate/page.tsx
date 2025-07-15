"use client";

import Image from "next/image";
import { FaMobileAlt, FaUniversity, FaEnvelope } from "react-icons/fa";
import { MdPhone } from "react-icons/md";

export default function DonatePage() {
  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-3xl shadow-xl mt-12 border border-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-500  mb-6">
        Support Our Work
      </h1>

      <p className="text-gray-700 text-lg mb-10 text-center max-w-2xl mx-auto leading-relaxed">
        Your donation helps us advance kidney health awareness, prevention, and
        care across Ethiopia. Every contribution matters.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telebirr */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/telebirr.png"
              alt="Telebirr"
              width={40}
              height={40}
            />
            <h2 className="text-xl font-semibold text-sky-500">Telebirr</h2>
          </div>
          <p className="text-gray-700">
            <FaMobileAlt className="inline text-sky-500 mr-2" />
            Account:{" "}
            <span className="font-semibold text-sky-600 ml-1">0922-345678</span>
          </p>
        </div>

        {/* CBE */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/cbe.jpeg" alt="CBE" width={40} height={40} />
            <h2 className="text-xl font-semibold text-sky-500">
              Commercial Bank of Ethiopia
            </h2>
          </div>
          <p className="text-gray-700 mb-1">
            <FaUniversity className="inline text-sky-500 mr-2" />
            Account Name: Ethiopian Kidney Association
          </p>
          <p className="text-gray-700">
            💳 Account Number:{" "}
            <span className="font-semibold text-sky-600">1000123456789</span>
          </p>
        </div>

        {/* BOA */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/aby.png"
              alt="Bank of Abyssinia"
              width={40}
              height={40}
            />
            <h2 className="text-xl font-semibold text-sky-500">
              Bank of Abyssinia
            </h2>
          </div>
          <p className="text-gray-700 mb-1">
            <FaUniversity className="inline text-sky-500 mr-2" />
            Account Name: Ethiopian Kidney Association
          </p>
          <p className="text-gray-700">
            💳 Account Number:{" "}
            <span className="font-semibold text-sky-600">0112233445566</span>
          </p>
        </div>

        {/* Others */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <h2 className="text-xl font-semibold text-sky-500 mb-4">
            Other Banks
          </h2>
          <p className="text-gray-700 mb-2">
            For additional bank details or international transfers, please
            contact us:
          </p>
          <p className="text-gray-700 mb-1">
            <MdPhone className="inline text-sky-500 mr-2" />
            <span className="font-semibold text-sky-600">+251 911 123456</span>
          </p>
          <p className="text-gray-700">
            <FaEnvelope className="inline text-sky-500 mr-2" />
            <span className="font-semibold text-sky-600">info@eka.org.et</span>
          </p>
        </div>
      </div>
    </section>
  );
}
