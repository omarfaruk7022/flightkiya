import Navbar from "@/components/common/navbar/Navbar";
import TripDetailsPage from "@/components/tripDetailsPage/TripDetailsPage";
import React from "react";
export default function page({ params }) {
  return (
    <div>
      <Navbar />
      <TripDetailsPage id={params?.id} />
    </div>
  );
}
