"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      if (response.data.error) {
        toast.error(response.data.error);
        setMessage(response.data.error);
      } else {
        toast.success(response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while verifying your email.");
      setMessage("An error occurred while verifying your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Verify Email</h2>
        {loading ? <p className="text-center text-gray-700">Verifying your email...</p> : <p className="text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
