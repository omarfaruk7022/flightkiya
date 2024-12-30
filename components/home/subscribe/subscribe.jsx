import React from "react";
import save from "@/public/images/save.svg";
import Image from "next/image";

export default function Subscribe() {
  return (
    <div className="flex flex-wrap justify-between items-center bg-[#6D28D9] py-8 px-4 md:px-20">
      <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto">
        <Image
          src={save}
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
        <div className="flex-1">
          <p className="text-white text-[18px] md:text-[24px] font-bold leading-snug">
            Save time, Save Money!
          </p>
          <p className="text-[14px] md:text-[18px] font-[500] text-[#B0ADAD] leading-snug">
            Sign up today and get our premium deals delivered straight to your
            inbox
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
        <input
          type="text"
          className="p-2 md:p-3 rounded-l-lg flex-1 md:flex-none w-full md:w-auto text-sm"
          placeholder="Enter your email address"
        />
        <button className="border p-2 md:p-3 rounded-r-lg border-[#B0ADAD] text-white text-sm">
          Subscribe
        </button>
      </div>
    </div>
  );
}
