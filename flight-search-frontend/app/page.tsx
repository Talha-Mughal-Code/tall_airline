import { Suspense } from "react";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { Plane } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-slate-900">
      {/* Background Image / Gradient */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2948&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

      <main className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center space-y-8 text-center">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-center space-x-2 text-blue-400 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Plane className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">SkySearch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Explore the World, <br />
            <span className="text-blue-400">One Flight at a Time.</span>
          </h1>
          <p className="text-lg text-slate-200 text-shadow mb-8">
            Find the best deals on flights to your dream destinations based on price, comfort, and more.
          </p>
        </div>

        <Suspense fallback={<div className="h-[400px] w-full max-w-4xl bg-white/10 backdrop-blur rounded-xl animate-pulse" />}>
          <FlightSearchForm className="w-full max-w-4xl shadow-2xl" />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 text-left">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white">
            <h3 className="font-bold text-lg mb-2">Fast Search</h3>
            <p className="text-sm text-slate-300">Get results in seconds from hundreds of airlines worldwide.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white">
            <h3 className="font-bold text-lg mb-2">Real-time Pricing</h3>
            <p className="text-sm text-slate-300">See live price updates as you filter and adjust your preferences.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white">
            <h3 className="font-bold text-lg mb-2">Smart Filters</h3>
            <p className="text-sm text-slate-300">Easily find non-stop flights, specific airlines, and budget-friendly options.</p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-4 text-center w-full z-10 text-slate-500 text-sm">
        Built for Amadeus Flight Search Assessment
      </footer>
    </div>
  );
}
