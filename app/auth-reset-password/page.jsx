"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchData } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const payload = {
    email: email,
  };

  const mutation = useMutation({
    mutationFn: () => fetchData(`auth/reset-pass`, "PATCH", payload),
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
    // mail validate

    if (!email) {
      setError("Please enter your email");
      return;
    }
    setIsLoading(true);
    mutation.mutate();
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/auth-login");
      }, 4000);
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center">
            Forget Password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Please enter your Email
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1"
              required
            />
          </div>

          {/* <div className="space-y-2">
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
            </div> */}

          <button
            type="submit"
            className="w-full shadow-lg p-2 bg-black rounded-lg text-white hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? "Sending mail..." : "Send mail"}
          </button>
        </form>
      </div>
    </div>
  );
}
