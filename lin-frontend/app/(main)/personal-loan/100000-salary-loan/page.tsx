import CardGrids from "@/components/CardGrids";
import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import EligibilityMandatoryGrid from "@/components/personal-insta/EligibilityMandatoryGrid";
import PersonalInstaHeroSection from "@/components/personal-insta/PersonalInstaHeroSection";
import {
  cardBenefits,
  eligibilityCriteria,
  instaLoanFAQdata,
  mandatoryDocuments,
} from "@/lib/data";

export default function HundredKSalary() {
  return (
    <>
      <PersonalInstaHeroSection
        loanType="Insta"
        loanTitleExtended="for ₹1,00,000 salary"
        breadcrumb="Loan on ₹1,00,000 salary"
        loanDesc={
          <>
            If you&apos;re earning a salary of Rs. 1,00,000 and need quick
            financial help, a personal loan can be a smart saviour to cover your
            urgent or unexpected expenses. These loans are easy to access, come
            with flexible repayment options, and offer fast approval. Always
            compare interest rates and terms before applying to ensure you
            choose the best option for your needs.
          </>
        }
        heroImg="/salary-phone.png"
      />
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20">
        <div className="flex flex-col justify-center items-center-safe space-y-12 w-full">
          <div className="flex flex-col justify-center items-center-safe space-y-3 text-center w-full">
            <span className="text-primary font-semibold leading-tight uppercase">
              our benefits
            </span>
            <h2 className="lg:text-4xl text-3xl font-bold">
              Benefits of insta loan for{" "}
              <span className="text-primary">₹1,00,000 salary?</span>
            </h2>
            <p className="text-base text-gray-600 leading-tight">
              Our instant loan process is designed for speed and convenience
            </p>
          </div>
          <CardGrids cardsData={cardBenefits} colsNoMdScreen={4} />
        </div>
      </section>
      <HowItWorks />
      <EligibilityMandatoryGrid
        spanTitle={eligibilityCriteria.spanTitle}
        title={eligibilityCriteria.title}
        titleColoured={"insta loan?"}
        desc={eligibilityCriteria.desc}
        elimangridData={eligibilityCriteria.criteria}
      />
      <LoanCalculator loanType="Insta" />
      <EligibilityMandatoryGrid
        spanTitle={mandatoryDocuments.spanTitle}
        title={mandatoryDocuments.title}
        titleColoured={"insta loan?"}
        desc={mandatoryDocuments.desc}
        elimangridData={mandatoryDocuments.criteria}
      />
      <FootCTA />
      <FAQSection faqData={instaLoanFAQdata} />
    </>
  );
}
