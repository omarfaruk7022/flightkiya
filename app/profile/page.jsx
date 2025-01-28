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
import { Plane, Calendar, CreditCard, Globe, IdCard } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { fetchData } from "@/utils/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import flightStore from "@/store";
import { toast } from "react-toastify";
import BookingCard from "@/components/profile/BookingCard";
import CanceledCard from "@/components/profile/CanceledCard";
import { MapPin, User, AtSign, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState();

  // const { token, setToken } = flightStore();
  const token = Cookies.get("auth-token");

  useEffect(() => {
    const checkAuth = () => {
      const authToken = Cookies.get("auth-token");
      if (!authToken) {
        router.push("/auth-login");
        return;
      }

      try {
        const decodedToken = jwtDecode(authToken);
        setUserData(decodedToken);
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

  const {
    data: userInfo,
    error: userInfoError,
    isLoading: userInfoLoading = true,
    refetch: userInfoRefetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchData(`b2c/user/profile`, "GET", null, token),
    enabled: true,
  });

  const {
    data: allCanceledBookings,
    error: allCanceledBookingsError,
    isLoading: allCanceledBookingsLoading = true,
    refetch: allCanceledBookingsRefetch,
  } = useQuery({
    queryKey: ["canceled-bookings"],
    queryFn: () =>
      fetchData(`b2c/user/cancel-booking-req?limit=1000`, "GET", null, token),
    enabled: false,
  });
  useEffect(() => {
    if (userInfo?.data && token) {
      allCanceledBookingsRefetch();
      allBookingsRefetch();
      setProfileFormData(userInfo?.data);
    }
  }, [token, userInfo]);

  const resetPassPayload = {
    email: userInfo?.data?.email,
  };

  const mutation = useMutation({
    mutationFn: () =>
      fetchData(`b2c/user/profile`, "PATCH", profileFormData, token),
    onSuccess: (data) => {
      toast.success(data?.message);
      userInfoRefetch();
    },
    onError: (error) => {
      console.error("Mutation failed", error);
      toast.error(error?.message);
    },
  });

  const profileMutation = useMutation({
    mutationFn: (formData) =>
      fetchData(`b2c/user/profile-picture`, "PUT", formData, token), // Pass your fetch logic here
    onSuccess: (data) => {
      toast.success(data?.message); // Notify success
      userInfoRefetch(); // Re-fetch user data if required
    },
    onError: (error) => {
      console.error("Mutation failed", error);
      toast.error(error?.message); // Notify error
    },
  });
  const {
    data: resetPassData,
    error: resetPassDataError,
    isLoading: resetPassDataLoading,
    refetch: resetPassDataRefetch,
  } = useQuery({
    queryKey: ["reset-pass"],
    queryFn: () => fetchData(`auth/reset-pass`, "PATCH", resetPassPayload),
    enabled: false,
  });

  const handleResetPassword = () => {
    resetPassDataRefetch();
  };

  useEffect(() => {
    if (resetPassData?.success == true) {
      toast.success(resetPassData?.message);
    }
  }, [resetPassData]);

  const user = userInfo?.data;

  if (isLoading || userInfoLoading) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("Profile Form Data", profileFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
    setIsOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      profileMutation.mutate(formData); // Trigger the mutation
      console.log("File uploaded", formData);
    }
  };

  // React Query mutation

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card className="col-span-full lg:col-span-1">
            <div className="p-6">
              <div className="flex flex-row items-center gap-4">
                {/* Avatar Container */}
                <div className="relative h-16 w-16">
                  <Avatar
                    className="h-full w-full cursor-pointer"
                    onClick={() =>
                      document.getElementById("profile-upload").click()
                    } // Trigger file input when avatar is clicked
                  >
                    <img
                      alt="User avatar"
                      src={
                        `https://flightkiya.cosmelic.com/` +
                          user?.profile_picture || "/default-avatar.png"
                      } // Fallback if profile_picture is null
                      className="rounded-full object-cover "
                    />
                  </Avatar>

                  {/* Pencil Icon */}
                  <div
                    onClick={() =>
                      document.getElementById("profile-upload").click()
                    } // Trigger file input when pencil icon is clicked
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div>
                  <h2 className="text-[22px] font-bold">{user?.full_name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 py-4 px-1">
                {/* Username */}
                <div className="flex items-center gap-2">
                  <AtSign className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Gender: {user?.gender}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Phone: {user?.phone_number}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Address: {user?.address}, {user?.city}, {user?.country},{" "}
                    {user?.postal_code}
                  </span>
                </div>

                {/* Nationality */}
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Nationality: {user?.nationality}
                  </span>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Date of Birth:{" "}
                    {new Date(user?.date_of_birth).toLocaleDateString("en-US")}
                  </span>
                </div>

                {/* Passport Number */}
                <div className="flex items-center gap-2">
                  <IdCard className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    Passport Number: {user?.passport_number}
                  </span>
                </div>
              </div>

              {/* Token Expiry */}
              <div className="mt-6 text-sm text-gray-500">
                <strong>Last login:</strong>{" "}
                {new Date(userData?.iat * 1000).toLocaleString()}
                <br />
                <strong>Token Expires At:</strong>{" "}
                {new Date(userData?.exp * 1000).toLocaleString()}
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Card className="col-span-full lg:col-span-2 ">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="flights">Recent Flights</TabsTrigger>
                <TabsTrigger value="canceled">Cancel requests</TabsTrigger>

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
                      <BookingCard
                        allBookingsRefetch={allBookingsRefetch}
                        allCanceledBookingsRefetch={allCanceledBookingsRefetch}
                        flight={flight}
                        from={flight?.origin}
                        to={flight?.destination}
                        date={flight?.departure_datetime}
                        status={flight?.ticketStatus}
                        id={flight?.pnrId}
                      />
                    ))}
                  </div>
                </TabsContent>
              )}

              <TabsContent value="canceled" className="p-4">
                <div className="space-y-4 h-[700px] overflow-y-scroll hide-scrollbar">
                  {allCanceledBookings?.data?.map((flight) => (
                    <CanceledCard
                      allCanceledBookingsRefetch={allCanceledBookingsRefetch}
                      flight={flight}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="settings" className="p-4">
                {/* <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.full_name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                  <button className="p-3 rounded-lg bg-[#6D28D9] hover:bg-[#4e268f] text-gray-100">
                    Save Changes
                  </button>
                </form> */}

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleResetPassword()}
                    className="p-3 rounded-lg bg-[#6D28D9] hover:bg-[#4e268f] text-gray-100"
                  >
                    {resetPassDataLoading ? "Loading..." : "Reset password"}
                  </button>

                  <div className=" flex items-center justify-center bg-gray-50 p-4">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="p-3 rounded-lg bg-[#6D28D9] hover:bg-[#4e268f] text-gray-100"
                    >
                      Edit Profile
                    </button>

                    {/* Dialog Backdrop */}
                    {isOpen && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsOpen(false)}
                      />
                    )}

                    {/* Dialog Content */}
                    {isOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-10">
                        <div
                          className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                              <h2 className="text-2xl font-bold text-gray-900">
                                Update Profile
                              </h2>
                              <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                              {/* Personal Information Section */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  Personal Information
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div>
                                    <label
                                      htmlFor="full_name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      name="full_name"
                                      id="full_name"
                                      value={profileFormData.full_name}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      id="email"
                                      value={profileFormData.email}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="gender"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Gender
                                    </label>
                                    <select
                                      name="gender"
                                      id="gender"
                                      value={profileFormData.gender}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    >
                                      <option value="Male">
                                        Male
                                      </option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="date_of_birth"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Date of Birth
                                    </label>
                                    <input
                                      type="date"
                                      name="date_of_birth"
                                      id="date_of_birth"
                                      value={profileFormData.date_of_birth}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-1.5"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Contact Information Section */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  Contact Information
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div>
                                    <label
                                      htmlFor="phone_number"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Phone Number
                                    </label>
                                    <input
                                      type="tel"
                                      name="phone_number"
                                      id="phone_number"
                                      value={profileFormData.phone_number}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div className="sm:col-span-2">
                                    <label
                                      htmlFor="address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      name="address"
                                      id="address"
                                      value={profileFormData.address}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="city"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      name="city"
                                      id="city"
                                      value={profileFormData.city}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="postal_code"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Postal Code
                                    </label>
                                    <input
                                      type="text"
                                      name="postal_code"
                                      id="postal_code"
                                      value={profileFormData.postal_code}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="country"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      name="country"
                                      id="country"
                                      value={profileFormData.country}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Identity Information Section */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  Identity Information
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div>
                                    <label
                                      htmlFor="passport_number"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Passport Number
                                    </label>
                                    <input
                                      type="text"
                                      name="passport_number"
                                      id="passport_number"
                                      value={profileFormData.passport_number}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="nationality"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Nationality
                                    </label>
                                    <input
                                      type="text"
                                      name="nationality"
                                      id="nationality"
                                      value={profileFormData.nationality}
                                      onChange={handleChange}
                                      className="mt-1 block w-full rounded-md border-2 border-gray-900 shadow-sm  focus:outline-none  sm:text-sm p-2"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end space-x-3 pt-6 border-t">
                                <button
                                  type="button"
                                  onClick={() => setIsOpen(false)}
                                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}
