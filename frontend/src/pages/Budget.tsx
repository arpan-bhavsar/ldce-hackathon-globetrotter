import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTripDetails } from '../api';

export default function Budget() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const res = await fetchTripDetails(id);
        setTrip(res.data.trip);
      } catch (error) {
        console.error("Error loading trip");
      }
    };
    loadTrip();
  }, [id]);

  if (!trip) return <div className="min-h-screen flex justify-center items-center font-bold text-sky-600">Calculating expenses...</div>;

  // Magic step: Pull all activities from every single day into one master list
  const allActivities = trip.itinerary?.flatMap((day: any) => day.activities) || [];
  
  // Calculate total money spent across all activities
  const totalSpent = allActivities.reduce((sum: number, act: any) => sum + (act.cost || 0), 0);
  
  // For the hackathon, we assume a $1000 budget limit
  const budgetLimit = 1000;
  const progress = Math.min((totalSpent / budgetLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
        <div className="space-x-4 font-medium">
          <Link to={`/itinerary/${id}`} className="hover:underline">Itinerary</Link>
          <Link to={`/budget/${id}`} className="underline">Budget</Link>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl w-full mx-auto p-6 mt-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Trip Budget</h2>
        <h3 className="text-xl text-slate-500 mb-8">{trip.title}</h3>

        {/* Progress Bar Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="flex justify-between text-lg font-bold text-slate-700 mb-2">
            <span>Total Spent: ${totalSpent}</span>
            <span>Limit: ${budgetLimit}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${progress > 80 ? 'bg-orange-500' : 'bg-sky-500'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 text-right">
            {budgetLimit - totalSpent > 0 ? `$${budgetLimit - totalSpent} remaining` : `Over budget by $${Math.abs(budgetLimit - totalSpent)}!`}
          </p>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 p-4 border-b border-slate-200 font-bold text-slate-700 flex justify-between">
            <span>Expense Item</span>
            <span>Cost</span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {allActivities.length === 0 && (
              <div className="p-6 text-center text-slate-500">No activities with costs added yet.</div>
            )}
            
            {allActivities.map((act: any, i: number) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">{act.name}</h4>
                  <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full mt-1 inline-block">
                    {act.time}
                  </span>
                </div>
                <div className="font-bold text-orange-500 text-lg">
                  ${act.cost > 0 ? act.cost : 'Free'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}