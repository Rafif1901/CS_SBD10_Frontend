"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");

    try {
      await axios.post("http://localhost:3000/user/register", formData);
      setShowSuccessModal(true);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Check your data."
      );
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="bg-[#8bc34a] p-8 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-white tracking-widest uppercase">SUCCESS</h2>
            </div>
            <div className="p-8 text-center flex flex-col items-center bg-gray-50">
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Congratulations, your account<br />has been successfully created.
              </p>
              <button 
                onClick={handleContinue}
                className="bg-[#8bc34a] text-white text-sm font-semibold py-2 px-8 rounded-full hover:bg-[#7cb342] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`w-full max-w-md bg-black rounded-3xl shadow-2xl p-10 transition-opacity duration-300 ${showSuccessModal ? 'opacity-30' : 'opacity-100'}`}>
        
        <h1 className="text-4xl font-bold text-white text-center mb-2 tracking-wide">Register</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">create new account</p>

        {isError && (
          <div className="mb-6 flex justify-center items-center gap-2 text-red-500 bg-red-950/40 p-3 rounded-lg border border-red-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <span className="text-xs font-semibold text-center">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          
          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-400">Full Name</label>
            <div className="relative flex items-center border-b border-gray-600 pb-1 focus-within:border-white transition-colors">
              <input type="text" name="name" required placeholder="Type your full name" className="w-full bg-transparent text-white placeholder-gray-600 outline-none caret-white" value={formData.name} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-400">Username</label>
            <div className="relative flex items-center border-b border-gray-600 pb-1 focus-within:border-white transition-colors">
              <input type="text" name="username" required placeholder="Type your username" className="w-full bg-transparent text-white placeholder-gray-600 outline-none caret-white" value={formData.username} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-400">Email</label>
            <div className="relative flex items-center border-b border-gray-600 pb-1 focus-within:border-white transition-colors">
              <input type="email" name="email" required placeholder="Type your email" className="w-full bg-transparent text-white placeholder-gray-600 outline-none caret-white" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-400">Phone</label>
            <div className="relative flex items-center border-b border-gray-600 pb-1 focus-within:border-white transition-colors">
              <input type="text" name="phone" placeholder="Type your phone number" className="w-full bg-transparent text-white placeholder-gray-600 outline-none caret-white" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-400">Password</label>
            <div className="relative flex items-center border-b border-gray-600 pb-1 focus-within:border-white transition-colors">
              <input type="password" name="password" required placeholder="Type your password" className="w-full bg-transparent text-white placeholder-gray-600 outline-none caret-white" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase 
                     bg-gradient-to-r from-blue-700 to-blue-400
                     hover:from-blue-900 hover:to-blue-900 hover:scale-105
                     transition-all duration-300 shadow-lg"
          >
            REGISTER
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs mb-4">Already have an account?</p>
          <Link href="/" className="text-white font-semibold text-sm hover:text-gray-400 transition-colors uppercase">
            LOGIN
          </Link>
        </div>

      </div>
    </div>
  );
}