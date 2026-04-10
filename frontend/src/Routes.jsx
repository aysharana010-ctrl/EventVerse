import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
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
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/events" element={<Events />} />

        {/* Auth-required routes */}
        <Route path="/EventRegistration" element={
          <ProtectedRoute><EventRegistration /></ProtectedRoute>
        } />
        <Route path="/ClubDetails" element={
          <ProtectedRoute><ClubDetails /></ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/Certificates" element={
          <ProtectedRoute><Certificates /></ProtectedRoute>
        } />

        {/* Club head only routes */}
        <Route path="/Admin" element={
          <ProtectedRoute requiredRole="club_head"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute requiredRole="club_head"><AdminEvents /></ProtectedRoute>
        } />
        <Route path="/admin/certificates" element={
          <ProtectedRoute requiredRole="club_head"><AdminCertificates /></ProtectedRoute>
        } />
      </Route>
    </Routes>
  </BrowserRouter>
);
