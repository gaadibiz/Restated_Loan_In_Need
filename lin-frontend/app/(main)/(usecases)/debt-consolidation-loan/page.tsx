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

export default function DebtConsolidationLoan() {
  return (
    <>
      <UseCaseHero
        loanType="Debt Consolidation"
        loanDesc={
          <>
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses,{" "}
            <span className="text-primary">Loan In Need</span> gives you fast,
            hassle-free personal loans. Simple online process, flexible tenures,
            and money in your account within hours.
          </>
        }
        heroImg={"/use-cases/debt.png"}
      />
      <LoanQuestionCard
        heading="What makes LoanInNeed the best Insta Loan provider for Debt Consolidation?"
        imageUrl="/use-cases/loan-docs.png"
        ticks={[
          "No collateral required",
          "Low Interest Rate",
          "Early repayment allowed",
          "Simple online process",
        ]}
      />
      <DefineLoanTypeQA
        loanType="debt consolidation"
        loanDesc="A debt consolidation loan is a type of personal loan designed to help you combine multiple debts into a single loan with a lower interest rate. It simplifies your monthly payments and can help you pay off your debt faster."
      />
      <ByUseCases
        loanType="debt consolidation"
        loanUseCaseData={medicalLoanUseCaseData}
      />
      <HowItWorks loanType="debt consolidation" />
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
