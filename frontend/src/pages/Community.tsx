import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ authorName: 'Anonymous Traveler', location: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get('/posts');
      // Reverse to show newest first, assuming backend returns chronological
      setPosts(res.data.posts || res.data.reverse()); // Handling wrapped vs unwrapped response
    } catch (err) {
      console.error("Failed to load posts");
    }
  };

  const handlePost = async () => {
    if (!newPost.content) {
      toast.error("Write something first!");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/posts', newPost);
      toast.success("Posted successfully!");
      setNewPost({ ...newPost, content: '', location: '' }); // Clear inputs
      await loadPosts(); // Refresh feed
    } catch (err) {
      toast.error("Failed to post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl w-full mx-auto mt-4 mb-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Traveler Community</h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">Share your itineraries, ask for advice, and discover hidden gems from fellow Globe Trotters.</p>
      </div>

      {/* Create Post Box */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 focus-within:ring-2 focus-within:ring-sky-500 transition-shadow">
        <div className="flex gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                AT
            </div>
            <textarea 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full bg-transparent p-2 outline-none text-slate-700 resize-none text-lg placeholder:text-slate-400" 
                rows={3} 
                placeholder="Share a travel tip, itinerary, or ask a question..."
            ></textarea>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 gap-4">
          <div className="flex items-center w-full sm:w-auto bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
            <span className="text-slate-400 mr-2">📍</span>
            <input 
              type="text" 
              placeholder="Add location (e.g. Paris)" 
              value={newPost.location}
              onChange={(e) => setNewPost({...newPost, location: e.target.value})}
              className="bg-transparent text-sm outline-none w-full sm:w-48 text-slate-700" 
            />
          </div>
          <button 
            onClick={handlePost} 
            disabled={isSubmitting || !newPost.content}
            className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-2.5 px-8 rounded-xl transition-colors shadow-sm"
          >
            {isSubmitting ? 'Posting...' : 'Share'}
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
           <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100">
               <div className="text-4xl mb-4">🌍</div>
               <h4 className="text-xl text-slate-500">Be the first to share your travel story!</h4>
           </div>
        ) : (
            posts.map((post: any, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                        {post.authorName?.substring(0,2).toUpperCase() || 'AN'}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">{post.authorName || 'Anonymous Traveler'}</h4>
                        <p className="text-xs text-slate-500">Shared recently</p>
                    </div>
                </div>
                {post.location && (
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full inline-block group-hover:bg-sky-100 transition-colors">
                        📍 {post.location}
                    </span>
                )}
                </div>
                <p className="text-slate-700 leading-relaxed text-lg">{post.content}</p>
                <div className="mt-6 pt-4 border-t border-slate-50 flex gap-6 text-slate-500 text-sm font-medium">
                    <button className="hover:text-orange-500 transition-colors flex items-center gap-2">
                        ❤️ Like
                    </button>
                    <button className="hover:text-sky-600 transition-colors flex items-center gap-2">
                        💬 Comment
                    </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}