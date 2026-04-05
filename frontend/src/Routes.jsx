import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import EventRegistration from './pages/EventRegistration';
import ClubDetails from './pages/ClubDetails';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/EventRegistration" element={<EventRegistration />}/>
        <Route path="/ClubDetails" element={<ClubDetails />}/>
        
      </Route>
    </Routes>
  </BrowserRouter>
);
