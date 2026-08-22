import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden selection:bg-sky-200">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className="text-3xl">🌍</span>
                <h1 className="text-2xl font-extrabold text-sky-600 tracking-tighter">GlobeTrotter</h1>
            </div>
            <div className="space-x-6 flex items-center">
                <Link to="/login" className="text-slate-600 font-semibold hover:text-sky-600 transition-colors">Log In</Link>
                <Link to="/register" className="bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-transform active:scale-95 shadow-sm">Sign Up Free</Link>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-sky-200/40 blur-3xl opacity-60 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-3xl opacity-60 pointer-events-none animate-pulse-slow" style={{animationDelay: '1s'}}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-semibold tracking-wide shadow-sm">
            ✨ The #1 Itinerary Builder
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
            Design Your Dream Trip, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600">
              Down to the Minute.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop juggling spreadsheets. GlobeTrotter automatically tracks your budgets, visualizes your timeline, and connects you with a global community of explorers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl shadow-sky-600/20 transition-all hover:-translate-y-1 active:scale-95">
                Start Planning — It's Free
              </button>
            </Link>
            <Link to="/explore">
              <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 text-lg font-bold py-4 px-10 rounded-full shadow-md border border-slate-200 transition-all hover:-translate-y-1 active:scale-95">
                Explore Destinations
              </button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-slate-500 font-medium">No credit card required. Join 50,000+ travelers.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-sky-600 text-white py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-sky-500/50">
              <div>
                  <div className="text-4xl font-extrabold mb-1">100k+</div>
                  <div className="text-sky-200 font-medium text-sm uppercase tracking-wider">Trips Planned</div>
              </div>
              <div>
                  <div className="text-4xl font-extrabold mb-1">195</div>
                  <div className="text-sky-200 font-medium text-sm uppercase tracking-wider">Countries Covered</div>
              </div>
              <div>
                  <div className="text-4xl font-extrabold mb-1">$2M+</div>
                  <div className="text-sky-200 font-medium text-sm uppercase tracking-wider">Budgets Tracked</div>
              </div>
              <div>
                  <div className="text-4xl font-extrabold mb-1">4.9/5</div>
                  <div className="text-sky-200 font-medium text-sm uppercase tracking-wider">User Rating</div>
              </div>
          </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need, in one place.</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We've built the ultimate toolset to take the stress out of travel planning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                  <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                      🗺️
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Drag & Drop Itineraries</h3>
                  <p className="text-slate-600 leading-relaxed">
                      Visualize your days easily. Add activities, notes, and locations to a seamless timeline.
                  </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                      💰
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Budget Tracking</h3>
                  <p className="text-slate-600 leading-relaxed">
                      Set limits, track estimated costs by category (Flights, Stays, Activities), and never overspend again.
                  </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                      🤝
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Vibrant Community</h3>
                  <p className="text-slate-600 leading-relaxed">
                      Connect with fellow travelers. Share your past trips, ask for advice, and discover hidden local gems.
                  </p>
              </div>
          </div>
      </div>

      {/* Preview Mockup */}
      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Beautiful across all devices.</h2>
        </div>
        <div className="bg-gradient-to-tr from-sky-100 to-indigo-50 p-2 sm:p-4 rounded-[2rem] shadow-2xl border border-white/60">
          <div className="bg-slate-100 rounded-[1.5rem] overflow-hidden border border-slate-200/50 relative shadow-inner">
            {/* Fake Browser Chrome */}
            <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-slate-100 text-slate-400 text-xs px-32 py-1.5 rounded-md font-mono hidden md:block">
                    globetrotter.app/dashboard
                </div>
            </div>
            {/* The Image */}
            <img 
              src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=2000&auto=format&fit=crop" 
              alt="Globe Trotter Platform preview" 
              className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Floating UI Elements over image for "mockup" effect */}
            <div className="absolute top-10 left-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50 hidden md:block animate-fade-in-up">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Budget</p>
                <p className="text-2xl font-extrabold text-sky-600">₹1,20,000</p>
            </div>
            
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50 hidden md:block animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">🗼</div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">Eiffel Tower</p>
                        <p className="text-xs font-medium text-slate-500">10:00 AM • ₹4,500</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm text-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
              <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🌍</span>
                      <span className="text-xl font-bold text-white">GlobeTrotter</span>
                  </div>
                  <p className="max-w-sm">Making travel planning seamless, intuitive, and fun for explorers around the world.</p>
              </div>
              <div>
                  <h4 className="text-white font-bold mb-4">Product</h4>
                  <ul className="space-y-2">
                      <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="text-white font-bold mb-4">Company</h4>
                  <ul className="space-y-2">
                      <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  </ul>
              </div>
          </div>
          <div className="pt-8 border-t border-slate-800">
              <p>&copy; {new Date().getFullYear()} GlobeTrotter Inc. Built for LDCE Hackathon.</p>
          </div>
      </footer>

      {/* Basic Keyframe Animations for standard tailwind if absent */}
      <style>{`
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}