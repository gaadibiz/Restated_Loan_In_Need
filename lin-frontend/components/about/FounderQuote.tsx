import Image from "next/image";
import React from "react";

const FounderQuote = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center-safe text-center p-8 md:px-12 my-10 w-full max-w-7xl mx-auto gap-12">
      <Image
        src="/about/founder.png"
        alt="Founder"
        width={1000}
        height={1000}
        className="w-full md:w-10/12 object-cover"
      />
      <div className="flex flex-col space-y-2 text-start">
        <p className="italic text-base max-w-3xl mb-6">
          “When we started LoanInNeed, we had one simple belief that borrowing
          money should not feel like a burden or a battle. Too many people were
          losing valuable time running from bank to bank, filling endless forms,
          or getting lost in hidden charges. We wanted to change that”
        </p>
        <span className="text-base font-medium">Indradeep</span>
        <span className="text-base text-gray-600">CEO LoanInNeed</span>
      </div>
    </div>
  );
};

export default FounderQuote;
