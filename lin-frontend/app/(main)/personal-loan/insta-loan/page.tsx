import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import LoanDefine from "@/components/personal-insta/LoanDefine";
import PersonalInstaHeroSection from "@/components/personal-insta/PersonalInstaHeroSection";
import {
  eligibilityCriteria,
  instaLoanFAQdata,
  mandatoryDocuments,
} from "@/lib/data";

export default function InstaLoan() {
  return (
    <>
      <PersonalInstaHeroSection
        loanType="Insta"
        loanDesc={
          <>
            Get instant personal loans from{" "}
            <span className="text-primary">₹5,000 to ₹2,00,000</span> with
            flexible tenure, low interest rates, and no collateral. Enjoy
            same-day approval and disbursal, ensuring quick access to funds for
            urgent financial needs.
          </>
        }
      />
      <LoanDefine
        heading="What is insta loan?"
        description="A insta loan is money you borrow for a short period of time, usually from a few days up to months. It helps you cover your urgent expenses or quick cash needs and gets approved faster than long term loans and the repayment tenure can also be flexible as per your convenience."
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
      <FAQSection faqData={instaLoanFAQdata} />
    </>
  );
}
