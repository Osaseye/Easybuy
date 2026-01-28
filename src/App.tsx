import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Buyer Routes */}
        <Route path="/onboarding/buyer" element={<BuyerOnboarding />} />
        <Route path="/dashboard" element={<BuyerDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/landlord/:id" element={<LandlordProfile />} />
        <Route path="/saved" element={<SavedProperties />} />
        <Route path="/settings" element={<Settings />} />

        {/* Landlord Routes */}
        <Route path="/onboarding/landlord" element={<LandlordOnboarding />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/landlord/upload" element={<UploadProperty />} />
        <Route path="/landlord/listings" element={<MyListings />} />
        <Route path="/landlord/settings" element={<LandlordSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
