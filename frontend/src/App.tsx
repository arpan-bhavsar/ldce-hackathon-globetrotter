import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Budget from './pages/Budget';
import Community from './pages/Community';
import Explore from './pages/Explore';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/itinerary/:id" element={<Itinerary />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/community" element={<Community />} />
        <Route path="/explore" element={<Explore />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;