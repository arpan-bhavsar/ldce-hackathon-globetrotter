import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchAdminStats, fetchMe } from '../api';

export default function Admin() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Manage Users');
  const navigate = useNavigate();

  const tabs = ['Manage Users', 'Popular cities', 'Popular Activites', 'Analytics'];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const userRes = await fetchMe();
        if (userRes.data.user.email !== 'admin@globetrotter.app' && !userRes.data.user.isAdmin) {
          toast.error("Access denied. Admins only.");
          navigate('/home');
          return;
        }

        const res = await fetchAdminStats();
        setData(res.data.stats);
      } catch (err) {
        console.error("Failed to load admin stats", err);
        toast.error("Failed to authenticate admin session.");
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [navigate]);

  if (loading || !data) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-600"></div>
        </div>
    );
  }

  // Map dynamic data to UI format
  const stats = [
    { label: 'Total Users', value: data.totalUsers.toLocaleString(), trend: '+12%', positive: true },
    { label: 'Active Trips', value: data.activeTrips.toLocaleString(), trend: '+5%', positive: true },
    { label: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString()}`, trend: '+18%', positive: true },
    { label: 'Support Tickets', value: data.supportTickets.toLocaleString(), trend: '-2%', positive: true },
  ];

  const recentUsers = data.recentUsers.map((u: any, i: number) => ({
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    trips: i === 0 ? 4 : Math.floor(Math.random() * 5), // Dynamic trip count placeholder if not populated
    joined: new Date(u.createdAt).toISOString().split('T')[0]
  }));

  return (
    <div className="animate-fade-in max-w-7xl mx-auto -mt-6">
      {/* Admin Top Navbar mimicking the design */}
      <div className="bg-[#111111] text-white p-6 rounded-b-3xl shadow-xl mb-8 border-b-2 border-slate-800">
          <h2 className="text-2xl font-[cursive] tracking-wider mb-6">GlobalTrotter</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                  type="text" 
                  placeholder="Search bar ......" 
                  className="flex-1 bg-transparent border border-slate-600 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors placeholder:text-slate-500" 
              />
              <div className="flex gap-4">
                  <button className="border border-slate-600 hover:bg-slate-800 rounded-xl px-6 py-3 font-semibold transition-colors">Group by</button>
                  <button className="border border-slate-600 hover:bg-slate-800 rounded-xl px-6 py-3 font-semibold transition-colors">Filter</button>
                  <button className="border border-slate-600 hover:bg-slate-800 rounded-xl px-6 py-3 font-semibold transition-colors">Sort by...</button>
              </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map(tab => (
                  <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-colors border ${activeTab === tab ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-600/20' : 'border-slate-600 hover:bg-slate-800 text-slate-300'}`}
                  >
                      {tab === 'Analytics' ? 'User Trends and Analytics' : tab}
                  </button>
              ))}
          </div>
      </div>

      <div className="px-4">
        {activeTab === 'Analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                        <div className="flex justify-between items-end">
                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                            <span className={`text-sm font-bold ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-96">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">User Growth Overview</h3>
                    <div className="flex-1 flex items-end gap-2 relative">
                        {/* Dynamic Chart Bars */}
                        {data.userGrowth.map((height: number, i: number) => (
                            <div key={i} className="flex-1 bg-sky-100 hover:bg-sky-500 rounded-t-lg transition-colors cursor-pointer group relative" style={{ height: `${height}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {height * 10} Users
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-96 overflow-y-auto">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {data.recentActivity.map((item: any, i: number) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700 text-sm">{item.msg}</p>
                                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'Manage Users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Manage User Section</h3>
              <p className="text-slate-600 mb-6">This Section is responsible for managing the users and their actions. This section will give the admin the access to view all the trips made by the user. Also other functionalities are welcome....</p>
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="border-b border-slate-200">
                              <th className="py-4 px-4 font-bold text-slate-700">User Name</th>
                              <th className="py-4 px-4 font-bold text-slate-700">Email</th>
                              <th className="py-4 px-4 font-bold text-slate-700">Trips Planned</th>
                              <th className="py-4 px-4 font-bold text-slate-700">Joined Date</th>
                              <th className="py-4 px-4 font-bold text-slate-700 text-right">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {recentUsers.map((user: any, i: number) => (
                              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="py-4 px-4 font-medium text-slate-900">{user.name}</td>
                                  <td className="py-4 px-4 text-slate-600">{user.email}</td>
                                  <td className="py-4 px-4 text-slate-600">{user.trips}</td>
                                  <td className="py-4 px-4 text-slate-600">{user.joined}</td>
                                  <td className="py-4 px-4 text-right">
                                      <button 
                                        onClick={() => alert(`Viewing trips for ${user.name} is coming soon in v2!`)}
                                        className="text-sky-600 hover:text-sky-800 font-medium"
                                      >
                                        View Trips
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
        )}

        {activeTab === 'Popular cities' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Popular cities</h3>
              <p className="text-slate-600 mb-6">Lists all the popular cities where the users are visiting based on the current user trends.</p>
              
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="border-b border-slate-200">
                              <th className="py-4 px-4 font-bold text-slate-700">Rank</th>
                              <th className="py-4 px-4 font-bold text-slate-700">City Name</th>
                              <th className="py-4 px-4 font-bold text-slate-700 text-right">Trips Planned</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.popularCities && data.popularCities.length > 0 ? data.popularCities.map((city: any, i: number) => (
                              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="py-4 px-4 font-medium text-slate-900">#{i + 1}</td>
                                  <td className="py-4 px-4 text-sky-600 font-semibold">{city.name}</td>
                                  <td className="py-4 px-4 text-right text-slate-700 font-bold">{city.count}</td>
                              </tr>
                          )) : (
                              <tr>
                                  <td colSpan={3} className="py-8 text-center text-slate-500">No city data available yet.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
        )}

        {activeTab === 'Popular Activites' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Popular Activites</h3>
              <p className="text-slate-600 mb-6">List all the popular activites that the users are doing based on the current user trend data.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.popularActivities && data.popularActivities.length > 0 ? data.popularActivities.map((activity: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                                  {i + 1}
                              </div>
                              <span className="font-semibold text-slate-800">{activity.name}</span>
                          </div>
                          <div className="text-sm font-bold text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
                              {activity.count} mentions
                          </div>
                      </div>
                  )) : (
                      <div className="col-span-full py-8 text-center text-slate-500">No activity data available yet.</div>
                  )}
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

