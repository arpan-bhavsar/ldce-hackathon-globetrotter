import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTripDetails } from '../api';

export default function CalendarView() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const res = await fetchTripDetails(id!);
        setTrip(res.data.trip);
      } catch (err) {
        console.error("Failed to load trip details");
      }
    };
    loadTrip();
  }, [id]);

  if (!trip) return (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-6xl mx-auto mt-4 mb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                Calendar View
            </h1>
            <p className="text-slate-500 mt-1 font-medium">For {trip.title}</p>
        </div>
        <div className="flex items-center gap-3">
            <Link to={`/itinerary/${id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                Back to Timeline
            </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Calendar Grid Header (Days of week) */}
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-bold text-slate-500 uppercase tracking-wider text-sm border-r border-slate-100 last:border-r-0">
                    {day}
                </div>
            ))}
        </div>

        {/* Calendar Grid Body */}
        <div className="grid grid-cols-7 auto-rows-fr">
            {trip.itinerary?.length === 0 ? (
                <div className="col-span-7 p-16 text-center text-slate-500">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No Dates Scheduled</h3>
                    <p>Add some activities in the Timeline view to see them here.</p>
                </div>
            ) : (
                // We'll just display a simple sequential grid for the hackathon
                // rather than a full complex month layout, treating each day sequentially
                // padded with empty cells if it doesn't start on Sunday.
                (() => {
                    const firstDate = new Date(trip.itinerary[0].date);
                    const startDayOfWeek = firstDate.getDay(); // 0-6 (Sun-Sat)
                    
                    const cells = [];
                    // Add empty padding for days before start
                    for (let i = 0; i < startDayOfWeek; i++) {
                        cells.push(<div key={`empty-${i}`} className="min-h-[120px] p-2 bg-slate-50/50 border-r border-b border-slate-100"></div>);
                    }

                    // Add actual days
                    trip.itinerary.forEach((day: any, i: number) => {
                        const dateObj = new Date(day.date);
                        cells.push(
                            <div key={`day-${i}`} className="min-h-[120px] p-3 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                <div className="text-sm font-bold text-slate-400 mb-2 group-hover:text-sky-600 transition-colors">
                                    {dateObj.getDate()} {dateObj.toLocaleString('default', { month: 'short' })}
                                </div>
                                <div className="space-y-1">
                                    {day.activities.map((act: any, idx: number) => (
                                        <div key={idx} className="bg-sky-50 text-sky-700 text-xs font-bold px-2 py-1.5 rounded truncate border border-sky-100">
                                            {act.time} - {act.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    });

                    // Pad the end to complete the grid (make it divisible by 7)
                    const totalCells = cells.length;
                    const remainder = totalCells % 7;
                    if (remainder !== 0) {
                        for (let i = 0; i < (7 - remainder); i++) {
                            cells.push(<div key={`end-empty-${i}`} className="min-h-[120px] p-2 bg-slate-50/50 border-r border-b border-slate-100"></div>);
                        }
                    }

                    return cells;
                })()
            )}
        </div>
      </div>
    </div>
  );
}
