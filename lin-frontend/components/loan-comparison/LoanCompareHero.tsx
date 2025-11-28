import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const LoanCompareHero = ({
  heroImg = "/calculator.png",
  cta,
  ctaLink,
  heroTitle,
  heroDesc,
  breadcrumb,
}: {
  heroImg?: string;
  cta?: string;
  ctaLink?: string;
  heroTitle: React.ReactNode;
  heroDesc: string;
  breadcrumb?: string;
}) => {
  return (
    <section className="font-sans items-center justify-between gap-16 flex flex-col md:flex-row w-full md:mt-12 mt-24 max-w-7xl mx-auto py-4 p-4 md:p-12 lg:p-20">
      <div className="flex flex-col gap-4 w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/loan-calculators"
                className="text-primary font-medium"
              >
                Loan Calculators
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">
                {breadcrumb ? breadcrumb : `Loan`}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-2">
          <h2 className="lg:text-5xl text-3xl font-bold leading-snug">
            {heroTitle}
          </h2>
        </div>
        <p className="text-lg text-gray-600 leading-tight max-w-xl">
          {heroDesc}
        </p>
        <Button size="lg" className="text-base my-3 w-40">
          <Link href={ctaLink ? ctaLink : "/signup"}>
            {cta ? cta : "Apply Now"}
          </Link>
        </Button>
      </div>
      <Image
        src={heroImg}
        alt="Hero Image"
        width={300}
        height={300}
        className="ml-8 w-8/12 h-full object-cover md:block md:w-1/2"
      />
    </section>
  );
};

export default LoanCompareHero;
