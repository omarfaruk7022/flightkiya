import React from "react";
import qatar from "@/public/images/qatar.png";
import singapore from "@/public/images/singapore.png";
import france from "@/public/images/france.png";

import Image from "next/image";

export default function Ads() {
  return (
    <div className="max-w-4xl mx-auto ">
      <h2 className="text-[24px] font-bold text-center">Our Partners </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 mt-3 ">
        <div className="w-full bg-white px-6 shadow-lg m-auto py-2 h-[90px]">
          <Image className="w-full" src={qatar}></Image>
        </div>
        <div className="w-full bg-white px-6 shadow-lg m-auto py-2 h-[90px]">
          <Image className="w-[160px] m-auto" src={singapore}></Image>
        </div>
        <div className="w-full bg-white px-6 shadow-lg m-auto py-2 h-[90px] flex items-center">
          <Image className="w-full " src={france}></Image>
        </div>
      </div>
    </div>
  );
}
