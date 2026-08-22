import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Itinerary() {
    // Dummy data for visual design
    const [activities] = useState([
        { time: '09:00 AM', name: 'Eiffel Tower Tour', cost: '$30', notes: 'Meet at the North Pillar' },
        { time: '01:00 PM', name: 'Lunch at Cafe de Flore', cost: '$45', notes: 'Reservation under John' },
    ]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
                <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
                <div className="font-medium text-lg">Trip to Paris, France</div>
            </nav>

            <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Sidebar: Add Activity Form */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Add to Itinerary</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Date</label>
                            <input type="date" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Time</label>
                            <input type="time" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Activity Name</label>
                            <input type="text" placeholder="e.g. Visit Museum" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Estimated Cost ($)</label>
                            <input type="number" placeholder="0" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
                        </div>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm transition-colors">
                            Save Activity
                        </button>
                    </form>
                </div>

                {/* Right Section: Timeline View */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-end border-b pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-sky-700">Day 1: Oct 12, 2026</h2>
                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Total: $75</span>
                        </div>

                        <div className="space-y-4">
                            {activities.map((activity, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow">
                                    <div className="w-24 text-sky-600 font-bold flex-shrink-0">{activity.time}</div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-800">{activity.name}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{activity.notes}</p>
                                    </div>
                                    <div className="font-bold text-orange-500">{activity.cost}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}