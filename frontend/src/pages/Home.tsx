import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrips, fetchMe } from '../api';

export default function Home() {
    const [trips, setTrips] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [tripsRes, userRes] = await Promise.all([
                    fetchTrips(),
                    fetchMe()
                ]);
                setTrips(tripsRes.data.trips);
                setUser(userRes.data.user);
            } catch (error) {
                console.error("Error loading dashboard data", error);
            }
        };
        loadDashboardData();
    }, []);

    const upcomingTrips = trips.filter((t: any) => new Date(t.startDate) > new Date()).slice(0, 3);
    
    // Mock Data for Recommended Destinations
    const recommendations = [
        { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', tags: ['Culture', 'Food'] },
        { name: 'Amalfi Coast, Italy', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=600&auto=format&fit=crop', tags: ['Beach', 'Views'] },
        { name: 'Banff, Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop', tags: ['Nature', 'Hiking'] },
    ];

    const totalActivities = trips.reduce((sum, t) => {
        let tripSum = 0;
        if (t.itinerary) {
            t.itinerary.forEach((day: any) => {
                if (day.activities) {
                    day.activities.forEach((act: any) => tripSum += Number(act.cost) || 0);
                }
            });
        }
        return sum + tripSum;
    }, 0);

    const flights = trips.length * 1200;
    const stays = trips.length * 850;
    const totalBudget = totalActivities + flights + stays;
    
    const countriesVisited = new Set(trips.map(t => {
        if (t.country && t.country.trim() !== '' && t.country.trim().toLowerCase() !== 'unknown') {
            return t.country.trim().toLowerCase();
        }
        
        const d = (t.destination || '').toLowerCase();
        if (d.includes('india') || d.includes('vadodara') || d.includes('ahmedabad') || d.includes('mumbai') || d.includes('delhi')) return 'india';
        if (d.includes('canada') || d.includes('banff')) return 'canada';
        if (d.includes('japan') || d.includes('kyoto') || d.includes('tokyo')) return 'japan';
        if (d.includes('greece') || d.includes('santorini')) return 'greece';
        if (d.includes('indonesia') || d.includes('bali')) return 'indonesia';
        if (d.includes('italy') || d.includes('rome') || d.includes('amalfi')) return 'italy';
        if (d.includes('peru') || d.includes('machu picchu')) return 'peru';
        if (d.includes('morocco') || d.includes('marrakech')) return 'morocco';
        if (d.includes('australia') || d.includes('sydney')) return 'australia';
        if (d.includes('usa') || d.includes('new york')) return 'usa';
        if (d.includes('france') || d.includes('paris')) return 'france';
        if (d.includes('uae') || d.includes('dubai')) return 'uae';
        if (d.includes('thailand') || d.includes('phuket')) return 'thailand';
        return t.destination.split(',').pop()?.trim().toLowerCase();
    })).size;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome & Quick Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! ✈️
                    </h1>
                    <p className="text-slate-500 mt-1">Ready for your next adventure?</p>
                </div>
                <Link to="/create-trip" className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Plan New Trip
                </Link>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Upcoming Trips List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Your Recent & Upcoming Trips</h2>
                        <Link to="/trips" className="text-sm font-medium text-sky-600 hover:text-sky-700">View All</Link>
                    </div>
                    
                    {upcomingTrips.length === 0 ? (
                        <div className="bg-white border border-slate-200 border-dashed rounded-xl p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No upcoming trips</h3>
                            <p className="text-slate-500 mt-1">Start planning your next adventure today.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {upcomingTrips.map((trip: any, i: number) => (
                                <Link to={`/itinerary/${trip._id}`} key={i} className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all flex justify-between items-center group">
                                    <div>
                                        <h4 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">{trip.title}</h4>
                                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                            📍 {trip.destination}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full">
                                            {new Date(trip.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Budget Highlights & Stats */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">Insights</h2>
                    <div className="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-xl p-6 text-white shadow-md">
                        <h3 className="text-sky-100 text-sm font-medium uppercase tracking-wider mb-1">Total Estimated Budget</h3>
                        <p className="text-3xl font-bold">₹{totalBudget.toLocaleString()}</p>
                        <div className="mt-4 pt-4 border-t border-sky-400/30 flex justify-between text-sm">
                            <div>
                                <span className="block text-sky-200">Flights</span>
                                <span className="font-medium">₹{flights.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="block text-sky-200">Stays</span>
                                <span className="font-medium">₹{stays.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="block text-sky-200">Activities</span>
                                <span className="font-medium">₹{totalActivities.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4">
                        <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                            🗺️
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Countries Visited</p>
                            <p className="text-2xl font-bold text-slate-900">{countriesVisited}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Destinations */}
            <div className="pt-4">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Trending Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendations.map((rec, i) => (
                        <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow h-64">
                            <img src={rec.image} alt={rec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                                <h3 className="text-white font-bold text-xl">{rec.name}</h3>
                                <div className="flex gap-2 mt-2">
                                    {rec.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}