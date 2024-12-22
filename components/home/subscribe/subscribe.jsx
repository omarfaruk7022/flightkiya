import React from "react";
import save from "@/public/images/save.svg";
import Image from "next/image";

export default function Subscribe() {
  return (
    <div className="flex justify-between flex-wrap items-center bg-[#6D28D9] py-12 px-2 md:px-40">
      <div className="flex items-center flex-wrap gap-2">
        <Image src={save}></Image>
        <div>
          <p className="text-white text-[24px] font-bold ">
            Save time, Save Money!
          </p>
          <p className="text-[24px] font-[500] text-[#B0ADAD]">
            Sing up today and our premium deals delivered straight to your inbox
          </p>
        </div>
      </div>
      <div className="flex items-center ">
        <input
          type="text"
          className="p-3 rounded-l-lg"
          placeholder="Enter your email address"
        />
        <button className="border p-3 rounded-r-lg border-[#B0ADAD] text-white">
          Subscribe
        </button>
      </div>
    </div>
  );
}
