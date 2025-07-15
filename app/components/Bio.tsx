export default function KidneyAssociationBio() {
  return (
    <section className="max-w-6xl mx-auto p-6 sm:p-10 bg-white rounded-3xl shadow-xl mt-12 border border-gray-100">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-8 text-center bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
        Ethiopian Kidney Association
      </h1>

      {/* Introduction */}
      <div className="mb-12">
        <div className="relative">
          <div className="absolute -left-4 top-0 h-full w-1 bg-sky-400 rounded-full"></div>
          <p className="text-gray-700 leading-relaxed text-lg sm:text-xl pl-6">
            The{" "}
            <span className="font-semibold text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded-md">
              Ethiopian Kidney Association (EKA)
            </span>{" "}
            is a leading organization dedicated to advancing kidney health in
            Ethiopia since 1998 E.C (2005 GC). For over 17 years, EKA has united
            nephrologists and healthcare professionals to improve prevention,
            care, and research in kidney disease.
          </p>
        </div>

        <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-gray-700 italic">
            &quot;Guided by 19 central and 9 regional board members, EKA
            celebrates World Kidney Day, World Transplantation Day, and hosts an
            annual nephrology conference. The association partners globally to
            strengthen nephrology care through fellowships, grants, and
            training&mdash;building a healthier future for kidney patients
            across Ethiopia.&quot;
          </p>
        </div>
      </div>

      {/* Members Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Board Members */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-sky-400 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-sky-700">Board Members</h2>
          </div>
          <ul className="space-y-4">
            {[
              ["Dr. Lisane Seifu", "President"],
              ["Dr. Tewodros Agonafir", "V/President"],
              ["Mr. Takele Kassa", "Secretary"],
              ["Mr. Worku Tadesse", "Accountant"],
              ["Dr. Bezaye Abebe", "Member"],
              ["Dr. Birhanu Worku", "Member"],
              ["Dr. Seifemichael Getachew", "Member"],
              ["Dr. Mr. Getachew Bayu", "Member"],
              ["Dr. Wubeshet Jote", "Member"],
              ["Dr. Getachew Wondafrash", "Member"],
            ].map(([name, role], index) => (
              <li key={index} className="flex items-start group">
                <div className="h-2 w-2 bg-sky-300 rounded-full mt-2 mr-3"></div>
                <div>
                  <span className="text-gray-800 font-medium group-hover:text-sky-700 transition-colors">
                    {name}
                  </span>{" "}
                  <span className="text-sm text-sky-600 font-medium bg-sky-100 px-2 py-0.5 rounded-full">
                    {role}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Branch Members */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-sky-400 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-sky-700">Branch Members</h2>
          </div>
          <ul className="space-y-4">
            {[
              ["Dr. Muluken Tamirat", "Hawassa Representative"],
              ["Dr. Fethi Mohammed", "Diredawa Representative"],
              ["Dr. Daniel Arega", "Nazereth Representative"],
              ["Dr. Workageghu Hailu", "Gondar Representative"],
            ].map(([name, role], index) => (
              <li key={index} className="flex items-start group">
                <div className="h-2 w-2 bg-sky-300 rounded-full mt-2 mr-3"></div>
                <div>
                  <span className="text-gray-800 font-medium group-hover:text-sky-700 transition-colors">
                    {name}
                  </span>{" "}
                  <span className="text-sm text-sky-600 font-medium bg-sky-100 px-2 py-0.5 rounded-full">
                    {role}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
