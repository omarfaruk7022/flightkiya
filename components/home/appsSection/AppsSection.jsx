import Image from "next/image";
import React from "react";
import app from "@/public/images/app.png";

export default function AppsSection() {
  return (
    <div>
      <Image src={app}></Image>
    </div>
  );
}
