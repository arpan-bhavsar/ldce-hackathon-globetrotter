import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');

  // Added a few more destinations so the search looks impressive!
  const allDestinations = [
    { city: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop', price: '$$$' },
    { city: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&auto=format&fit=crop', price: '$$$' },
    { city: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop', price: '$' },
    { city: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop', price: '$$' },
    { city: 'Banff, Canada', image: 'https://images.unsplash.com/photo-1533282960533-51328aa26826?w=500&auto=format&fit=crop', price: '$$' },
    { city: 'Machu Picchu, Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&auto=format&fit=crop', price: '$$' },
    { city: 'Marrakech, Morocco', image: 'https://images.unsplash.com/photo-1597212720912-3269bdf01e69?w=500&auto=format&fit=crop', price: '$' },
    { city: 'Sydney, Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop', price: '$$$' },
  ];

  // Magic filter that updates instantly as you type
  const filteredDestinations = allDestinations.filter(dest => 
    dest.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
        <div className="space-x-6 font-medium">
          <Link to="/home" className="hover:underline">Dashboard</Link>
          <Link to="/explore" className="underline">Explore</Link>
          <Link to="/community" className="hover:underline">Community</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Discover Your Next Adventure</h2>
          <div className="max-w-2xl mx-auto flex shadow-md rounded-full overflow-hidden bg-white">
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
          <div className="text-center p-12 bg-white rounded-xl shadow-sm">
            <h4 className="text-xl text-slate-500">No destinations found matching "{searchQuery}"</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer border border-slate-200">
                <div className="h-48 overflow-hidden relative">
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                    {dest.price}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-slate-800">{dest.city}</h4>
                  <Link to="/home">
                    <button className="mt-4 w-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white font-bold py-2 rounded-lg transition-colors">
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