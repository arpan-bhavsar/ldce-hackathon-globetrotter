import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, createPost } from '../api';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ authorName: 'Anonymous Traveler', location: '', content: '' });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const res = await fetchPosts();
            setPosts(res.data.posts);
        } catch (err) {
            console.error("Failed to load posts");
        }
    };

    const handlePost = async () => {
        if (!newPost.content) return alert("Write something first!");
        try {
            await createPost(newPost);
            setNewPost({ ...newPost, content: '', location: '' }); // Clear inputs
            loadPosts(); // Refresh feed
        } catch (err) {
            alert("Failed to post.");
        }
    };

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
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="w-full bg-slate-50 rounded-lg p-3 outline-none border border-slate-200 focus:border-sky-500 resize-none"
                        rows={3}
                        placeholder="Share a travel tip or itinerary..."
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                        <input
                            type="text"
                            placeholder="Location tag (e.g. Paris)"
                            value={newPost.location}
                            onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                            className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-sm outline-none w-48 focus:border-sky-500"
                        />
                        <button onClick={handlePost} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Post
                        </button>
                    </div>
                </div>

                {/* Feed */}
                <div className="space-y-6">
                    {posts.map((post: any, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-slate-800">{post.authorName}</h4>
                                    {post.location && <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-full mt-1 inline-block">{post.location}</span>}
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}