
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Globe Trotter</h1>
                <p className="text-slate-600 mb-6 text-center">Welcome back! Please login to your account.</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" placeholder="Email" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-sky-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" placeholder="Password" className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-sky-500 outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-colors">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account? <Link to="/register" className="text-sky-600 font-medium hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}