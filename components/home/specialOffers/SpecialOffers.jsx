"use client";
import React from "react";
import special4 from "@/public/images/special4.png";
import special5 from "@/public/images/special5.png";
import special6 from "@/public/images/special6.png";
import special7 from "@/public/images/special7.png";
import special8 from "@/public/images/special8.png";
import special9 from "@/public/images/special9.png";
import location from "@/public/icons/location.svg";
import calender from "@/public/icons/calender.svg";
import star from "@/public/icons/star.svg";

import Image from "next/image";
export default function SpecialOffers() {
  const cardData = [
    {
      title: "Dubai City Tour Package From Bangladesh",
      image: special4,
      location: "Dubai City",
      days: 3,
      rating: 4.9,
    },
    {
      title:
        "USA Tour Packages | North America Holidays & Travel Packages with Cosmos",
      image: special5,
      location: "North America",
      days: 3,
      rating: 4.9,
    },
    {
      title: "10 Most Beautiful Places To Visit In Turkey",
      image: special6,
      location: "Turkey",
      days: 9,
      rating: 4.9,
    },
    {
      title: "The 10 Best Canada Tours & Excursions",
      image: special7,
      location: " Canada",
      days: 3,
      rating: 4.9,
    },
    {
      title: "Australia Tour and Travel Packages",
      image: special8,
      location: "Australia",
      days: 3,
      rating: 4.9,
    },
    {
      title: "Singapore Tour Packages",
      image: special9,
      location: "Singapore",
      days: 3,
      rating: 4.9,
    },
  ];
  return (
    <div className="my-5 max-w-7xl mx-auto">
      <h2 className="text-[24px] font-bold">Special Tour Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 mx-auto">
        {cardData?.map((card) => (
          <div className="bg-white shadow-xl p-2 rounded-[10px]">
            <Image className="w-full rounded-[10px]" src={card?.image}></Image>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <p className="text-[#B0ADAD] text-[14px] flex items-center gap-1">
                  <Image src={location}></Image>
                  {card?.location}
                </p>
                <p className="text-[#6D28D9] text-[18px] font-bold flex items-center gap-1">
                  <Image src={calender}></Image> {card?.days} Days
                </p>
              </div>
              <h2 className="text-[18px] font-bold mt-2">{card?.title}</h2>
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-semibold text-[#B0ADAD] flex items-center gap-1">
                  <Image src={star}></Image> {card?.rating} (25K Review)
                </p>
                <div>
                  <s className="text-[14px] font-bold text-[#B0ADAD]">
                    USD $1500.00
                  </s>
                  <p className="text-[#6D28D9] text-[18px]">USD $1500.00</p>
                  <p className="text-[14px] text-[#B0ADAD]">Per Person</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-20">
        <button className="bg-[#6D28D9] py-3 px-6 rounded-full text-[22px] font-semibold text-white">
          More Tour Packages
        </button>
      </div>
    </div>
  );
}
