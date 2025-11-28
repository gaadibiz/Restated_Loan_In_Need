import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface CitiesHeroProps {
  location: string;
  isCity: boolean;
  loanDesc: React.ReactNode;
  heroImg?: string;
}

const CitiesHero: React.FC<CitiesHeroProps> = ({
  location,
  isCity = true,
  loanDesc,
  heroImg,
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
                className="text-primary font-medium"
              >
                {isCity ? "Cities" : "States"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">
                {location}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-2">
          <h2 className="lg:text-5xl text-3xl font-bold leading-snug">
            Apply <span className="text-primary">Insta Personal Loan</span> in{" "}
            {location}
          </h2>
        </div>
        <p className="text-lg text-gray-600 leading-tight">{loanDesc}</p>
        <p className="font-semibold">Loan Range: ₹INR 5,000 to INR 1,00,000</p>
        <Link href="/signup" className="cursor-pointer">
          <Button size="lg" className="text-base my-3">
            Apply now
          </Button>
        </Link>
      </div>
      <Image
        src={heroImg || "/cities/mumbai.png"}
        alt="Hero Image"
        width={300}
        height={300}
        className="ml-8 w-8/12 h-full object-cover md:block md:w-1/2"
      />
    </section>
  );
};

export default CitiesHero;
