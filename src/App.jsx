import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import CSS Global & Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Import Pages (Clean Code: Semua halaman dipusatkan di folder pages)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registrasi from './pages/Registrasi';
import VideoPembelajaran from './pages/VideoPembelajaran';
import Program from './pages/Program';
import CompanyStats from './pages/CompanyStats';
import Payment from './pages/Payment';
import Testimoni from './pages/Testimoni';

/**
 * App Component
 * Mengatur sistem navigasi utama untuk Bimbelku Rumah Sukses Admin Portal.
 * Menggunakan React Router Dom untuk perpindahan halaman yang cepat dan responsif.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Awal: Login Admin Portal */}
        <Route path="/login" element={<Login />} />
        
        {/* Halaman Dashboard: Overview Statistik Bimbel */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Halaman Registrasi: Manajemen Data Calon Siswa Baru */}
        <Route path="/registrasi" element={<Registrasi />} />
        
        {/* --- Redirect Logics --- */}
        
        {/* Jika user mengakses root domain, arahkan otomatis ke login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Jika user mengetik alamat yang tidak terdaftar, kembalikan ke login (Safety Net) */}
        <Route path="*" element={<Navigate to="/login" />} />

        {/* Halaman Video Pembelajaran: Manajemen Konten Video */}
        <Route path="/video" element={<VideoPembelajaran />} />

        {/* Halaman Program: Manajemen Program Bimbel */} 
        <Route path="/program" element={<Program />} />

        {/* Halaman Statistik Perusahaan: Data Statistik Lengkap */}
        <Route path="/stats" element={<CompanyStats />} />

        {/* Halaman Payment: Manajemen Pembayaran (Placeholder) */}
        <Route path="/payment" element={<Payment />} />

        {/* Halaman Testimoni: Manajemen Testimoni (Placeholder) */}
        <Route path="/testimoni" element={<div className="p-4"><h2>Testimoni Management</h2><p>Fitur ini sedang dalam pengembangan.</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;