import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, LucideCircleCheck } from "lucide-react";

interface LoanQuestionCardProps {
  heading?: string;
  imageUrl?: string | React.ReactNode;
  ticks?: string[];
}

const LoanQuestionCard = ({
  heading,
  imageUrl,
  ticks,
}: LoanQuestionCardProps) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20 lg:-my-32">
      <div className="rounded-3xl p-2 w-full bg-primary">
        <div className="flex lg:justify-between justify-center items-center-safe gap-8 w-full bg-[url('/cta-foot-gradient.svg')] bg-cover bg-no-repeat px-6 py-2">
          <div className="flex flex-col justify-start items-start space-y-8 w-full lg:w-8/12">
            <h2 className="text-white lg:text-4xl text-2xl font-bold md:leading-12">
              {heading}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {ticks?.map((tick, index) => (
                <div className="flex text-gray-100" key={index}>
                  <LucideCircleCheck className="mr-1 mt-0.5 w-5 h-5 fill-current stroke-primary" />
                  <span>{tick}</span>
                </div>
              ))}
            </div>
            <Link href="/signup">
              <Button className="bg-white text-primary hover:bg-gray-100 font-medium cursor-pointer">
                Check Eligibility <ArrowRight className="ml-0.5 w-6 h-8" />
              </Button>
            </Link>
          </div>
          <Image
            src={imageUrl as string}
            alt="Get Loan in Need"
            width={1500}
            height={1500}
            className="hidden md:block w-1/2 h-auto max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default LoanQuestionCard;
