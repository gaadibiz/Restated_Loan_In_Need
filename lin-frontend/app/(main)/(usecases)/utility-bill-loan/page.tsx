import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import ByUseCases from "@/components/use-cases/ByUseCases";
import DefineLoanTypeQA from "@/components/use-cases/DefineLoanTypeQA";
import LoanQuestionCard from "@/components/use-cases/LoanQuestionCard";
import UseCaseHero from "@/components/use-cases/UseCaseHero";
import {
  educationLoanFAQ,
  eligibilityCriteria,
  mandatoryDocuments,
  medicalLoanUseCaseData,
} from "@/lib/data";

export default function UtilityBillsLoan() {
  return (
    <>
      <UseCaseHero
        loanType="Utility Bills Payment"
        loanDesc={
          <>
            Need urgent cash to pay your utility bills, like electricity, water,
            or internet? With our insta personal loans, you can pay your bills
            on time without any burden, flexible repayment options, and no need
            to wait for your next payday.
          </>
        }
        heroImg={"/use-cases/utility-bill.png"}
      />
      <LoanQuestionCard
        heading="What makes LoanInNeed the best Insta Loan provider for Utility bills payment?"
        imageUrl="/use-cases/loan-docs.png"
        ticks={[
          "No collateral required",
          "Low Interest Rate",
          "Early repayment allowed",
          "Simple online process",
        ]}
      />
      <DefineLoanTypeQA
        loanType="Utility Bills Payment"
        loanDesc="A utility bill payment loan is a insta personal loan designed to help you pay your essential utility bills on time without any financial stress. It provides quick access to funds so you can cover your electricity, water, gas, internet, or mobile bills when your monthly budget is tight. This type of loan is ideal for avoiding service interruptions and late payment penalties, giving you peace of mind and financial flexibility."
      />
      <ByUseCases
        loanType="Utility Bills Payment"
        loanUseCaseData={medicalLoanUseCaseData}
      />
      <HowItWorks loanType="utility bill payment" />
      <EligibilityMandatoryGrid
        spanTitle={eligibilityCriteria.spanTitle}
        title={eligibilityCriteria.title}
        titleColoured={eligibilityCriteria.titleColoured}
        desc={eligibilityCriteria.desc}
        elimangridData={eligibilityCriteria.criteria}
      />
      <EligibilityMandatoryGrid
        spanTitle={mandatoryDocuments.spanTitle}
        title={mandatoryDocuments.title}
        titleColoured={mandatoryDocuments.titleColoured}
        desc={mandatoryDocuments.desc}
        elimangridData={mandatoryDocuments.criteria}
      />
      <FootCTA />
      <FAQSection faqData={educationLoanFAQ} />
    </>
  );
}
