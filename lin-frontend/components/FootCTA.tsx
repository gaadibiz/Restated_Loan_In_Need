import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const FootCTA = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20 lg:-my-16">
      <div className="rounded-3xl py-10 px-6 w-full bg-primary">
        <div className="flex lg:justify-between justify-center items-center-safe gap-8 w-full bg-[url('/cta-foot-gradient.svg')] bg-cover bg-no-repeat">
          <Image
            src="/coins-1.png"
            alt="Get Loan in Need"
            width={150}
            height={150}
            className="hidden md:block"
          />
          <div className="text-center flex flex-col justify-center items-center-safe space-y-4">
            <h2 className="text-white lg:text-3xl text-2xl font-bold">
              Get your insta personal loan now
            </h2>
            <p className="text-white text-base max-w-lg">
              Apply online today and receive instant approval with quick
              disbursal directly to your bank account—no hidden charges, no
              collateral required.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-primary font-semibold"
              >
                Check Eligibility <ArrowRight className="ml-0.5" />
              </Button>
            </Link>
          </div>
          <Image
            src="/coins-2.png"
            alt="Get Loan in Need"
            width={150}
            height={150}
            className="hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default FootCTA;
