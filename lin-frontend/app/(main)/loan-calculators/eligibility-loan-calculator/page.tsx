import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import EligibilityCalculator from "@/components/loan-comparison/EligibilityCalculator";
import HowCalcWorksSection from "@/components/loan-comparison/HowCalcWorks";
import LoanCompareHero from "@/components/loan-comparison/LoanCompareHero";
import { personalLoanFAQdata } from "@/lib/data";
import React from "react";

const EligibilityLoanCalculator = () => {
  return (
    <>
      <LoanCompareHero
        heroImg="/calculator.png"
        breadcrumb="Loan eligibility calculator"
        heroTitle={
          <>
            Instant{" "}
            <span className="text-primary">
              Personal Loan
              <br /> Eligibility
            </span>{" "}
            Calculator
          </>
        }
        heroDesc="Check your eligibility for personal loan and get the clear insights about your future loans."
        cta="Appply for loan"
      />
      <EligibilityCalculator />
      <HowCalcWorksSection
        title={
          <>
            How to Use the Personal Loan{" "}
            <span className="text-primary">Eligibility Calculator?</span>
          </>
        }
        description="Checking your eligibility is quick and easy. Just follow these simple steps:"
        steps={[
          "Use the slider to enter your monthly income and monthly expense",
          "Provide any additional required details.",
          "Instantly view how much you may be eligible to borrow.",
        ]}
      />
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12">
        <div className="flex flex-col space-y-4">
          <h2 className="lg:text-4xl text-center text-3xl font-bold mb-12">
            Why use{" "}
            <span className="text-primary">Loan Eligibility Calculator?</span>
          </h2>

          <div className="text-lg w-full text-start space-y-3 font-medium text-gray-600">
            <p>
              Borrowing becomes easier and more transparent with
              LoanInNeed&apos;s Loan Eligibility Calculator. This smart tool
              helps you quickly understand how much you can borrow and compare
              loan options to choose the best rates and repayment terms. Our
              personal loan eligibility calculator is simple to use and delivers
              accurate results by analyzing lender eligibility criteria. All you
              need to do is enter a few basic details:
            </p>

            <ul className="list-disc ml-12 my-4 space-y-2">
              <li>Income</li>
              <li>Monthly expenses</li>
              <li>Credit score ( If Needed )</li>
            </ul>
            <p>
              With these inputs, the calculator instantly estimates your loan
              amount and suggests the right borrowing option. It also helps you
              plan your EMI, making financial management smoother.
            </p>
            <p>
              The best part? It&apos;s free, easy to use, and can be checked
              multiple times. If your EMI feels too high, you can simply adjust
              the loan amount and reapply with confidence.
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqData={personalLoanFAQdata} />
      <FootCTA />
    </>
  );
};

export default EligibilityLoanCalculator;
