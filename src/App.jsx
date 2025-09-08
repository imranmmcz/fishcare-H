import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import MarketPrices from '@/pages/MarketPrices';
import FishCareGuide from '@/pages/FishCareGuide';
import DiseaseDetector from '@/pages/DiseaseDetector';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Contact from '@/pages/Contact';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen fish-pattern">
          <Helmet>
            <title>Fish Care BD - টেকসই মাছ চাষের বিশ্বস্ত সহায়ক</title>
            <meta name="description" content="বাংলাদেশের মাছ চাষী ও বিক্রেতাদের জন্য সম্পূর্ণ সমাধান। বাজার দর, চাষ পরামর্শ, রোগ নির্ণয় এবং আরও অনেক কিছু।" />
            <meta name="keywords" content="মাছ চাষ, বাংলাদেশ, বাজার দর, মাছের রোগ, চাষ পরামর্শ" />
            <meta property="og:title" content="Fish Care BD - টেকসই মাছ চাষের বিশ্বস্ত সহায়ক" />
            <meta property="og:description" content="বাংলাদেশের মাছ চাষী ও বিক্রেতাদের জন্য সম্পূর্ণ সমাধান" />
            <meta property="og:type" content="website" />
          </Helmet>
          
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/fish-care-guide" element={<FishCareGuide />} />
              <Route path="/disease-detector" element={<DiseaseDetector />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;