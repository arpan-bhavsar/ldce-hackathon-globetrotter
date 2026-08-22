import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-sky-600 tracking-tight">Globe Trotter</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 font-bold hover:text-sky-600 px-4 py-2">Login</Link>
          <Link to="/register" className="bg-sky-600 text-white font-bold px-6 py-2 rounded-full hover:bg-sky-700 transition-colors shadow-sm">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Plan your dream trip.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-orange-500">
            All in one place.
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate smart itinerary builder and budget tracker. Stop switching between spreadsheets and maps, and start traveling.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1">
              Start Planning for Free
            </button>
          </Link>
          <Link to="/explore">
            <button className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-lg font-bold py-4 px-10 rounded-full shadow-sm transition-colors">
              Explore Destinations
            </button>
          </Link>
        </div>
      </div>

      {/* Preview Image / Mockup area */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-c8cb89d21b1e?w=1200&auto=format&fit=crop" 
            alt="Travel Planning" 
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}