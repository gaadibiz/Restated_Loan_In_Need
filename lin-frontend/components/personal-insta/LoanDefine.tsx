import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, LucideCircleCheck } from "lucide-react";

interface LoanDefineProps {
  heading?: string;
  description?: string | React.ReactNode;
}

const LoanDefine = ({ heading, description }: LoanDefineProps) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20 lg:-my-32">
      <div className="rounded-3xl p-2 w-full bg-primary">
        <div className="flex lg:justify-between justify-center items-center-safe gap-8 w-full bg-[url('/cta-foot-gradient.svg')] bg-cover bg-no-repeat px-6 py-2">
          <div className="flex flex-col justify-start items-start space-y-4">
            <h2 className="text-white lg:text-3xl text-2xl font-bold">
              {heading}
            </h2>
            <p className="text-white text-base max-w-lg">{description}</p>
            <div className="grid grid-cols-2 gap-4 my-3">
              <div className="flex text-gray-100">
                <LucideCircleCheck className="mr-1 mt-0.5 w-5 h-5 fill-current stroke-primary" />
                <span>Flexible Repayment Options</span>
              </div>
              <div className="flex text-gray-100">
                <LucideCircleCheck className="mr-1 mt-0.5 w-5 h-5 fill-current stroke-primary" />
                <span>Competitive Interest Rate</span>
              </div>
              <div className="flex text-gray-100">
                <LucideCircleCheck className="mr-1 mt-0.5 w-5 h-5 fill-current stroke-primary" />
                <span>Seamless Digital Process</span>
              </div>
              <div className="flex text-gray-100">
                <LucideCircleCheck className="mr-1 mt-0.5 w-5 h-5 fill-current stroke-primary" />
                <span>Quick Disbursal</span>
              </div>
            </div>
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
            src="/personal-insta-loan/loan.png"
            alt="Get Loan in Need"
            width={1500}
            height={1500}
            className="hidden md:block w-full h-auto max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default LoanDefine;
