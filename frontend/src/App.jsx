import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Bridal from './pages/Bridal';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';

import ScrollToTop from './components/ScrollToTop';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        
        {/* Customer Website Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col justify-between relative">
              <Navbar />
              <FloatingContactButtons />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/bridal" element={<Bridal />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
