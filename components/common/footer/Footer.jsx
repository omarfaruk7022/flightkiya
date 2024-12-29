"use client ";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import visa from "@/public/images/visa.png";
import mastercard from "@/public/images/mastercard.png";
import maestro from "@/public/images/maestro.png";
import discover from "@/public/images/discover.png";
import american from "@/public/images/american.png";
import jcb from "@/public/images/jcb.png";
import logo from "@/public/images/logo.png";
import fb from "@/public/icons/fb.svg";
import wp from "@/public/icons/whatsapp.png";
import linkedin from "@/public/icons/linkedin.svg";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const imagesData = [
    {
      image: visa,
      alt: "Visa",
    },
    {
      image: mastercard,
      alt: "MasterCard",
    },
    {
      image: maestro,
      alt: "Maestro",
    },
    {
      image: discover,
      alt: "Discover",
    },
    {
      image: american,
      alt: "American Express",
    },
    {
      image: jcb,
      alt: "JCB",
    },
  ];
  return (
    <footer className="w-full bg-[#EDF4FE] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Adbiyas Tour"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-black max-w-xs">
              Adbiyas Tour & Travel US-based full-service travel agency
              specializing in worldwide travel since 2024.
            </p>
            <div className="space-y-2 bg-white p-4 rounded-lg">
              <h3 className="font-semibold">USA office</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Queens, New York City, USA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdEmail className="h-4 w-4" />
                <Link href="mailto:info@adbiyastour.com">
                  info@adbiyastour.com
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <Link href="tel:+13476986704">+13476986704</Link>
              </div>
            </div>
          </div>

          {/* Discover */}
          <div className="flex items-start justify-between ">
            <div className="space-y-4">
              <h3 className="font-semibold text-[24px]">Discover</h3>
              <ul className="space-y-2 text-[14px] text-black">
                <li>
                  <Link href="#">Payment Method</Link>
                </li>
                <li>
                  <Link href="#">EMI</Link>
                </li>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">B2B Agent</Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[24px]">Company</h3>
              <ul className="space-y-2 text-[14px] text-black">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Contact Us</Link>
                </li>
                <li>
                  <Link href="#">Customer Support</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Cookies Policy</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[24px]">Services</h3>
              <ul className="space-y-2 text-[14px] text-black">
                <li>
                  <Link href="#">Tour & Travels </Link>
                </li>
                <li>
                  <Link href="#">Flights</Link>
                </li>
                <li>
                  <Link href="#">Hotels</Link>
                </li>
                <li>
                  <Link href="#">Umrah</Link>
                </li>
                <li>
                  <Link href="#">Hajj</Link>
                </li>
                <li>
                  <Link href="#">Visa</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[24px]">Accepted Payments</h3>
              <div className="grid grid-cols-3 gap-4">
                {imagesData?.map((image) => (
                  <div className="bg-white h-20 p-3 w-full flex items-center justify-center">
                    <Image
                      src={image?.image}
                      alt={image?.alt}
                      className=" w-full "
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[14px]">
                Others International Debit and Credit Cards are Accepted
              </p>
              <h3 className="font-semibold text-[24px]">Stay Connected</h3>
              <div className="flex gap-4 items-center">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Image src={fb}></Image>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Image src={linkedin}></Image>
                </Link>
                <Link
                  href="https://wa.me/+13476986704"
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image className="w-8 h-8" src={wp} alt="WhatsApp Icon" />
                </Link>

                {/* <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Image src={wp}></Image>
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-black">
          <p>© Copyright 2024, All Rights Reserved by Adbiyas Tour & Travels</p>
        </div>
      </div>
    </footer>
  );
}
