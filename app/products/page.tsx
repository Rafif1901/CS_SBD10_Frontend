"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [saldo, setSaldo] = useState(10000000); 
  const [statusModal, setStatusModal] = useState<"none" | "success" | "failed" | "empty">("none");

  useEffect(() => {
    const saved = localStorage.getItem("userBalance");
    if (saved) {
      setSaldo(parseInt(saved));
    } else {
      localStorage.setItem("userBalance", "10000000");
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`).then((res) => {
      setItems(res.data.payload);
    });
  }, []);

  const handleAddToCart = (id: number) => {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  const handleUpdateQty = (id: number, delta: number) => {
    const newQty = (cart[id] || 0) + delta;
    if (newQty <= 0) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart({ ...cart, [id]: newQty });
    }
  };

  const handleCheckout = () => {
    const totalCost = Object.keys(cart).reduce((acc, id) => {
      const item: any = items.find((i: any) => i.id === parseInt(id));
      return acc + (item.price * cart[parseInt(id)]);
    }, 0);

    if (totalCost === 0) {
      setStatusModal("empty");
    } else if (saldo >= totalCost) {
      const newSaldo = saldo - totalCost;
      setSaldo(newSaldo);
      localStorage.setItem("userBalance", newSaldo.toString()); 
      setStatusModal("success");
      setCart({});
    } else {
      setStatusModal("failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pb-24 font-sans text-white">
      <nav className="bg-[#0b0e14] py-5 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-40">
        <div className="text-2xl font-black text-[#2563eb] tracking-tighter">SBD STORE</div>
        <div className="flex gap-8 text-sm font-bold tracking-wider items-center text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/topup" className="hover:text-white transition-colors">Top Up Credits</Link>
          <span className="cursor-pointer hover:text-white transition-colors">Contact</span>
          <div className="bg-[#121826] px-5 py-2.5 rounded-xl border border-gray-800 flex items-center gap-2 shadow-lg">
            <span className="text-white tracking-widest uppercase text-[10px]">Credits:</span> 
            <span className="text-[#60a5fa] font-bold">{saldo.toLocaleString('en-US')}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="max-w-3xl mx-auto mb-16">
          <input 
            type="text" 
            placeholder="Search items by name..." 
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-full py-4 px-8 outline-none focus:border-gray-600 transition-all text-white shadow-xl"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())).map((item: any, index: number) => (
            <div key={item.id} className="bg-[#0b0e14] border border-gray-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-[#151b2b] rounded-xl mb-5 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute top-3 left-3 bg-white text-blue-600 text-xs font-black px-2.5 py-1 rounded-full z-10 shadow-lg">
                    #{index + 1}
                  </div>
                  <img 
                    src={`/${item.name.toLowerCase()}.png`}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  {!items && <span className="text-gray-700 font-black">IMAGE</span>}
                </div>
                <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                <p className="text-[#3b82f6] font-black text-base mb-4">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              
              <div className="mt-2">
                {!cart[item.id] ? (
                  <button 
                    onClick={() => handleAddToCart(item.id)}
                    className="w-full bg-[#2563eb] py-2.5 rounded-xl text-white font-bold hover:bg-blue-700 transition-colors text-xs"
                  >
                    BUY
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-[#151b2b] rounded-xl p-2 border border-gray-800">
                    <button onClick={() => handleUpdateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg hover:bg-[#ef4444] hover:text-white transition-colors font-bold">-</button>
                    <span className="font-bold text-[#60a5fa]">{cart[item.id]}</span>
                    <button onClick={() => handleUpdateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg hover:bg-[#22c55e] hover:text-white transition-colors font-bold">+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0b0e14]/90 backdrop-blur-md border-t border-gray-800 p-5 flex justify-center z-40">
        <button 
          onClick={handleCheckout}
          className="flex items-center gap-3 bg-[#22c55e] px-10 py-3 rounded-full text-black font-black uppercase hover:bg-[#16a34a] transition-colors"
        >
          <span>CHECKOUT</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>

      {statusModal !== "none" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col text-black">
            <div className={`${statusModal === 'success' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'} p-8 flex flex-col items-center justify-center`}>
              <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mb-3">
                {statusModal === 'success' ? (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">{statusModal === 'success' ? 'SUCCESS' : 'FAILED'}</h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 font-semibold mb-8">
                {statusModal === 'success' ? 'Thank you for your purchase' : statusModal === 'empty' ? 'No items added' : 'Not enough credits'}
              </p>
              <button onClick={() => setStatusModal("none")} className="bg-[#2563eb] text-white font-bold py-2.5 px-8 rounded-full hover:bg-blue-700 transition-colors text-xs uppercase">CONTINUE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}