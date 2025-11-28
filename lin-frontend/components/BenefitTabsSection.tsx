import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { benefitTabsData } from "@/lib/data";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const BenefitTabsSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 lg:p-20 my-12">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 mb-12">
          <span className="text-primary font-semibold leading-tight uppercase">
            our benefits
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold text-center">
            We offer insta loan for your{" "}
            <span className="text-primary">financial emergencies</span>
          </h2>
        </div>
        <div className="flex w-full">
          <Tabs defaultValue={benefitTabsData[0].value} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 rounded-sm gap-1 p-1 bg-background lg:mb-auto mb-24">
              {benefitTabsData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-sm data-[state=active]:bg-accent bg-background focus:ring-1 ring-offset-1 ring-offset-background ring-primary/20 data-[state=active]:text-primary w-full text-pretty text-xs lg:text-[13px]"
                >
                  {tab.tabIcon}
                  {tab.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {benefitTabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 justify-between items-center">
                  <div className="flex flex-col space-y-6 lg:w-1/2">
                    <h3 className="text-2xl font-semibold">{tab.title}</h3>
                    <p className="text-muted-foreground">{tab.description}</p>
                    <Link href={tab.link}>
                      <Button className="text-base w-fit">Apply now</Button>
                    </Link>
                  </div>
                  <div className="flex">
                    <Image
                      src={tab.imageUrl}
                      alt={tab.title}
                      width={600}
                      height={600}
                      className="rounded-lg w-96 h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default BenefitTabsSection;
