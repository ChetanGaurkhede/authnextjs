"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { set } from "mongoose";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [error, setError] = useState("");

  const logIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("start");

    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", user);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      console.log(res.data);
      toast.success("Login successful!");
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      console.log("❌ error in fetching api", error.response?.data || error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        toast.error("Login failed");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <div className="bg-gray-700 w-md m-auto mt-5 rounded-xl p-6 text-white">
      <h1 className="text-center text-3xl mb-4">
        Login{" "}
        {loading && (
          <span className="text-sm ml-2 text-yellow-400">Loading...</span>
        )}
      </h1>

      <form onSubmit={logIn} className="flex flex-col gap-4">
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-3 rounded-xl border border-gray-300 text-black"
        />
        <div className="relative w-full">
          <input
            id="password"
            type={eyeIcon ? "text" : "password"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="h-12 w-full pr-10 px-4 py-2 rounded-xl border border-gray-300 text-black"
          />

          <button
            type="button"
            onClick={() => setEyeIcon(!eyeIcon)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-label={eyeIcon ? "Hide password" : "Show password"}
          >
            {eyeIcon ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={!disabled || loading}
          className={`bg-blue-600 px-4 py-2 rounded-md mt-2  ${
            !disabled || loading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {loading ? "Submitting..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline italic">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
