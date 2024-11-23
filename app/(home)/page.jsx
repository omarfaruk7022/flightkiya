import FlightSearch from "@/components/flightSearch/FlightSearch";
import Ads from "@/components/home/ads/Ads";
import BannerAds from "@/components/home/bannerAds/BannerAds";
import ExclusiveOffers from "@/components/home/excusiveOffers/ExclusiveOffers";
import Packages from "@/components/home/packages/Packages";
import RequestNow from "@/components/home/requestNow/RequestNow";
import SpecialOffers from "@/components/home/specialOffers/SpecialOffers";
import React from "react";

export default function Home() {
  return (
    <div className=" w-full bg-[#FCF5F5] ">
      <FlightSearch />
      <div className="px-5 md:px-48 py-20 mt-20 z-0">
      <RequestNow/>

        <BannerAds />
        <ExclusiveOffers />
        <SpecialOffers />
        <Ads />
        <Packages />
      </div>
    </div>
  );
}
