import React from "react";

const DefineLoanTypeQA = ({
  loanType,
  loanDesc,
}: {
  loanType: string;
  loanDesc: string;
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 mt-12">
      <div className="flex flex-col justify-center items-center-safe space-y-6 text-center w-full">
        <h2 className="lg:text-4xl text-3xl font-bold">
          What is Personal{" "}
          <span className="text-primary">{loanType} Loan?</span>
        </h2>
        <p className="text-center text-gray-600 my-1.5 max-w-3xl">{loanDesc}</p>
      </div>
    </section>
  );
};

export default DefineLoanTypeQA;
