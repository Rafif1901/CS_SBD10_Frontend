"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] font-sans text-white">
      <nav className="bg-[#0b0e14] py-5 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-40">
        <Link href="/products" className="text-2xl font-black text-[#2563eb] tracking-tighter">SBD STORE</Link>
        <div className="flex gap-8 text-sm font-bold tracking-wider items-center text-gray-400">
          <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
          <Link href="/topup" className="hover:text-white transition-colors">Top Up Credits</Link>
          <span className="cursor-pointer hover:text-white transition-colors">Contact</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-black border border-gray-800 rounded-3xl p-12 shadow-2xl">
          <h1 className="text-5xl font-black text-[#2563eb] mb-8">About Us</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              Welcome to <span className="text-white font-bold">SBD Store</span>, a high-performance e-commerce platform built as part of the Database Systems Practical Module 10. Established in 2026, our mission is to provide a seamless digital shopping experience with cutting-edge technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Frontend Stack</h3>
                <p className="text-blue-400">Next.js 15, TypeScript, Tailwind CSS</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Backend Stack</h3>
                <p className="text-blue-400">Node.js, Express.js, PostgreSQL</p>
              </div>
            </div>

            <hr className="border-gray-800 my-8" />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Contact Support</h2>
              <p>For any inquiries regarding our services or technical issues, feel free to reach our 24/7 customer support team:</p>
              <div className="flex items-center gap-4 text-[#22c55e] font-mono text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +62 821-9353-0105
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}