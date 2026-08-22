"use client";
import React from 'react';
import Link from 'next/link';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Create your Account</h1>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">First Name</label>
                        <input type="text" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Last Name</label>
                        <input type="text" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">City</label>
                        <input type="text" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Country</label>
                        <input type="text" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-sky-500 outline-none" />
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-lg transition-colors">
                            Register Account
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account? <Link href="/login" className="text-sky-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}