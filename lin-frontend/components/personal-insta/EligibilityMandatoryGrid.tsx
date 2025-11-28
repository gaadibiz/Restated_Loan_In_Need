import Image from "next/image";
import React from "react";

interface EligibilityMandatoryGridProps {
  spanTitle?: string;
  title: string;
  titleColoured?: string;
  desc?: string;
  elimangridData: {
    iconImg: string;
    itemTitle: string;
    itemDesc: React.ReactNode | string;
  }[];
}

const EligibilityMandatoryGrid: React.FC<EligibilityMandatoryGridProps> = ({
  spanTitle,
  title,
  titleColoured,
  desc,
  elimangridData,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 md:my-0 my-16">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full">
          <span className="text-primary font-semibold leading-tight uppercase">
            {spanTitle}
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            {title} <span className="text-primary">{titleColoured}</span>
          </h2>
          <p className="text-center text-gray-500 font-medium my-1.5 max-w-2xl">
            {desc}
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 justify-center items-center gap-4 w-full">
          {elimangridData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 justify-center items-center w-full p-6"
            >
              <Image
                src={item.iconImg}
                alt={item.iconImg}
                width={100}
                height={100}
              />
              <h3 className="text-xl font-bold text-center">
                {item.itemTitle}
              </h3>
              <p className="text-center text-sm w-52 text-gray-600 -my-1">
                {item.itemDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EligibilityMandatoryGrid;
