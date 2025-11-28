import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 md:mt-12 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center-safe gap-12 w-full">
        <div className="flex flex-col items-start space-y-4 w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-medium">
                  About Us
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="lg:text-5xl text-3xl font-bold">
            All about <span className="text-primary">Loaninneed</span>
          </h2>
          <p className="text-gray-500 my-1.5 text-base">
            Some expenses don&apos;t wait for payday. Sometimes, a medical bill,
            school fee, or sudden expense comes out without knocking and you are
            left wondering, “What to do now?”
            <br />
            <br />
            That&apos;s why we are here with LoanInNeed - a simple, reliable way
            for you to get quick financial help without the endless paperwork or
            hidden conditions.
            <br />
            <br />
            Because when it comes to emergency needs only trust and support
            matters.
          </p>
        </div>
        <Image
          src="/about/about-hero.png"
          alt="About Us"
          width={1200}
          height={600}
          className="rounded-lg w-full h-auto object-cover md:w-8/12"
        />
      </div>
    </section>
  );
};

export default AboutHero;
