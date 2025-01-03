import FlightSearch from "@/components/flightSearch/FlightSearch";
import Ads from "@/components/home/ads/Ads";
import AppsSection from "@/components/home/appsSection/AppsSection";
import BannerAds from "@/components/home/bannerAds/BannerAds";
import ExclusiveOffers from "@/components/home/excusiveOffers/ExclusiveOffers";

import SpecialOffers from "@/components/home/specialOffers/SpecialOffers";
import Subscribe from "@/components/home/subscribe/subscribe";
import React from "react";

export default function Home() {
  return (
    <div className=" w-full ">
      <FlightSearch />
      <div className="px-5 md:px-48 py-20 mt-0  md:mt- z-0 flex flex-col gap-7">
        {/* <RequestNow /> */}

        <BannerAds />
        <ExclusiveOffers />
        <SpecialOffers />
        <Ads />
        {/* <Packages /> */}
      </div>
      <Subscribe />
      <AppsSection />
    </div>
  );
}
