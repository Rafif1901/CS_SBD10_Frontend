"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
      });

      if (response.data.payload && response.data.payload.token) {
        localStorage.setItem("token", response.data.payload.token);
      }
      router.push("/products");
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black rounded-3xl shadow-2xl p-10">
        
        <h1 className="text-4xl font-bold text-white text-center mb-10 tracking-wide">Login</h1>

        {isError && (
          <div className="mb-6 flex justify-center items-center gap-2 text-red-500 bg-red-950/40 p-3 rounded-lg border border-red-500/50">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-semibold">invalid email or password</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          
          <div className="space-y-2 relative">
            <label className="text-xs font-semibold text-gray-400">Email</label>
            <div className="relative flex items-center border-b border-gray-600 pb-2 focus-within:border-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500 absolute left-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
              <input
                type="email"
                required
                placeholder="Type your Email"
                className="w-full bg-transparent text-white placeholder-gray-600 pl-9 pr-3 outline-none caret-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-xs font-semibold text-gray-400">Password</label>
            <div className="relative flex items-center border-b border-gray-600 pb-2 focus-within:border-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500 absolute left-1">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                required
                placeholder="Type your password"
                className="w-full bg-transparent text-white placeholder-gray-600 pl-9 pr-3 outline-none caret-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase 
                     bg-gradient-to-r from-blue-700 to-blue-400
                     hover:from-blue-900 hover:to-blue-900 hover:scale-105
                     transition-all duration-300 shadow-lg"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-xs mb-4">Or Sign Up Using</p>
          <Link href="/register" className="text-white font-semibold text-sm hover:text-gray-400 transition-colors uppercase">
            SIGN UP
          </Link>
        </div>

      </div>
    </div>
  );
}