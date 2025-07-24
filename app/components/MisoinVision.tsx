import { Target, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function MissionVision() {
  const data = await prisma.missionVision.findMany();
  const mission = data.find((d) => d.type === "mission");
  const vision = data.find((d) => d.type === "vision");

  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-500 mb-4 bg-clip-text bg-gradient-to-r from-sky-600 to-sky-500 text-transparent">
            Our Mission & Vision
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Dedicated to raising awareness and advancing kidney and blood
            pressure care across Ethiopia.
          </p>
        </div>

        {/* Updated Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-300 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-blue-300 text-sky-500 mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {mission?.description || "No mission added yet."}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-300 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-blue-300 text-sky-500 mr-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {vision?.description || "No vision added yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
