import React from 'react';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in dev — can be replaced with error tracking service
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center space-y-5 max-w-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-serif-luxury font-bold text-[#2C2225]">
              Something went wrong
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              An unexpected error occurred. Please refresh the page or go back to home.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C57488] text-white text-xs font-bold hover:bg-[#B35F74] transition"
              >
                <FiRefreshCw className="text-sm" /> Refresh Page
              </button>
              <button
                onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C57488] text-[#C57488] text-xs font-bold hover:bg-pink-50 transition"
              >
                <FiHome className="text-sm" /> Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
