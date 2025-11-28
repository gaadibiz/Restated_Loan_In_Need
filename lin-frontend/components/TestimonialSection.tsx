"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CircleUserRound, StarIcon } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 my-12">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 mb-18 text-center w-full">
          <span className="text-primary font-semibold leading-tight capitalize">
            testimonial
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            What&apos;s our customer{" "}
            <span className="text-primary">think about us</span>
          </h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-start h-72 py-4 px-6">
                      <span className="flex space-x-1 text-yellow-400 mb-4">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <StarIcon
                            key={starIndex}
                            className="h-4 w-4 fill-current"
                          />
                        ))}
                      </span>
                      <span className="text-gray-600">
                        Experience a payment app built on simplicity and
                        transparency. No hidden fees, just a seamless user
                        experience that makes every transaction easy and
                        stress-free. Say goodbye to confusion and hello to
                        straightforward payments.
                      </span>
                      <span className="flex space-x-2 items-center mt-auto">
                        <CircleUserRound className="h-10 w-10" />
                        <span className="flex flex-col space-y-0.5">
                          <span className="font-bold">John Doe</span>
                          <span className="text-sm italic">CEO of Company</span>
                        </span>
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
