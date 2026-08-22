import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // THIS CALLS YOUR BACKEND!
      const res = await registerUser(formData);
      alert("Success! Welcome to Globe Trotter.");
      navigate('/login'); // Sends them to login page
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Join Globe Trotter</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">First Name</label>
              <input name="firstName" onChange={handleChange} required type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Last Name</label>
              <input name="lastName" onChange={handleChange} required type="text" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input name="email" onChange={handleChange} required type="email" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input name="password" onChange={handleChange} required type="password" className="mt-1 block w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500" />
          </div>
          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-colors">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-sky-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}