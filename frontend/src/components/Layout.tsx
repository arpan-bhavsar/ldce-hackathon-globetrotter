import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link to="/home" className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-sky-600 tracking-tight">GlobeTrotter</span>
                            </Link>
                            <div className="hidden md:ml-10 md:flex md:space-x-8">
                                <Link to="/home" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/home') ? 'border-sky-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>
                                    Dashboard
                                </Link>
                                <Link to="/explore" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/explore') ? 'border-sky-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>
                                    Explore
                                </Link>
                                <Link to="/community" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/community') ? 'border-sky-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>
                                    Community
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="text-slate-500 hover:text-sky-600 transition-colors flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 hover:bg-sky-50">
                                {/* Profile Icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
