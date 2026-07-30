import { io } from 'socket.io-client';

const getSocketURL = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
  }
  return 'https://skin-infinity-and-majesty-makeover-and.onrender.com';
};

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(getSocketURL(), {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      autoConnect: false
    });
  }
  return socket;
};

export const connectAdminSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
  s.emit('join_admin');
  return s;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};
