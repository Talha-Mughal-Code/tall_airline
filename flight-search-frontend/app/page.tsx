import { Suspense } from "react";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { Sparkles, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Different Background Pattern - More subtle and darker */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <main className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center space-y-12 text-center">
        {/* Different branding and logo */}
        <div className="space-y-6 max-w-3xl relative z-20">
          <div className="flex items-center justify-center space-x-3 mb-6 relative z-20">
            <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform relative z-20">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <span className="text-3xl font-black tracking-wider text-white relative z-20">WanderWings</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight relative z-20">
            Your Journey Starts Here
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed relative z-20">
            Discover unbeatable flight deals across the globe. Compare prices, find the perfect route, and book your next adventure with confidence.
          </p>
        </div>

        <div className="relative z-30 w-full max-w-5xl">
          <Suspense fallback={<div className="h-[400px] w-full bg-white/5 backdrop-blur rounded-2xl animate-pulse border border-white/10" />}>
            <FlightSearchForm className="w-full shadow-2xl" />
          </Suspense>
        </div>

        {/* Different feature cards with different content and icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-20 relative z-20">
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Lightning Fast</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Our advanced search engine delivers comprehensive flight options in milliseconds, saving you time and effort.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Global Coverage</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Access millions of flight options from major airlines and carriers worldwide, all in one convenient platform.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Best Value</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              We analyze thousands of routes to help you find the most cost-effective options without compromising on quality.
            </p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 text-center w-full z-20 text-blue-200/60 text-xs font-light">
        © 2024 WanderWings. Your trusted travel companion.
      </footer>
    </div>
  );
}
