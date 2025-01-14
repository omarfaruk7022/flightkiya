"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KeyRound, Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import flightStore from "@/store";
import { fetchData } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

export default function ResetPassword({ searchParams }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState();
  const { token, userInfo } = flightStore();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.token) {
      setResetToken(searchParams.token);
    }
  }, [searchParams]);

  const requirements = [
    { text: "At least 6 characters", met: password.length >= 6 },
    { text: "At least one number", met: /\d/.test(password) },
    {
      text: "At least one special character",
      met: /[!@#$%^&*]/.test(password),
    },
    {
      text: "Passwords match",
      met: password === confirmPassword && password !== "",
    },
  ];

  const payload = {
    newPassword: password,
    email: searchParams?.email ? searchParams?.email : userInfo?.email,
  };

  const mutation = useMutation({
    mutationFn: () =>
      fetchData(`auth/reset-pass/${resetToken}`, "PATCH", payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      setSuccess(true);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Mutation failed", error);
      toast.error(error?.message);
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if all requirements are met
    if (!requirements.every((req) => req.met)) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    mutation.mutate();
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">
              Password Reset Successful
            </h2>
            <p className="mt-2 text-gray-600">
              Your password has been reset successfully. You can now login with
              your new password.
            </p>
            {token ? (
              <button
                onClick={() => router.push("/profile")}
                className="w-full shadow-lg p-2 bg-black rounded-lg text-white hover:bg-gray-800 mt-6"
              >
                Go to Profile
              </button>
            ) : (
              <button
                className="w-full shadow-lg p-2 bg-black rounded-lg text-white hover:bg-gray-800 mt-6"
                onClick={() => router.push("/login")}
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Please enter your new password below
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="mt-1"
              required
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Password Requirements:</p>
            <div className="space-y-2">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center text-sm">
                  {requirement.met ? (
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  <span
                    className={
                      requirement.met ? "text-green-700" : "text-red-700"
                    }
                  >
                    {requirement.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full shadow-lg p-2 bg-black rounded-lg text-white hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
