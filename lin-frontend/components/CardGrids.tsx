"use client";

import React from "react";
import { Card } from "./ui/card";
import { CardData } from "@/lib/types";
import Image from "next/image";

const getGridCols = (cols: number) => {
  const gridMap: { [key: number]: string } = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    // add more if needed
  };
  return gridMap[cols] || "md:grid-cols-1";
};

const CardGrids = ({
  cardsData,
  colsNoMdScreen,
}: {
  cardsData: CardData[];
  colsNoMdScreen: number;
}) => {
  return (
    <div
      className={`grid ${getGridCols(
        colsNoMdScreen
      )} grid-cols-1 gap-6 w-full my-8`}
    >
      {cardsData.map((card, index) => (
        <Card
          key={index}
          className={`${
            index % 4 === 0
              ? "bg-blue-50"
              : index % 4 === 1
              ? "bg-yellow-50"
              : index % 4 === 2
              ? "bg-blue-50"
              : "bg-purple-50"
          } rounded-lg p-6`}
        >
          <div className="flex flex-col justify-center items-center text-center space-y-3">
            <Image
              src={card.iconImg}
              width={100}
              height={100}
              alt="Icon 4"
              className="h-10 w-10"
            />
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-600 text-base antialiased text-wrap">
              {card.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardGrids;
