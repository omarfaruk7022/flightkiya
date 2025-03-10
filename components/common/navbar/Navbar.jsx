"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logoBlack from "@/public/images/logo.png";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TopBar from "@/components/topbar/TopBar";
import flightStore from "@/store";
export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [categoryTab, setCategoryTab] = useState("flight");
  const [authToken, setAuthToken] = useState();
  const { setUserInfo, token, setToken } = flightStore();
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get("auth-token");
    setAuthToken(authToken);
  }, []);

  const handleLogOut = () => {
    Cookies.remove("auth-token");
    router.push("/auth-login");
    setToken(null);
    setUserInfo({});
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-white`}
      >
        {/* <TopBar /> */}
        <nav className="max-w-7xl mx-auto px-6 md:px-0 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src={logoBlack}
              alt="Logo"
              className="w-[120px]  md:w-[300px]"
            />
          </Link>
          <div className="   container  rounded-[22px] w-full px-32 mx-auto bottom-[-25px] hidden md:block">
            {/* <div className="flex items-center justify-between px-14 flex-wrap">
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "flight"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("flight")}
              >
                <div className=" flex flex-col items-center  gap-1">
                  <Image src={flight} alt="" className="w-[30px] h-[30px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Flight
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "hotel"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("hotel")}
              >
                <div className=" flex flex-col items-center gap-1">
                  <Image src={hotel} alt="" className="w-[28px] h-[28px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Hotel
                  </span>
                </div>
              </div>{" "}
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "tour"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("tour")}
              >
                <div className=" flex flex-col items-center gap-1">
                  <Image
                    src={tour}
                    alt=""
                    className="w-[28px] text-sky-950 h-[28px]"
                  />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Tour
                  </span>
                </div>
              </div>{" "}
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "visa"
                    ? "border-b-4 border-[var(--tertiary)] py-2"
                    : ""
                }`}
                onClick={() => setCategoryTab("visa")}
              >
                <div className=" flex flex-col items-center gap-1">
                  <Image src={visa} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Visa
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "aboutus"
                    ? "border-b-4 border-[var(--tertiary)] py-2"
                    : ""
                }`}
                onClick={() => setCategoryTab("aboutus")}
              >
                <div className=" flex flex-col items-center gap-1">
                  <Image src={aboutImg} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    About us
                  </span>
                </div>
              </div>
            </div> */}
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-10">
            {/* Currency Selector */}
            {/* <Image src={usd} alt="USD Icon" />
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsOpenCurrency(!isOpenCurrency)}
              >
                <span className="text-gray-700">USD</span>
                <IoIosArrowDown size={20} className="text-gray-700" />
              </div>

              {isOpenCurrency && scrollY > 0 && (
                <div
                  className="absolute end-0 z-10 mt-2 rounded-2xl w-full md:w-[243px] h-[112px] border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className=" flex p-5 justify-between ">
                    <div>
                      <p className="text-[#0F5677] text-[14px] font-semibold mb-2">
                        Region
                      </p>
                      <ul className="text-[12px] space-y-2">
                        <li>Bangladesh</li>
                        <li>Bangladesh</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#0F5677] text-[14px] font-semibold mb-2">
                        Currency
                      </p>
                      <ul className="text-[12px] space-y-2">
                        <li>USD</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            {/* Sign In Button */}
            {token ? (
              <>
                <Link href="/profile">
                  <button className="p-3 bg-[var(--primary-btn)] text-[var(--dark-text)] rounded-md font-semibold text-[8px] md:text-[12px]">
                    Profile
                  </button>
                </Link>

                <button
                  onClick={handleLogOut}
                  className=" p-3 bg-[var(--primary-btn)] text-[var(--dark-text)] rounded-md font-semibold text-[8px] md:text-[12px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth-login">
                <button className="w-[90px] h-[40px] bg-[var(--primary-btn)] text-[var(--dark-text)] rounded-md font-semibold text-[12px]">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
