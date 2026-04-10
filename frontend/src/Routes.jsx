import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import EventRegistration from './pages/EventRegistration';
import ClubDetails from './pages/ClubDetails';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Certificates from './pages/Certificate';
import AdminDashboard from './pages/Admin';
import AdminEvents from './pages/Adminevents';
import AdminCertificates from './pages/Admincerts';

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
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/Certificates" element={<Certificates />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/certificates" element={<AdminCertificates />} />

      </Route>
    </Routes>
  </BrowserRouter>
);
