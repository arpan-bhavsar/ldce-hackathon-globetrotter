import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTripDetails } from '../api';

export default function Budget() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetchTripDetails(id!);
        setTrip(res.data.trip);
      } catch (err) {
        console.error("Error loading trip");
      }
    };
    fetchTrip();
  }, [id]);

  if (!trip) return (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );

  // Magic step: Pull all activities from every single day into one master list
  const allActivities = trip.itinerary?.flatMap((day: any) => day.activities) || [];
  
  // Calculate total money spent across all activities
  const totalSpent = allActivities.reduce((sum: number, act: any) => sum + (act.cost || 0), 0);
  
  // For the hackathon, we assume a ₹1000 budget limit (or could be dynamic later)
  const budgetLimit = 1000;
  const progress = Math.min((totalSpent / budgetLimit) * 100, 100);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto mt-4 mb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                Budget Tracker
            </h1>
            <p className="text-slate-500 mt-1 font-medium">For {trip.title}</p>
        </div>
        <div className="flex items-center gap-3">
            <Link to={`/itinerary/${id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                Back to Itinerary
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Summary Cards */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-slate-500 font-bold mb-1">Total Budget</span>
              <span className="text-3xl font-black text-slate-800">₹{budgetLimit}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-slate-500 font-bold mb-1">Total Spent</span>
              <span className="text-3xl font-black text-orange-500">₹{totalSpent}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-slate-500 font-bold mb-1">Remaining</span>
              <span className={`text-3xl font-black ${budgetLimit - totalSpent < 0 ? 'text-red-500' : 'text-sky-600'}`}>
                  ₹{budgetLimit - totalSpent}
              </span>
          </div>
      </div>

      {/* Progress Bar Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
          <span>Budget Usage</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-6 mb-4 overflow-hidden border border-slate-200">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500' : progress > 75 ? 'bg-orange-500' : 'bg-sky-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-slate-500 font-medium">
          {budgetLimit - totalSpent > 0 ? `You are on track with your budget.` : `Warning: You have exceeded your budget!`}
        </p>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 p-5 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider text-sm flex justify-between">
          <span>Expense Item</span>
          <span>Cost</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {allActivities.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                <div className="text-4xl mb-4">💳</div>
                No activities with costs added yet.
            </div>
          )}
          
          {allActivities.map((act: any, i: number) => (
            <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors group">
              <div>
                <h4 className="font-bold text-lg text-slate-800 group-hover:text-sky-600 transition-colors">{act.name}</h4>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md mt-2 inline-block">
                  {act.time}
                </span>
              </div>
              <div className="font-black text-slate-700 text-xl">
                ₹{act.cost > 0 ? act.cost : 'Free'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}