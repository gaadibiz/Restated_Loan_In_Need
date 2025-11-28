import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import ByUseCases from "@/components/use-cases/ByUseCases";
import DefineLoanTypeQA from "@/components/use-cases/DefineLoanTypeQA";
import LoanQuestionCard from "@/components/use-cases/LoanQuestionCard";
import UseCaseHero from "@/components/use-cases/UseCaseHero";
import {
  eligibilityCriteria,
  mandatoryDocuments,
  medicalLoanFAQ,
  medicalLoanUseCaseData,
} from "@/lib/data";

export default function MedicalEmergencyLoan() {
  return (
    <>
      <UseCaseHero
        loanType="Medical Emergency"
        loanDesc={
          <>
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses,{" "}
            <span className="text-primary">Loan In Need</span> gives you fast,
            hassle-free personal loans. Simple online process, flexible tenures,
            and money in your account within hours.
          </>
        }
        heroImg="/benefits-tab/medical-emergency-loan-doctor-tab-min.png"
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
        loanType="Medical Emergency"
        loanDesc="A personal medical emergency loan is a quick, unsecured loan designed to help you cover unexpected medical expenses without any colateral. It provides immediate financial assistance to pay for hospital bills, doctor consultations, diagnostic tests, surgeries, medications, or any other urgent healthcare costs. This type of loan is ideal when you need instant insta funds and don't want to wait for your payday."
      />
      <ByUseCases
        loanType="Medical Emergency"
        loanUseCaseData={medicalLoanUseCaseData}
      />
      <HowItWorks loanType="medical emergency" />
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
      <FAQSection faqData={medicalLoanFAQ} />
    </>
  );
}
