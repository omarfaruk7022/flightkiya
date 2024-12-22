"use client";
import Image from "next/image";
import React from "react";
import special1 from "@/public/images/special1.png";
import special2 from "@/public/images/special2.png";
import special3 from "@/public/images/special3.png";

export default function ExclusiveOffers() {
  return (
    <div className="my-5 max-w-7xl mx-auto">
      <h2 className="text-[24px] font-bold">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-2 w-[80%] mx-auto">
        <div className="bg-white shadow-lg p-2 rounded-[10px]">
          <Image className="w-full rounded-[10px]" src={special1}></Image>
          <h2 className="text-[18px] font-bold mt-2">
            Explore Abu Dhabi with Etihad Airways Stopover Deals
          </h2>
          <p className="text-[#908F8F] text-[12px] pt-5">
            Valid till: 31st Dec, 2024
          </p>
          <button className="py-1 px-2 bg-[#6D28D9] text-white rounded-xl text-[18px] font-bold mt-3">
            Details
          </button>
        </div>
        <div className="bg-white shadow-lg p-2 rounded-[10px]">
          <Image className="w-full rounded-[10px]" src={special2}></Image>
          <h2 className="text-[18px] font-bold mt-2">
            Stopover opportunity in Istanbul with Turkish Airlines
          </h2>
          <p className="text-[#908F8F] text-[12px] pt-5">
            Valid till: 31st Dec, 2024
          </p>
          <button className="py-1 px-2 bg-[#6D28D9] text-white rounded-xl text-[18px] font-bold mt-3">
            Details
          </button>
        </div>
        <div className="bg-white shadow-lg p-2 rounded-[10px]">
          <Image className="w-full rounded-[10px]" src={special3}></Image>
          <h2 className="text-[18px] font-bold mt-2">
            Get special student fare and extra baggage allowance
          </h2>
          <p className="text-[#908F8F] text-[12px] pt-5">
            Valid till: 31st Dec, 2024
          </p>
          <button className="py-1 px-2 bg-[#6D28D9] text-white rounded-xl text-[18px] font-bold mt-3">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
