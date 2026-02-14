import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Fungsi untuk menandai menu yang sedang aktif
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="d-flex min-vh-100">
      {/* --- SIDEBAR AREA --- */}
      <aside className="sidebar shadow-sm">
        <div className="sidebar-header border-bottom">
          <div className="d-flex align-items-center">
            <div className="bg-rs-orange p-2 rounded-3 me-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', borderRadius: '5px' }}>
              <i className="bi bi-rocket-takeoff-fill text-white"></i>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.5px' }}>Bimbelku</h5>
              <small className="text-rs-orange fw-bold" style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>Admin Portal</small>
            </div>
          </div>
        </div>

        <div className="overflow-auto flex-grow-1 py-3 custom-scrollbar">
          <div className="menu-label">Utama</div>
          <a href="/dashboard" className={`nav-link-custom ${isActive('/dashboard')}`}>
            <i className="bi bi-grid-1x2-fill"></i> <span>Dashboard</span>
          </a>

        
        <div className="menu-label">Akademik</div>
            <a 
            href="/registrasi" 
            className={`nav-link-custom ${isActive('/registrasi')}`}
            onClick={(e) => {
                e.preventDefault();
                navigate('/registrasi'); 
            }}
        >
        <i className="bi bi-person-plus-fill"></i> <span>Registrasi</span>
        </a>

        <a href="/video" className={`nav-link-custom ${isActive('/video')}`}>
            <i className="bi bi-play-btn-fill"></i> <span>Video Belajar</span>
        </a>

          <div className="menu-label">Manajemen</div>
        <a href="/payment" className={`nav-link-custom ${isActive('/payment')}`}>
            <i className="bi bi-wallet2"></i> <span>Payment</span>
          </a>
          <a href="/program" className={`nav-link-custom ${isActive('/program')}`}
            onClick={(e) => {
                e.preventDefault();
                navigate('/program');
            }}
            >
            <i className="bi bi-collection-play-fill"></i> <span>Program</span>
        </a>

          <div className="menu-label">Konten & Statistik</div>
        <a href="#" onClick={() => navigate('/testimoni')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/testimoni')}`}>
            <i className="bi bi-chat-heart-fill me-3"></i> <span>Testimoni</span>
        </a>
        <a href="/stats" className={`nav-link-custom ${isActive('/stats')}`}>
            <i className="bi bi-bar-chart-line-fill"></i> <span>Company Stats</span>
        </a>
        </div>

        <div className="mt-auto p-3 border-top bg-light">
          <button onClick={handleLogout} className="nav-link-custom text-danger border-0 bg-transparent w-100 m-0 p-2 d-flex align-items-center justify-content-start">
            <i className="bi bi-box-arrow-left me-2"></i> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="main-content w-100 p-0" style={{ backgroundColor: '#f8fafc' }}>
        {/* NAVBAR */}
        <header className="navbar-custom shadow-sm mb-4 bg-white">
          <div className="search-wrapper d-none d-md-block">
            <i className="bi bi-search"></i>
            <input type="text" className="search-input" placeholder="Cari data pendaftar..." />
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Notifikasi */}
            <div className="nav-icon-btn">
              <i className="bi bi-bell fs-5"></i>
              <div className="notif-badge"></div>
            </div>

            {/* Pesan */}
            <div className="nav-icon-btn me-2">
              <i className="bi bi-chat-dots fs-5"></i>
            </div>

            {/* Profil Admin */}
            <div className="d-flex align-items-center ps-3 border-start">
              <div className="text-end me-3 d-none d-sm-block">
                <p className="mb-0 fw-bold small" style={{ lineHeight: '1' }}>Nova Aulia</p>
                <small className="text-muted" style={{ fontSize: '0.65rem' }}>Super Admin</small>
              </div>
              <div 
                className="bg-rs-orange text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" 
                style={{ width: '40px', height: '40px', borderRadius: '5px', cursor: 'pointer' }}
              >
                N
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="px-4 pb-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;