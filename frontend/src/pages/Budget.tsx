import React from 'react';
import { Link } from 'react-router-dom';

export default function Budget() {
    // Dummy data representing our activities from the itinerary
    const expenses = [
        { name: 'Eiffel Tower Tour', category: 'Attractions', cost: 30 },
        { name: 'Lunch at Cafe de Flore', category: 'Food', cost: 45 },
        { name: 'Louvre Museum', category: 'Attractions', cost: 20 },
        { name: 'Uber to Hotel', category: 'Transport', cost: 15 },
    ];

    const totalSpent = expenses.reduce((sum, item) => sum + item.cost, 0);
    const budgetLimit = 500;
    const progress = (totalSpent / budgetLimit) * 100;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-sky-600 text-white p-4 shadow-md flex justify-between items-center">
                <Link to="/home" className="text-2xl font-bold hover:opacity-80">Globe Trotter</Link>
                <div className="space-x-4 font-medium">
                    <Link to="/itinerary" className="hover:underline">Itinerary</Link>
                    <Link to="/budget" className="underline">Budget</Link>
                </div>
            </nav>

            <div className="flex-1 max-w-4xl w-full mx-auto p-6 mt-4">
                <h2 className="text-3xl font-bold text-slate-800 mb-8">Trip Budget</h2>

                {/* Progress Bar Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                    <div className="flex justify-between text-lg font-bold text-slate-700 mb-2">
                        <span>Total Spent: ${totalSpent}</span>
                        <span>Limit: ${budgetLimit}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
                        <div
                            className={`h-4 rounded-full ${progress > 80 ? 'bg-orange-500' : 'bg-sky-500'}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-slate-500 text-right">${budgetLimit - totalSpent} remaining</p>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 p-4 border-b border-slate-200 font-bold text-slate-700 flex justify-between">
                        <span>Expense Item</span>
                        <span>Cost</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {expenses.map((expense, i) => (
                            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                <div>
                                    <h4 className="font-bold text-slate-800">{expense.name}</h4>
                                    <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full mt-1 inline-block">
                                        {expense.category}
                                    </span>
                                </div>
                                <div className="font-bold text-orange-500 text-lg">${expense.cost}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}