import Image from "next/image";
import Link from "next/link";
import React from "react";

const CitiesUseCases = ({
  location,
  locationUseCaseData,
}: {
  location: string;
  locationUseCaseData: {
    title: string;
    description: string;
    iconUrl: string;
    pageLink: string;
  }[];
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 mt-20">
      <div className="flex flex-col justify-center items-center-safe space-y-6 text-center w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full">
          <span className="text-primary font-semibold leading-tight uppercase">
            by use cases
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            Personal Loan for All{" "}
            <span className="text-primary">Urgent Financial Needs</span> in{" "}
            {location}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-6 justify-items-center items-center-safe w-full mt-12">
          {locationUseCaseData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center-safe space-y-4 w-full"
            >
              <div className="flex flex-row">
                <div
                  className={`border-l w-px h-36 border-gray-300 ${
                    index === 0 || index === 3 ? "md:-ml-6" : ""
                  }`}
                />
                <div className="flex flex-col justify-start items-start space-y-3 w-full pl-4">
                  <Image
                    width={1000}
                    height={1000}
                    src={item.iconUrl || "/use-cases/red-dot.png"}
                    alt={item.title}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="flex flex-row justify-between gap-8">
                    <h3 className="text-lg text-start font-bold">
                      {item.title}
                    </h3>
                    <Link href={item.pageLink}>
                      <Image
                        width={30}
                        height={30}
                        src="/cities/arrow.png"
                        alt="arrow"
                        className="object-contain"
                      />
                    </Link>
                  </span>
                  <p className="text-start text-gray-500 my-1.5 text-sm font-medium">
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

export default CitiesUseCases;
