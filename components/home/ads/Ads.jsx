import React from "react";
import qatar from "@/public/images/qatar.png";
import singapore from "@/public/images/singapore.png";
import france from "@/public/images/france.png";
import biman from "@/public/images/biman-bd.png";

import south from "@/public/images/south.png";
import british from "@/public/images/british.png";
import eastern from "@/public/images/eastern.png";
import emirates from "@/public/images/emirates.png";
import turkish from "@/public/images/turkish.png";
import ryanair from "@/public/images/ryanair.png";
import qantas from "@/public/images/qantas.png";
import canada from "@/public/images/canada.png";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";

export default function Ads() {
  const logos = [
    {
      id: 1,
      src: biman,
      alt: "Biman",
      href: "https://www.biman.com.bd",
      target: "_blank",
    },
    {
      id: 2,
      src: france,
      alt: "Air France",
      href: "https://www.airfrance.com",
      target: "_blank",
    },
    {
      id: 3,
      src: qatar,
      alt: "Qatar Airways",
      href: "https://www.qatarairways.com",
      target: "_blank",
    },
    {
      id: 4,
      src: singapore,
      alt: "Singapore Airlines",
      href: "https://www.singaporeairlines.com",
      target: "_blank",
    },
    {
      id: 5,
      src: south,
      alt: "South African Airways",
      href: "https://www.saa.com.za",
      target: "_blank",
    },
    {
      id: 6,
      src: british,
      alt: "British Airways",
      href: "https://www.britishairways.com",
      target: "_blank",
    },
    {
      id: 7,
      src: eastern,
      alt: "Eastern Air Lines",
      href: "https://www.easternairlines.com",
      target: "_blank",
    },
    {
      id: 8,
      src: emirates,
      alt: "Emirates",
      href: "https://www.emirates.com",
      target: "_blank",
    },
    {
      id: 9,
      src: turkish,
      alt: "Turkish Airlines",
      href: "https://www.turkishairlines.com",
      target: "_blank",
    },
    {
      id: 10,
      src: ryanair,
      alt: "Ryanair",
      href: "https://www.ryanair.com",
      target: "_blank",
    },
    {
      id: 11,
      src: qantas,
      alt: "Qantas",
      href: "https://www.qantas.com",
      target: "_blank",
    },
    {
      id: 12,
      src: canada,
      alt: "Canadian Airlines",
      href: "https://www.canada.ca/en/travelling/transportation/air/index.html",
      target: "_blank",
    },
  ];

  return (
    <div className="max-w-full md:max-w-4xl mx-auto px-4">
      <h2 className="text-[24px] font-bold text-center">Our Partners</h2>
      <Marquee className="overflow-y-hidden mt-5 gap-4 w-full">
        {logos?.map((logo, index) => (
          <div
            key={index}
            className="bg-white px-4 py-2 shadow-lg h-[70px] flex justify-center items-center"
          >
            <Link href={logo?.href} target={logo?.target}>
              <Image
                alt={logo?.alt}
                className="max-h-[50px] w-auto object-contain"
                src={logo?.src}
              />
            </Link>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
