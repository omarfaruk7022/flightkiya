"use client";
import Navbar from "@/components/common/navbar/Navbar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import avatar from "@/public/images/avatar.jpg";
import jwt from "jsonwebtoken";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, MapPin, Calendar, CreditCard } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { fetchData } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import flightStore from "@/store";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { token, setToken } = flightStore();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = Cookies.get("auth-token");
      if (!authToken) {
        router.push("/auth-login");
        return;
      }

      try {
        const decodedToken = jwtDecode(authToken);
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        Cookies.remove("auth-token");
        router.push("/auth-login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const {
    data: allBookings,
    error: allBookingsError,
    isLoading: allBookingsLoading = true,
    refetch: allBookingsRefetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchData(`b2c/user/bookings`, "GET", null, token),
    enabled: false,
  });
  useEffect(() => {
    if (user && token) {
      allBookingsRefetch();
    }
  }, [token, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card className="col-span-full lg:col-span-1">
            <div className="p-6">
              <div className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <Image
                    alt="User avatar"
                    src={avatar}
                    className="rounded-full "
                  />
                 
                </Avatar>
                <div>
                  <h2 className="text-[22px] font-bold">{user?.full_name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>1234 **** **** 5678</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Card className="col-span-full lg:col-span-2 ">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="flights">Recent Flights</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              {allBookingsLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2">Loading...</p>
                  </div>
                </div>
              ) : (
                <TabsContent value="flights" className="p-4">
                  <div className="space-y-4 h-[700px] overflow-y-scroll hide-scrollbar">
                    {allBookings?.data?.map((flight) => (
                      <FlightCard
                        from="JFK"
                        to="LAX"
                        date="May 15, 2023"
                        status={flight?.ticketStatus}
                      />
                    ))}
                  </div>
                </TabsContent>
              )}
              <TabsContent value="settings" className="p-4">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.full_name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}

function FlightCard({ from, to, date, status }) {
  return (
    <Card>
      <div className="flex items-center gap-4 p-4">
        <Plane className="h-8 w-8 text-blue-500" />
        <div className="flex-1">
          <div className="text-lg font-semibold">
            {from} to {to}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
        <div
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            status === "BOOKED"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-orange-500"
          }`}
        >
          {status}
        </div>
      </div>
    </Card>
  );
}
