"use client";
import Image from "next/image";
import React from "react";
import banner1 from "@/public/images/banner1.jpg";
import arrow from "@/public/icons/arrow2.svg";

import Link from "next/link";

export default function BannerAds() {
  return (
    <div className="relative flex justify-center">
      <Image className="w-full" src={banner1}></Image>
      <Link
        href={"#"}
        className="absolute right-[30px] md:right-[70px] top-[40%] text-[14px] md:text-[32px] font-bold text-[#FFFFFF] flex items-center gap-2"
      >
        Check out More{" "}
        <Image className="w-[20px] md:w-[50px]" src={arrow}></Image>
      </Link>
    </div>
  );
}
