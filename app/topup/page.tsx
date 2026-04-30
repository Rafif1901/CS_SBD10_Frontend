"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopUpPage() {
  const [credits, setCredits] = useState(10000000);
  const [showModal, setShowModal] = useState(false);
  const [isMaxError, setIsMaxError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userBalance");
    if (saved) setCredits(parseInt(saved));
  }, []);

  const handleTopUp = (amount: number) => {
    const maxCredits = 100000000;
    if (credits + amount > maxCredits) {
      setIsMaxError(true);
      setShowModal(true);
    } else {
      const newTotal = credits + amount;
      setCredits(newTotal);
      localStorage.setItem("userBalance", newTotal.toString());
      setIsMaxError(false);
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] font-sans text-white">
      <nav className="bg-[#0b0e14] py-5 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-40">
        <Link href="/products" className="text-2xl font-black text-[#2563eb] tracking-tighter">SBD STORE</Link>
        <div className="flex gap-8 text-sm font-bold tracking-wider items-center text-gray-400">
          <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="bg-white rounded-[40px] p-12 shadow-2xl w-full max-w-lg text-center transform transition-all hover:scale-[1.01]">
          <h2 className="text-[#0b0e14] text-3xl font-black mb-4">Credits Demo</h2>
          <div className="text-[#22c55e] text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-10 drop-shadow-sm truncate px-4">
            {credits.toLocaleString()}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[500000, 1000000, 10000000, 25000000, 50000000, 100000000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleTopUp(amount)}
                className="bg-[#0b0e14] text-white py-4 rounded-2xl font-bold hover:bg-[#2563eb] transition-all text-sm tracking-widest shadow-lg active:scale-95"
              >
                + {amount.toLocaleString()}
              </button>
            ))}
          </div>
          
          <p className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
            Maximum credit limit: 100,000,000
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in duration-300">
            
            <div className={`${!isMaxError ? 'bg-[#22c55e]' : 'bg-[#ef4444]'} p-10 flex flex-col items-center justify-center`}>
              <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mb-3">
                {!isMaxError ? (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">
                {!isMaxError ? 'SUCCESS' : 'FAILED'}
              </h2>
            </div>
            
            <div className="p-10 text-center bg-white">
              <p className="text-gray-600 font-semibold text-base mb-8">
                {!isMaxError ? 'Thank you for your purchase' : 'Max credits limit reached!'}
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="bg-[#2563eb] text-white font-bold py-3 px-10 rounded-full hover:bg-blue-700 transition-colors text-sm uppercase tracking-wider w-full"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}