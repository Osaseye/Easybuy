import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LandingPage } from './pages/landing/LandingPage';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { BuyerOnboarding } from './pages/buyer/BuyerOnboarding';
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { Explore } from './pages/buyer/Explore';
import { PropertyDetails } from './pages/buyer/PropertyDetails';
import { LandlordProfile } from './pages/buyer/LandlordProfile';
import { SavedProperties } from './pages/buyer/SavedProperties';
import { Settings } from './pages/buyer/Settings';

// Landlord Pages
import { LandlordOnboarding } from './pages/landlord/LandlordOnboarding';
import { LandlordDashboard } from './pages/landlord/LandlordDashboard';
import { UploadProperty } from './pages/landlord/UploadProperty';
import { MyListings } from './pages/landlord/MyListings';
import { LandlordSettings } from './pages/landlord/LandlordSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Buyer Routes */}
          <Route path="/onboarding/buyer" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerOnboarding />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path="/property/:id" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <PropertyDetails />
            </ProtectedRoute>
          } />
          <Route path="/landlord/:id" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <LandlordProfile />
            </ProtectedRoute>
          } />
          <Route path="/saved" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <SavedProperties />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Landlord Routes */}
          <Route path="/onboarding/landlord" element={
            <ProtectedRoute allowedRoles={['landlord']}>
              <LandlordOnboarding />
            </ProtectedRoute>
          } />
          <Route path="/landlord/dashboard" element={
            <ProtectedRoute allowedRoles={['landlord']}>
              <LandlordDashboard />
            </ProtectedRoute>
          } />
          <Route path="/landlord/upload" element={
            <ProtectedRoute allowedRoles={['landlord']}>
              <UploadProperty />
            </ProtectedRoute>
          } />
          <Route path="/landlord/listings" element={
            <ProtectedRoute allowedRoles={['landlord']}>
              <MyListings />
            </ProtectedRoute>
          } />
          <Route path="/landlord/settings" element={
            <ProtectedRoute allowedRoles={['landlord']}>
              <LandlordSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
