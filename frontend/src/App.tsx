import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Budget from './pages/Budget';
import Community from './pages/Community';
import Explore from './pages/Explore';
import Landing from './pages/Landing';  

// 🛡️ THE SECURITY GUARD: Checks if the user actually has a login token
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If they aren't logged in, kick them back to the login page!
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Anyone can see these) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (Must be logged in to see these) */}
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        
        <Route path="/explore" element={
          <ProtectedRoute><Explore /></ProtectedRoute>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;