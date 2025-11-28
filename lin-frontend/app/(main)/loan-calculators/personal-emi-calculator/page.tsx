import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowCalcWorksSection from "@/components/loan-comparison/HowCalcWorks";
import LoanCompareHero from "@/components/loan-comparison/LoanCompareHero";
import LoanCalculator from "@/components/LoanCalculator";
import { personalLoanFAQdata } from "@/lib/data";
import React from "react";

const PersonalEMICalculator = () => {
  return (
    <>
      <LoanCompareHero
        heroImg="/calculator.png"
        breadcrumb="Loan EMI calculator"
        heroTitle={
          <>
            Instant{" "}
            <span className="text-primary">
              Personal Loan
              <br /> EMI
            </span>{" "}
            Calculator
          </>
        }
        heroDesc="Calculate your EMI instantly and plan your monthly repayments effortlessly with LoanInNeed's online EMI calculator for personal loans."
        cta="Appply for loan"
      />
      <LoanCalculator />
      <HowCalcWorksSection
        title={
          <>
            What formula do we use to calculate{" "}
            <span className="text-primary">Personal Loan EMI?</span>
          </>
        }
        description="Whenever you apply for a personal loan, it's important to know how much you will need to pay each month. This helps you see if the loan is affordable for you.
We Use this formula to calculate your EMI: E = P x R x (1 + r)^n ÷ ((1 + r)^N - 1)

Here's what the letters mean:"
        steps={[
          "E = Your monthly payment (EMI - Equated Monthly Instalment)",
          "P = The loan amount (principal)",
          "R = The interest rate",
          "N = The loan term (number of months you will repay)",
        ]}
      />
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section 1: How to calculate Personal Loan EMI */}
        <section className="p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-6">
            How to calculate{" "}
            <span className="text-red-500">Personal Loan EMI ?</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-4xl mx-auto">
            Calculating your monthly EMI payments manually can be time-consuming
            and complicated. Our Personal Loan EMI Calculator makes it simple
            and hassle-free. In just a few steps, you can estimate your monthly
            EMI at no cost:
          </p>

          <ul className="space-y-3 max-w-3xl mx-auto">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-red-500 font-bold mt-1">•</span>
              <span>
                Go to the &apos;Personal Loan EMI Calculator&apos; page.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-red-500 font-bold mt-1">•</span>
              <span>
                Use the slider to select the loan amount you want to borrow.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-red-500 font-bold mt-1">•</span>
              <span>
                Enter the interest rate (%) and choose the repayment tenure in
                months.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-red-500 font-bold mt-1">•</span>
              <span>Instantly view your estimated EMI on the screen.</span>
            </li>
          </ul>
        </section>

        {/* Section 2: Factors to be considered */}
        <section className="p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl max-w-5xl font-bold text-gray-900 text-center mb-6">
            What are the factors to be considered while calculation{" "}
            <span className="text-red-500">Personal Loan EMI?</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-10 text-start max-w-7xl mx-auto">
            When planning your loan repayments, a few key factors can
            significantly impact your EMI (Equated Monthly Installment).
            Understanding these will help you make smarter financial decisions:
          </p>

          <div className="space-y-8 max-w-7xl mx-auto flex flex-start flex-col">
            {/* Loan Amount */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Loan Amount
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The loan amount is the total sum you intend to borrow from a
                bank or financial institution. Your EMI directly depends on this
                amount—higher the loan, higher the EMI.
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Interest Rate
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The interest rate determines the cost of borrowing. A higher
                interest rate means a higher EMI, while a lower rate reduces
                your monthly repayment burden.
              </p>
            </div>

            {/* Loan Tenure */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Loan Tenure
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Loan tenure is the time period over which you plan to repay the
                loan. Choosing a longer tenure lowers your EMI but increases the
                total interest paid over time. A shorter tenure leads to higher
                EMIs but saves on interest.
              </p>
            </div>

            {/* Prepayment Option */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Prepayment Option
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Many lenders allow partial or full prepayment of loans.
                Prepaying can help you reduce your overall interest outgo and
                close your loan faster. For example, at Fibe, you can prepay
                without any additional charges.
              </p>
            </div>
          </div>
        </section>
      </div>
      <FAQSection faqData={personalLoanFAQdata} />
      <FootCTA />
    </>
  );
};

export default PersonalEMICalculator;
