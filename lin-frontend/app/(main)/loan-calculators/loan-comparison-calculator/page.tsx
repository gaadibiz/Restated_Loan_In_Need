import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import LoanCompareHero from "@/components/loan-comparison/LoanCompareHero";
import LoanComparisonCalc from "@/components/loan-comparison/LoanComparisonCalc";
import { personalLoanFAQdata } from "@/lib/data";
import React from "react";

export default function LoanComparisonCalculator() {
  return (
    <>
      <LoanCompareHero
        heroImg="/calculator.png"
        breadcrumb="Loan Comparison"
        heroTitle={
          <>
            Compare your <br />
            <span className="text-primary">multiple loans</span>
          </>
        }
        heroDesc="Compare multiple loan options instantly and choose the one that fits your budget and repayment capacity."
        cta="Compare now"
        ctaLink="#loan-comparison-calculator"
      />
      <LoanComparisonCalc />
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12">
        <div className="flex flex-col space-y-4">
          <h2 className="lg:text-4xl text-center text-3xl font-bold mb-12">
            How to use the{" "}
            <span className="text-primary">loan comparison calculator?</span>
          </h2>

          <div className="text-lg w-full text-start space-y-3 font-medium text-gray-600">
            <p>
              Checking and comparing loans is quick and simple. Just follow
              these steps:
            </p>

            <ul className="list-disc ml-12 my-4 space-y-2">
              <li>Enter the loan amount you want to borrow.</li>
              <li>Provide the interest rates offered by different lenders.</li>
              <li>Select the loan tenure (duration).</li>
              <li>
                Instantly view a detailed comparison of EMIs, total interest
                payable, and total loan cost.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:px-12">
        <div className="flex flex-col space-y-4">
          <h2 className="lg:text-4xl text-center text-3xl font-bold mb-12">
            Why use{" "}
            <span className="text-primary">loan comparison calculator?</span>
          </h2>

          <div className="text-lg w-full text-start space-y-3 font-medium text-gray-600">
            <p>
              Borrowing money is a big decision, and choosing the right loan can
              save you thousands in interest. LoanInNeed&apos;s Loan Comparison
              Calculator makes this process simple, transparent, and accurate.
              With this tool, you can:
            </p>

            <ul className="list-disc ml-12 my-4 space-y-2">
              <li>Compare loan offers from different lenders.</li>
              <li>See which loan gives you the most affordable EMI.</li>
              <li>Plan your repayment in advance.</li>
              <li>Avoid hidden costs and choose the best value loan.</li>
            </ul>
            <p>
              The best part? It&apos;s free, quick, and can be used multiple
              times until you find the perfect loan option for your needs.
            </p>
          </div>
        </div>
      </section>
      <FAQSection faqData={personalLoanFAQdata} />
      <FootCTA />
    </>
  );
}
