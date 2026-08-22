import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrips, deleteTrip } from '../api';

export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrips = async () => {
            try {
                const res = await fetchTrips();
                setTrips(res.data.trips);
            } catch (error) {
                console.error("Error loading trips", error);
            } finally {
                setLoading(false);
            }
        };
        loadTrips();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
                <Link to="/create-trip" className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Trip
                </Link>
            </div>

            {trips.length === 0 ? (
                <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center max-w-2xl mx-auto mt-10">
                    <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">🧳</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No trips planned yet</h2>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">Your next great adventure is waiting. Start building your perfect itinerary today.</p>
                    <Link to="/create-trip">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                            Start Planning
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip: any, i: number) => {
                        const tripDate = new Date(trip.startDate);
                        const isPast = tripDate < new Date();
                        
                        return (
                            <div key={trip._id || i} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                                <div className="h-32 bg-slate-100 relative">
                                    {/* Abstract placeholder gradient based on id */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 opacity-90`}></div>
                                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${isPast ? 'bg-slate-800 text-slate-100' : 'bg-white text-sky-700'}`}>
                                                {isPast ? 'Completed' : 'Upcoming'}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-xl truncate drop-shadow-md">{trip.title}</h3>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-slate-600 text-sm font-medium">
                                            <span className="mr-2">📍</span> {trip.destination}
                                        </div>
                                        <div className="flex items-center text-slate-600 text-sm font-medium">
                                            <span className="mr-2">📅</span> {tripDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link to={`/itinerary/${trip._id}`} className="flex-1">
                                            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-lg transition-colors text-sm">
                                                View Itinerary
                                            </button>
                                        </Link>
                                        <button onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this trip?")) {
                                                try {
                                                    await deleteTrip(trip._id);
                                                    setTrips(trips.filter((t: any) => t._id !== trip._id));
                                                } catch (err: any) {
                                                    console.error("Failed to delete trip", err);
                                                    alert("Failed to delete trip. Did you restart the backend server?");
                                                }
                                            }
                                        }} className="px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors" title="Delete Trip">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
