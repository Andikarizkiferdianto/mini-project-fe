import React, { useState } from 'react';
import LogoSap from '../assets/LogoSap.png'; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-slate-900 font-sans">
      
      {/* --- SEKSI KIRI: BRANDING & LOGO --- */}
<div className="w-full lg:w-1/2 bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center p-12 lg:p-16">
  <div className="text-center text-white flex flex-col items-center">
    
    {/* Wadah Ikon dengan Animasi Tanpa Config */}
    <div className="bg-white/10 p-4 rounded-3xl mb-8 lg:mb-12 shadow-inner border border-white/10 
      animate-[float_3s_ease-in-out_infinite]">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <img 
        src={LogoSap} 
        alt="logo" 
        className="h-24 lg:h-32 w-auto invert brightness-0"
      />
    </div>

    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight mb-3 lg:mb-4">
      SAP<span className="text-white"> |</span> Sistem Akademik Pintar
    </h1>
  </div>
</div>
      
<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
  <div className="w-full max-w-[440px]">
    
    <div className="mb-10 text-center">
      <h2 className="text-[32px] font-bold text-slate-800 mb-1">
        Login Ke Aplikasi
      </h2>
    </div>

    <form className="space-y-5">
      <div>
        <label className="block text-[13px] font-bold text-slate-700 mb-2">Email</label>
        <input 
          type="email" 
          placeholder="Masukkan email" 
          className="w-full px-4 py-2.5 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm"
        />
      </div>

<div className="text-left">
  <div className="flex items-center justify-between mb-2">
    <label className="block text-[13px] font-bold text-slate-700">Password</label>
    <a href="#" className="text-[12px] font-medium text-violet-600 hover:underline">
      Lupa Password ?
    </a>
  </div>
  <div className="relative">
    <input 
      type={showPassword ? "text" : "password"}
      placeholder="Masukkan password" 
      className="w-full px-4 py-2.5 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm"
    />
    
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-violet-600 transition-colors"
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      )}
    </button>
  </div>
</div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-violet-600" />
          <span className="text-[13px] text-slate-600 font-medium">Ingatkan Saya</span>
        </label>
        
        <button 
          type="submit"
          className="bg-[#5c3cfc] hover:bg-[#4a2ed9] text-white font-bold py-2.5 px-8 rounded-md text-sm transition-all shadow-md"
        >
          Sign In
        </button>
      </div>
    </form>
    <div className="mt-20 text-center text-slate-400 text-[12px]">
      <p>Butuh bantuan? <a href="#" className="text-violet-600 font-bold hover:underline">Hubungi IT Support</a></p>
    </div>

  </div>
</div>
    </div>
  );
}

export default Login;