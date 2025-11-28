import BenefitTabsSection from "@/components/BenefitTabsSection";
import CardGrids from "@/components/CardGrids";
import FAQSection from "@/components/FAQSection";
import FootCTA from "@/components/FootCTA";
import HomeHeroSection from "@/components/HomeHeroSection";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculator from "@/components/LoanCalculator";
import StatsHistory from "@/components/StatsHistory";
import TestimonialSection from "@/components/TestimonialSection";
import { cardBenefits, homeFAQdata } from "@/lib/data";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <StatsHistory />
      <HowItWorks />
      <BenefitTabsSection />
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12">
        <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
          <div className="flex flex-col justify-center items-center-safe space-y-2 text-center w-full">
            <span className="text-primary font-semibold leading-tight uppercase">
              our benefits
            </span>
            <h2 className="lg:text-4xl text-3xl font-bold">
              Why choose <span className="text-primary">Loaninneed?</span>
            </h2>
          </div>
          <CardGrids cardsData={cardBenefits} colsNoMdScreen={4} />
        </div>
      </section>
      <LoanCalculator />
      <TestimonialSection />
      <FAQSection faqData={homeFAQdata} />
      <FootCTA />
    </>
  );
}
