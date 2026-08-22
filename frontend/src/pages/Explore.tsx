import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDestinations } from '../api';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allDestinations, setAllDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDestinations();
        setAllDestinations(res.data.destinations);
      } catch (err) {
        console.error("Failed to load destinations", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Magic filter that updates instantly as you type
  const filteredDestinations = allDestinations.filter(dest => 
    dest.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
        </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-6xl mx-auto mt-4 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Discover Your Next Adventure</h2>
          <div className="max-w-2xl mx-auto flex shadow-sm rounded-xl overflow-hidden bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-sky-500 transition-shadow">
            <input 
              type="text" 
              placeholder="Search for a city or country..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-4 outline-none text-slate-700 text-lg"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 transition-colors">
              Search
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          {searchQuery ? `Search Results (${filteredDestinations.length})` : 'Trending Destinations'}
        </h3>
        
        {filteredDestinations.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h4 className="text-xl text-slate-500 mb-6">Can't find "{searchQuery}"? No problem!</h4>
            <Link to={`/create-trip?city=${encodeURIComponent(searchQuery)}`}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform active:scale-95 text-lg">
                Start Planning a trip to {searchQuery}
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-slate-100 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {dest.price}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-lg text-slate-900 mb-4">{dest.city}</h4>
                  <Link to="/create-trip">
                    <button className="w-full bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm">
                      Start Planning
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}