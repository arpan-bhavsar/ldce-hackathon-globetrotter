import React, { useEffect, useState } from 'react';
import { fetchMe, updateProfile } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        country: '',
        additionalInfo: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetchMe();
                const user = res.data.user;
                setFormData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    phone: user.phone || '',
                    city: user.city || '',
                    country: user.country || '',
                    additionalInfo: user.additionalInfo || ''
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setMessage({ text: 'Failed to load profile.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });
        try {
            await updateProfile(formData);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to update profile.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">User Profile</h1>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6">Personal Information</h2>
                        
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                    <input 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                    <input 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                    <input 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={handleChange} 
                                        className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                                    <input 
                                        name="country" 
                                        value={formData.country} 
                                        onChange={handleChange} 
                                        className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input 
                                    name="phone" 
                                    type="tel"
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    className="w-full sm:w-1/2 rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Travel Preferences / Additional Info</label>
                                <textarea 
                                    name="additionalInfo" 
                                    rows={4}
                                    value={formData.additionalInfo} 
                                    onChange={handleChange} 
                                    placeholder="Tell us about your travel style (e.g., foodie, adventure seeker, budget traveler)..."
                                    className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow" 
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
