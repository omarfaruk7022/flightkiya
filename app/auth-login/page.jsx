"use client";
import Navbar from "@/components/common/navbar/Navbar";
import EyeOffIcon from "@/public/icons/EyeOffIcon";
import flightStore from "@/store";
import { fetchData } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setToken } = flightStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    const payload = {
      username: email,
      password: password,
    };
    if (email === undefined || email === "") {
      toast.error("Email is required");
      return;
    }
    if (password === undefined || password === "") {
      toast.error("Password is required");
      return;
    }
    try {
      const data = await fetchData("auth/login", "POST", payload);

      Cookies.set("auth-token", data.token);
      setToken(data.token);

      router.push("/profile");
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-[500px] w-full">
          {/* <button className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 font-medium mb-4 flex justify-center items-center">
            <FcGoogle className=" w-6 h-6" />
            Login with Google
          </button>

          <div className="flex items-center mb-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="someone@example.com"
              />
            </div>

            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 top-[25px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1.75 12S4.25 5 12 5s10.25 7 10.25 7-2.5 7-10.25 7-10.25-7-10.25-7z"
                    />
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Link
                href="#"
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md text-center font-medium hover:bg-indigo-700"
            >
              {isLoading ? (
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
                <span> Sign In</span>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/auth-singup"
              className="text-indigo-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
