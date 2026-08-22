import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTripDetails, addActivityToTrip } from '../api';

export default function Itinerary() {
  const { id } = useParams(); // Gets the trip ID from the URL
  const [trip, setTrip] = useState<any>(null);
  
  const [activity, setActivity] = useState({ 
    date: '', time: '', name: '', cost: '', notes: '' 
  });

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      const res = await fetchTripDetails(id);
      setTrip(res.data.trip);
    } catch (err) {
      console.error("Failed to load trip details");
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.date || !activity.name) return alert("Date and Name are required!");
    
    try {
      await addActivityToTrip(id, { ...activity, cost: Number(activity.cost) || 0 });
      // Clear the form
      setActivity({ date: '', time: '', name: '', cost: '', notes: '' });
      // Reload the data to show the new activity
      loadTrip(); 
    } catch (err) {
      alert("Failed to add activity. Make sure your date format is correct.");
    }
  };

  if (!trip) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-sky-600">Loading your adventure...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
        <div className="space-x-6 font-medium flex items-center">
          <span className="text-sky-200 mr-4 font-normal tracking-wide">{trip.title}</span>
          <Link to={`/budget/${id}`} className="hover:underline text-white">Budget</Link>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Sidebar: Add Activity Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit sticky top-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Add to Itinerary</h3>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Date</label>
              <input type="date" required value={activity.date} onChange={e => setActivity({...activity, date: e.target.value})} className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Time</label>
              <input type="time" required value={activity.time} onChange={e => setActivity({...activity, time: e.target.value})} className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Activity Name</label>
              <input type="text" required value={activity.name} onChange={e => setActivity({...activity, name: e.target.value})} placeholder="e.g. Visit Museum" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Estimated Cost ($)</label>
              <input type="number" value={activity.cost} onChange={e => setActivity({...activity, cost: e.target.value})} placeholder="0" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Quick Notes</label>
              <input type="text" value={activity.notes} onChange={e => setActivity({...activity, notes: e.target.value})} placeholder="Meet at entrance" className="mt-1 w-full p-2 border border-slate-300 rounded-lg outline-none focus:border-sky-500" />
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-sm transition-colors">
              Save Activity
            </button>
          </form>
        </div>

        {/* Right Section: Timeline View */}
        <div className="md:col-span-2 space-y-6">
          {trip.itinerary?.length === 0 && (
            <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-slate-200 text-slate-500 text-lg">
              No activities planned yet. Use the form on the left to start building your day!
            </div>
          )}

          {/* Loop through each day and its activities */}
          {trip.itinerary?.map((day: any, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-end border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-sky-700">
                  Day {i + 1}: {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </h2>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Total: ${day.activities.reduce((sum: number, act: any) => sum + act.cost, 0)}
                </span>
              </div>
              
              <div className="space-y-4">
                {day.activities.map((act: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow">
                    <div className="w-24 text-sky-600 font-bold flex-shrink-0">{act.time}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-800">{act.name}</h4>
                      {act.notes && <p className="text-sm text-slate-600 mt-1">{act.notes}</p>}
                    </div>
                    <div className="font-bold text-orange-500">
                      ${act.cost > 0 ? act.cost : 'Free'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}