import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import toast from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        country: '',
        additionalInfo: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await registerUser(formData);
            toast.success("Success! Welcome to Globe Trotter.");
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            toast.error(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Join Globe Trotter</h1>
                
                {error && <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">First Name</label>
                            <input name="firstName" onChange={handleChange} required type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Last Name</label>
                            <input name="lastName" onChange={handleChange} required type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input name="email" onChange={handleChange} required type="email" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">City (Optional)</label>
                            <input name="city" onChange={handleChange} type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Country (Optional)</label>
                            <input name="country" onChange={handleChange} type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Phone (Optional)</label>
                        <input name="phone" onChange={handleChange} type="tel" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Additional Info (Optional)</label>
                        <textarea name="additionalInfo" onChange={handleChange} rows={2} className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Tell us about your travel style..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input name="password" onChange={handleChange} required type="password" minLength={6} className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 mt-4">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account? <Link to="/login" className="text-sky-600 font-medium hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}