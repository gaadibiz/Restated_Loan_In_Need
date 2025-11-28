import AboutFootCTA from "@/components/about/AboutFootCTA";
import AboutHero from "@/components/about/AboutHero";
import FounderQuote from "@/components/about/FounderQuote";
import CardGrids from "@/components/CardGrids";
import FAQSection from "@/components/FAQSection";
import { aboutFAQdata, missionVision } from "@/lib/data";

export default function About() {
  return (
    <>
      <AboutHero />
      <FounderQuote />
      <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20 my-12">
        <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
          <h2 className="lg:text-4xl text-3xl font-bold">
            Our <span className="text-primary">mission & vision</span>
          </h2>
          <CardGrids cardsData={missionVision} colsNoMdScreen={2} />
        </div>
      </section>
      <AboutFootCTA />
      <FAQSection faqData={aboutFAQdata} />
    </>
  );
}
