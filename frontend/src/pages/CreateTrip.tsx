import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../api';

export default function CreateTrip() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        country: '',
        startDate: '',
        endDate: '',
        budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await createTrip(formData);
            // Navigate to the newly created itinerary
            navigate(`/itinerary/${res.data.trip._id}`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create trip.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create New Trip</h1>
            <p className="text-slate-500 mb-8">Where are you heading next? Let's get the details down.</p>
            
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Trip Name</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Summer in Europe"
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Destination</label>
                        <input 
                            type="text" 
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Paris"
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                        <input 
                            type="text" 
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            placeholder="e.g. France"
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                        <input 
                            type="date" 
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow text-slate-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                        <input 
                            type="date" 
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow text-slate-700"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Budget (₹)</label>
                    <input 
                        type="number" 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="e.g. 50000"
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform active:scale-95 disabled:opacity-70"
                    >
                        {loading ? 'Creating...' : 'Start Planning'}
                    </button>
                </div>
            </form>
        </div>
    );
}
