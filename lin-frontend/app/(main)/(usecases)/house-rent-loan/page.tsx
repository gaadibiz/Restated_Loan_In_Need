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

export default function HouseRentLoan() {
  return (
    <>
      <UseCaseHero
        loanType="House Rent Payment"
        loanDesc={
          <>
            Need urgent cash to pay your utility bills, like electricity, water,
            or internet? With our insta personal loans, you can pay your bills
            on time without any burden, flexible repayment options, and no need
            to wait for your next payday.
          </>
        }
        heroImg={"/use-cases/house-rent.png"}
      />
      <LoanQuestionCard
        heading="What makes LoanInNeed the best Insta Loan provider for House Rent Payment?"
        imageUrl="/use-cases/loan-docs.png"
        ticks={[
          "No collateral required",
          "Low Interest Rate",
          "Early repayment allowed",
          "Simple online process",
        ]}
      />
      <DefineLoanTypeQA
        loanType="House Rent Payment"
        loanDesc="A house rent payment loan is a insta personal loan designed to help you pay your rent on time without any financial stress. It provides quick access to funds so you can cover your monthly rent when your budget is tight. This type of loan is ideal for avoiding late payment penalties and ensuring you have a place to live."
      />
      <ByUseCases
        loanType="House Rent Payment"
        loanUseCaseData={medicalLoanUseCaseData}
      />
      <HowItWorks loanType="house rent payment" />
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
