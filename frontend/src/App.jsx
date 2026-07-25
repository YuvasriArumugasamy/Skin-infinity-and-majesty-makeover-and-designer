import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load all pages — reduces initial bundle size
const Home            = lazy(() => import('./pages/Home'));
const About           = lazy(() => import('./pages/About'));
const Services        = lazy(() => import('./pages/Services'));
const Bridal          = lazy(() => import('./pages/Bridal'));
const Gallery         = lazy(() => import('./pages/Gallery'));
const Reviews         = lazy(() => import('./pages/Reviews'));
const Contact         = lazy(() => import('./pages/Contact'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const NotFound        = lazy(() => import('./pages/NotFound'));
const AdminLogin      = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard  = lazy(() => import('./pages/admin/AdminDashboard'));

// Simple page loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FAF3F5]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-[#C57488] border-t-transparent animate-spin" />
      <p className="text-xs font-semibold text-[#C57488] tracking-widest uppercase">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* Customer Website Routes */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen flex flex-col justify-between relative">
                  <Navbar />
                  <FloatingContactButtons />
                  <div className="flex-grow">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/"                  element={<Home />} />
                        <Route path="/about"             element={<About />} />
                        <Route path="/services"          element={<Services />} />
                        <Route path="/bridal"            element={<Bridal />} />
                        <Route path="/gallery"           element={<Gallery />} />
                        <Route path="/reviews"           element={<Reviews />} />
                        <Route path="/contact"           element={<Contact />} />
                        <Route path="/book-appointment"  element={<BookAppointment />} />
                        <Route path="*"                  element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                  <Footer />
                </div>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
