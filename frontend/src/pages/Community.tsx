import React from 'react';
import { Link } from 'react-router-dom';

export default function Community() {
    const posts = [
        { author: "Sarah Jenkins", location: "Kyoto, Japan", content: "If you are visiting Kyoto, rent a bike! The philosopher's path is breathtaking this time of year.", likes: 124 },
        { author: "Mike Ross", location: "Rome, Italy", content: "Avoid the main restaurants near the Colosseum. Walk 10 minutes into the side streets for half the price and double the quality.", likes: 89 },
        { author: "Janvi M.", location: "Bali, Indonesia", content: "Just published my 5-day budget itinerary for Bali. You can do the whole thing for under $300!", likes: 256 }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
                <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
                <div className="space-x-6 font-medium">
                    <Link to="/home" className="hover:underline">Dashboard</Link>
                    <Link to="/community" className="underline">Community</Link>
                </div>
            </nav>

            <div className="max-w-2xl w-full mx-auto p-6 mt-4">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Travelers Feed</h2>

                {/* Create Post Box */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
                    <textarea
                        className="w-full bg-slate-50 rounded-lg p-3 outline-none border border-slate-200 focus:border-sky-500 resize-none"
                        rows={3}
                        placeholder="Share a travel tip or itinerary..."
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                        <input type="text" placeholder="Location tag" className="px-3 py-1 bg-slate-100 rounded-full text-sm outline-none w-48" />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Post
                        </button>
                    </div>
                </div>

                {/* Feed */}
                <div className="space-y-6">
                    {posts.map((post, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-slate-800">{post.author}</h4>
                                    <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">{post.location}</span>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{post.content}</p>
                            <div className="mt-4 flex items-center text-slate-500 text-sm font-medium">
                                <button className="hover:text-orange-500 flex items-center gap-1 transition-colors">
                                    <span>❤️</span> {post.likes} Likes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}