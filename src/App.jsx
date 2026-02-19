import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import CSS Global & Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Import Halaman Utama
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Registrasi from './pages/Registrasi/Registrasi';
import VideoPembelajaran from './pages/VidioPembelajaran/VideoPembelajaran';
import Program from './pages/Program/Program';
import CompanyStats from './pages/companyStats/CompanyStats';
import Payment from './pages/Payment/Payment';
import Gallery from './pages/Gallery/Gallery';
import Testimoni from './pages/Testimoni/Testimoni';

// --- TAMBAHKAN IMPORT INI (Penyebab Error) ---
import Testimoni2 from './pages/Testimoni2/Testimoni2'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/video" element={<VideoPembelajaran />} />
        <Route path="/program" element={<Program />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/stats" element={<CompanyStats />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimoni" element={<Testimoni />} />

        {/* --- ROUTE TESTIMONI ALUMNI --- */}
        <Route path="/testimoni2" element={<Testimoni2 />} />

        {/* Safety Net */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;