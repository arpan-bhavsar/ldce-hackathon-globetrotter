import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTrips, createTrip } from '../api';

export default function Home() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({ destination: '', startDate: '', endDate: '' });

    // Load trips from the database when the page loads!
    useEffect(() => {
        const loadTrips = async () => {
            try {
                const res = await fetchTrips();
                setTrips(res.data.trips);
            } catch (error) {
                console.error("Error loading trips", error);
            }
        };
        loadTrips();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleStartPlanning = async () => {
        if (!newTrip.destination) return alert("Please enter a destination first!");
        try {
            await createTrip({
                title: `Trip to ${newTrip.destination}`,
                destination: newTrip.destination,
                startDate: newTrip.startDate || new Date(),
                endDate: newTrip.endDate || new Date()
            });
            alert("Trip successfully created!");

            // Refresh the trips from the database
            const res = await fetchTrips();
            setTrips(res.data.trips);
        } catch (error) {
            alert("Failed to create trip.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-600">Globe Trotter</h1>
                <div className="space-x-6 flex items-center">
                    <Link to="/explore" className="text-slate-600 hover:text-sky-600 font-medium">Explore</Link>
                    <Link to="/community" className="text-slate-600 hover:text-sky-600 font-medium">Community</Link>
                    <button onClick={handleLogout} className="bg-sky-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-700 transition-colors">Logout</button>
                </div>
            </nav>

            {/* Hero Banner & Trip Creator */}
            <div className="bg-sky-600 text-white p-12 text-center rounded-b-3xl shadow-md mx-4 mt-2">
                <h2 className="text-4xl font-bold mb-4">Design your perfect adventure</h2>
                <p className="text-xl mb-8 opacity-90">Organize your next multi-city trip with our smart itinerary builder.</p>

                <div className="bg-white p-4 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Where to?"
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                        className="flex-1 p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input type="date" onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })} className="p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500" />
                    <input type="date" onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })} className="p-3 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500" />
                    <button onClick={handleStartPlanning} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                        Start Planning
                    </button>
                </div>
            </div>

            {/* Database Trips Section */}
            <div className="max-w-6xl mx-auto p-8 mt-4">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Upcoming Trips</h3>

                {trips.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <h4 className="text-xl text-slate-500">You don't have any trips planned yet.</h4>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {trips.map((trip: any, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-bold text-slate-800">{trip.title}</h4>
                                    <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full">{trip.status}</span>
                                </div>
                                <p className="text-slate-600 mb-4 font-medium">📍 {trip.destination}</p>
                                <Link to={`/itinerary/${trip._id}`}>
                                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg transition-colors">
                                        View Itinerary
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}