
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-600">Globe Trotter</h1>
                <div className="space-x-6">
                    <Link to="/home" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">My Trips</Link>
                    <button className="bg-sky-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-700">Logout</button>
                </div>
            </nav>

            {/* Hero Banner */}
            <div className="bg-sky-600 text-white p-12 text-center rounded-b-3xl shadow-md mx-4 mt-2">
                <h2 className="text-4xl font-bold mb-4">Design your perfect adventure</h2>
                <p className="text-xl mb-8 opacity-90">Organize your next multi-city trip with our smart itinerary builder.</p>

                {/* Quick Trip Planner */}
                <div className="bg-white p-4 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder="Where to?" className="flex-1 p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500" />
                    <input type="date" className="p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500" />
                    <input type="date" className="p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500" />
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                        Start Planning
                    </button>
                </div>
            </div>

            {/* Top Regional Selections */}
            <div className="max-w-6xl mx-auto p-8 mt-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">Popular Destinations</h3>
                    <input type="text" placeholder="Search cities..." className="p-2 px-4 border border-slate-300 rounded-full outline-none focus:ring-2 focus:ring-sky-500 w-64 shadow-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {["Paris, France", "Tokyo, Japan", "New York, USA", "Bali, Indonesia"].map((city, i) => (
                        <div key={i} className="bg-white h-48 rounded-xl shadow-sm border border-slate-200 flex items-end p-4 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1">
                            <h4 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{city}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}