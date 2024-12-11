// pages/signup.js
"use client";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logoBlack from "@/public/images/logo-black.png";
import Navbar from "@/components/common/navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetcher";
import Link from "next/link";
import { toast } from "react-toastify";
import flightStore from "@/store";
import { Oval } from "react-loader-spinner";
import Cookies from "js-cookie";
export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { setToken } = flightStore();
  const payload = {
    full_name: name,
    email: email,
    password: password,
    phone_number: phone,
  };

  const {
    data: registerData,
    error: registerDataError,
    isLoading: registerDataLoading,
    refetch: registerDataRefetch,
  } = useQuery({
    queryKey: ["registration", payload],
    queryFn: () => fetchData(`auth/registration`, "POST", payload),
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(payload);
    if (password !== confirmPassword) {
      toast.error("password is not matched to confirm password");
      return;
    }
    if (!isChecked) {
      toast.error("Please agree to terms and conditions");
      return;
    }
    if (name == "" || name == undefined) {
      toast.error("Please enter name");
      return;
    }
    if (email === undefined || email === "") {
      toast.error("Please enter email");
      return;
    }
    if (phone === undefined || phone === "") {
      toast.error("Please enter phone number");
      return;
    }

    registerDataRefetch();
  };

  useEffect(() => {
    if (registerData && registerData.success) {
      toast.success(registerData?.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      Cookies.set("auth-token", registerData.token);

      setToken(registerData?.token);
    } else {
      toast.error(registerData?.error?.message);
    }
  }, [registerData]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Create an account to easily use adbiyastoure.com services.
          </p>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="fullName"
                placeholder="Full name "
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="someone@example.com"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Mobile Field */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="mobile">
                Mobile
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="mobile"
                  placeholder="01XXX XXXXX"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer top-2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer top-2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  onChange={() => setIsChecked(!isChecked)}
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-600">
                  By creating an account you agree to our{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Sign-Up Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {registerDataLoading ? (
                <div className="flex justify-center items-center">
                  {" "}
                  <Oval
                    visible={true}
                    height="25"
                    width="25"
                    secondaryColor="#fff"
                    color="#fff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <span> Sign Up</span>
              )}
            </button>

            {/* Already have an account */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href="/auth-login"
                className="text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
