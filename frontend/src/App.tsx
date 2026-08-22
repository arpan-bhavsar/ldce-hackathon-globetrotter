import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Itinerary = lazy(() => import('./pages/Itinerary'));
const Budget = lazy(() => import('./pages/Budget'));
const Community = lazy(() => import('./pages/Community'));
const Explore = lazy(() => import('./pages/Explore'));
const Landing = lazy(() => import('./pages/Landing'));
const Profile = lazy(() => import('./pages/Profile'));
const Trips = lazy(() => import('./pages/Trips'));
const CreateTrip = lazy(() => import('./pages/CreateTrip'));
const CalendarView = lazy(() => import('./pages/CalendarView'));
const Admin = lazy(() => import('./pages/Admin'));

import Layout from './components/Layout';

// 🛡️ THE SECURITY GUARD: Checks if the user actually has a login token
const ProtectedRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If they aren't logged in, kick them back to the login page!
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

// Admin route has no layout so the standard navbar doesn't clash with the admin dashboard
const AdminRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Fallback loader for suspense
const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes (Anyone can see these) */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Must be logged in to see these) */}
          <Route path="/home" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/explore" element={
            <Layout><Explore /></Layout>
          } />

          <Route path="/create-trip" element={
            <ProtectedRoute><CreateTrip /></ProtectedRoute>
          } />

          <Route path="/trips" element={
            <ProtectedRoute><Trips /></ProtectedRoute>
          } />

          <Route path="/community" element={
            <ProtectedRoute><Community /></ProtectedRoute>
          } />

          <Route path="/itinerary/:id" element={
            <ProtectedRoute><Itinerary /></ProtectedRoute>
          } />

          <Route path="/budget/:id" element={
            <ProtectedRoute><Budget /></ProtectedRoute>
          } />

          <Route path="/calendar/:id" element={
            <ProtectedRoute><CalendarView /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <AdminRoute><Admin /></AdminRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;