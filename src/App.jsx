import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import CSS Global & Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// --- PERBAIKAN IMPORT SESUAI STRUKTUR FOLDER BARU ---
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Registrasi from './pages/Registrasi/Registrasi'; // Perbaikan: Langsung di folder Registrasi
import VideoPembelajaran from './pages/VidioPembelajaran/VideoPembelajaran';
import Program from './pages/Program/Program';
import CompanyStats from './pages/companyStats/CompanyStats'; // Menggunakan huruf kecil 'c' sesuai folder
import Payment from './pages/Payment/Payment';
import Testimoni from './pages/Testimoni/Testimoni';
import Gallery from './pages/Gallery/Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/video" element={<VideoPembelajaran />} />
        <Route path="/program" element={<Program />} />
        <Route path="/stats" element={<CompanyStats />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/testimoni" element={<Testimoni />} />
        
        {/* Safety Redirects */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;