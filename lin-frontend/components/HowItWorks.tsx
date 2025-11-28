import Image from "next/image";
import React from "react";

const HowItWorks = ({ loanType = "insta" }: { loanType?: string }) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-16 mt-16">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full">
          <span className="text-primary font-semibold leading-tight uppercase">
            how it works
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            How to get {loanType} loan in{" "}
            <span className="text-primary">3 simple step?</span>
          </h2>
          <p className="text-center text-gray-500 font-medium my-1.5 max-w-2xl">
            Our instant loan process is designed for speed and convenience
          </p>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-1 justify-items-center items-center-safe gap-4 w-full">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <Image
              src="/how-it-works/apply-online.png"
              alt="apply-online"
              width={100}
              height={100}
            />
            <h3 className="text-xl font-bold text-center">Apply Online</h3>
            <p className="text-center text-sm text-gray-600 -my-1">
              Our loan against salary option requires minimal information and no
              collateral documents.
            </p>
          </div>
          <div className="md:block hidden items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/how-it-works/arrow.png"
              alt="Arrow"
              className="w-full"
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center items-center">
            <Image
              src="/how-it-works/instant-approval.png"
              alt="Instant Approval"
              width={100}
              height={100}
            />
            <h3 className="text-xl font-bold text-center">Instant Approval</h3>
            <p className="text-center text-sm text-gray-600 -my-1">
              Our system approves low credit score loans and low CIBIL loans
              instantly.
            </p>
          </div>
          <div className="md:block hidden items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/how-it-works/arrow.png"
              alt="Arrow"
              className="w-full"
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center items-center">
            <Image
              src="/how-it-works/get-fund.png"
              alt="Money"
              width={100}
              height={100}
            />
            <h3 className="text-xl font-bold text-center">Get Fund in Bank</h3>
            <p className="text-center text-sm text-gray-600 -my-1">
              Loan amount transferred directly to your bank account within
              minutes of approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
