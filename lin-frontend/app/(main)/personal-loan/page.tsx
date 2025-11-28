import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import LoanDefine from "@/components/personal-insta/LoanDefine";
import PersonalInstaHeroSection from "@/components/personal-insta/PersonalInstaHeroSection";
import {
  eligibilityCriteria,
  mandatoryDocuments,
  personalLoanFAQdata,
} from "@/lib/data";

export default function PersonalLoan() {
  return (
    <>
      <PersonalInstaHeroSection
        loanType="Personal"
        loanDesc={
          <>
            Whether it&apos;s a medical emergency, monthly bills, travel, or
            unexpected expenses,{" "}
            <span className="text-primary">Loan In Need</span> gives you fast,
            hassle-free personal loans. Simple online process, flexible tenures,
            and money in your account within hours.
          </>
        }
      />
      <LoanDefine
        heading="What is personal loan?"
        description="A personal loan is a type of unsecured loan that lets you borrow money from a bank or lender to meet various personal needs, like medical expenses, travel, weddings, or debt consolidation. It doesn't require any collateral and is repaid in flexible tenure over a short period of time."
      />
      <HowItWorks />
      <EligibilityMandatoryGrid
        spanTitle={eligibilityCriteria.spanTitle}
        title={eligibilityCriteria.title}
        titleColoured={eligibilityCriteria.titleColoured}
        desc={eligibilityCriteria.desc}
        elimangridData={eligibilityCriteria.criteria}
      />
      <LoanCalculator />
      <EligibilityMandatoryGrid
        spanTitle={mandatoryDocuments.spanTitle}
        title={mandatoryDocuments.title}
        titleColoured={mandatoryDocuments.titleColoured}
        desc={mandatoryDocuments.desc}
        elimangridData={mandatoryDocuments.criteria}
      />
      <FootCTA />
      <FAQSection faqData={personalLoanFAQdata} />
    </>
  );
}
