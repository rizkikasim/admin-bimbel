import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import VideoPembelajaran from './pages/VidioPembelajaran/VideoPembelajaran';
import Program from './pages/Program/Program';
import CompanyStats from './pages/companyStats/CompanyStats';
import Payment from './pages/Payment/Payment';
import Gallery from './pages/Gallery/Gallery';
import Testimoni from './pages/Testimoni/Testimoni';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/registrasi" element={<Navigate to="/dashboard" replace />} />
        <Route path="/video" element={<PrivateRoute><VideoPembelajaran /></PrivateRoute>} />
        <Route path="/program" element={<PrivateRoute><Program /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path="/stats" element={<PrivateRoute><CompanyStats /></PrivateRoute>} />
        <Route path="/gallery" element={<PrivateRoute><Gallery /></PrivateRoute>} />
        <Route path="/testimoni" element={<PrivateRoute><Testimoni /></PrivateRoute>} />
        <Route path="/testimoni2" element={<Navigate to="/testimoni" replace />} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;