import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            // Save the login token to the browser!
            localStorage.setItem('token', res.data.token);
            alert("Login successful!");
            navigate('/home'); // Send them to the dashboard
        } catch (error) {
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Globe Trotter</h1>
                <p className="text-slate-600 mb-6 text-center">Welcome back! Please login to your account.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input name="email" onChange={handleChange} required type="email" placeholder="Email" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input name="password" onChange={handleChange} required type="password" placeholder="Password" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
                    </div>
                    <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-colors">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-600">
                    Don't have an account? <Link to="/register" className="text-sky-600 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}