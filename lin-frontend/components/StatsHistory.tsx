"use client";
import Image from "next/image";
import React from "react";

const StatsHistory = () => {
  return (
    <section className="w-full max-w-[90rem] mx-auto py-4 px-6">
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center items-center-safe w-full gap-4">
        <div className="flex flex-col space-y-2 justify-center items-center">
          <Image
            src="/men-face-min.png"
            alt="Customer"
            width={80}
            height={80}
          />
          <h3 className="text-3xl font-bold text-center">50,000+</h3>
          <p className="text-center text-gray-600">Satisfied Customer</p>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <Image src="/money-min.png" alt="Money" width={80} height={80} />
          <h3 className="text-3xl font-bold text-center">₹100 Cr+</h3>
          <p className="text-center text-gray-600">Insta Loans Disbursed</p>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <Image src="/check-min.png" alt="Customer" width={80} height={80} />
          <h3 className="text-3xl font-bold text-center">95%</h3>
          <p className="text-center text-gray-600">
            Low CIBIL Loan Approval Rate
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsHistory;
