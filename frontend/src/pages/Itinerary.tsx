import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTripDetails, addActivityToTrip } from '../api';
import toast from 'react-hot-toast';

export default function Itinerary() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  const [activity, setActivity] = useState({ 
    date: '', time: '', name: '', cost: '', notes: '' 
  });

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      const res = await fetchTripDetails(id!);
      setTrip(res.data.trip);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.date || !activity.name) {
      toast.error("Date and Name are required!");
      return;
    }
    
    try {
      await addActivityToTrip(id!, { ...activity, cost: Number(activity.cost) || 0 });
      setActivity({ date: '', time: '', name: '', cost: '', notes: '' });
      toast.success("Activity added successfully!");
      loadTrip(); 
    } catch (err) {
      toast.error("Failed to add activity.");
    }
  };

  const handleShare = () => {
      // In a real app, this would generate a shareable link or open a modal
      navigator.clipboard.writeText(`https://globetrotter.app/shared/${id}`);
      toast.success("Shareable link copied to clipboard!");
  };

  if (!trip) return (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                {trip.title}
                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-md font-bold uppercase tracking-wider ml-2">{trip.status || 'Planning'}</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">📍 {trip.destination}</p>
        </div>
        <div className="flex items-center gap-3">
            <Link to={`/calendar/${id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                📅 Calendar
            </Link>
            <Link to={`/budget/${id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                💰 Budget
            </Link>
            <button onClick={handleShare} className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar: Add Activity Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit sticky top-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>➕</span> Add to Itinerary
          </h3>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Date</label>
              <input type="date" required value={activity.date} onChange={e => setActivity({...activity, date: e.target.value})} className="mt-1 w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Time</label>
              <div className="flex gap-2 mt-1">
                <select 
                  required 
                  value={activity.time.split(':')[0] || '12'} 
                  onChange={e => setActivity({...activity, time: `${e.target.value}:${activity.time.split(':')[1] || '00'}`})} 
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow bg-white"
                >
                  {Array.from({length: 24}).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="flex items-center text-slate-500 font-bold">:</span>
                <select 
                  required 
                  value={activity.time.split(':')[1] || '00'} 
                  onChange={e => setActivity({...activity, time: `${activity.time.split(':')[0] || '12'}:${e.target.value}`})} 
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow bg-white"
                >
                  {['00', '15', '30', '45'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Activity Name</label>
              <input type="text" required value={activity.name} onChange={e => setActivity({...activity, name: e.target.value})} placeholder="e.g. Louvre Museum" className="mt-1 w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Estimated Cost (₹)</label>
              <input type="number" value={activity.cost} onChange={e => setActivity({...activity, cost: e.target.value})} placeholder="0" className="mt-1 w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Quick Notes</label>
              <input type="text" value={activity.notes} onChange={e => setActivity({...activity, notes: e.target.value})} placeholder="Meet at entrance" className="mt-1 w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" />
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-transform active:scale-95 mt-2">
              Save Activity
            </button>
          </form>
        </div>

        {/* Right Section: Timeline View */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live Interactive Map */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <iframe 
              width="100%" 
              height="350" 
              style={{ border: 0, borderRadius: '1rem' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(trip.destination)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Interactive Map
            </div>
          </div>

          {trip.itinerary?.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-slate-200 border-dashed">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Blank Canvas</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No activities planned yet. Use the form on the left to start building out your days!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trip.itinerary?.map((day: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                      Day {i + 1} <span className="text-slate-400 font-normal mx-2">•</span> <span className="text-sky-600">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </h2>
                    <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      ₹{day.activities.reduce((sum: number, act: any) => sum + act.cost, 0)} total
                    </span>
                  </div>
                  
                  <div className="space-y-3 relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200 z-0 hidden sm:block"></div>
                    
                    {day.activities.map((act: any, idx: number) => (
                      <div key={idx} className="relative z-10 flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 hover:shadow-md transition-all group cursor-default">
                        {/* Timeline dot */}
                        <div className="hidden sm:flex mt-1 w-8 h-8 rounded-full bg-white border-4 border-sky-100 text-sky-600 items-center justify-center shrink-0 shadow-sm group-hover:border-sky-200 group-hover:scale-110 transition-transform">
                            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                        </div>
                        
                        <div className="w-20 sm:w-24 text-slate-500 font-bold flex-shrink-0 pt-1 flex items-center sm:items-start">
                            {act.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-900">{act.name}</h4>
                          {act.notes && <p className="text-sm text-slate-500 mt-1">{act.notes}</p>}
                        </div>
                        <div className="font-bold text-slate-700 bg-slate-100 h-fit px-3 py-1 rounded-lg">
                          ₹{act.cost > 0 ? act.cost : 'Free'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}