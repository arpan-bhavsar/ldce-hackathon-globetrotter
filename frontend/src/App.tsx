import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Explore from './pages/Explore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/explorer" element={<Explorer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;