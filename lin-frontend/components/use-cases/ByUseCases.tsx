import React from "react";

const ByUseCases = ({
  loanType,
  loanUseCaseData,
}: {
  loanType: string;
  loanUseCaseData: { title: string; description: string }[];
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20">
      <div className="flex flex-col justify-center items-center-safe space-y-6 text-center w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full">
          <span className="text-primary font-semibold leading-tight uppercase">
            by use cases
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            In What Cases Do You Need a{" "}
            <span className="text-primary">{loanType} Loan?</span>
          </h2>
          <p className="text-center text-gray-600 my-1.5 max-w-3xl">
            Our instant loan process is designed for speed and convenience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-6 justify-items-center items-center-safe w-full mt-12">
          {loanUseCaseData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center-safe space-y-4 w-full"
            >
              <div className="flex flex-row">
                <div
                  className={`border-l w-px h-36 border-gray-300 ${
                    index === 0 ? "md:-ml-6" : ""
                  }`}
                />
                <div className="flex flex-col justify-start items-start space-y-3 w-full pl-4">
                  <img
                    src="/use-cases/red-dot.png"
                    alt={item.title}
                    className="w-5 h-5 object-contain"
                  />
                  <h3 className="text-lg text-start font-medium">
                    {item.title}
                  </h3>
                  <p className="text-start text-gray-600 my-1.5 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ByUseCases;
