import React from "react";

interface HowCalcWorksSectionProps {
  subtitle?: string;
  title: React.ReactNode;
  description: string;
  steps: string[];
  gradient?: boolean; // optional toggle for background gradient
}

const HowCalcWorksSection: React.FC<HowCalcWorksSectionProps> = ({
  subtitle = "HOW IT WORKS",
  title,
  description,
  steps,
  gradient = true,
}) => {
  return (
    <section
      className={`w-full ${
        gradient
          ? "bg-gradient-to-r from-[#F5F3FF] via-[#FAF5FF] to-[#F4EDFF]"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-col max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-red-500 mb-3 uppercase tracking-wide">
            {subtitle}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        <div className="w-full text-start md:text-lg text-base space-y-6">
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{description}</p>
          <ul className="w-full text-gray-700 text-base max-w-xl mx-auto list-disc list-inside space-y-2 text-left">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowCalcWorksSection;
