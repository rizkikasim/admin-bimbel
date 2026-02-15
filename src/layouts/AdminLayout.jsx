import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* SIDEBAR */}
      <div className="sidebar-custom shadow-sm bg-white" style={{ width: '260px', position: 'fixed', height: '100vh', zIndex: 1000 }}>
        
        {/* AREA LOGO SIDEBAR - Sejajar dengan Navbar (70px) */}
        <div className="d-flex align-items-center px-4 border-bottom" style={{ height: '70px' }}>
          <div className="bg-white shadow-sm d-flex align-items-center justify-content-center me-3" 
               style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
            <img 
              src="/assets/logo.jpeg" 
              alt="Logo" 
              style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
            />
          </div>
          <div>
            <h6 className="fw-bold mb-0" style={{ color: '#F97316', fontSize: '0.8rem', lineHeight: '1' }}>BIMBELKU</h6>
            <small className="text-muted fw-bold" style={{ fontSize: '0.5rem' }}>RUMAH SUKSES</small>
          </div>
        </div>

        {/* MENU NAVIGASI */}
        <div className="overflow-auto py-3 custom-scrollbar" style={{ height: 'calc(100vh - 70px)' }}>
          <div className="menu-label px-4 small fw-bold text-muted mb-2" style={{ fontSize: '0.7rem' }}>UTAMA</div>
          <div onClick={() => navigate('/dashboard')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/dashboard')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-grid-1x2-fill me-3"></i> <span>Dashboard</span>
          </div>

          <div className="menu-label px-4 small fw-bold text-muted mb-2 mt-4" style={{ fontSize: '0.7rem' }}>AKADEMIK</div>
          <div onClick={() => navigate('/registrasi')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/registrasi')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-person-plus-fill me-3"></i> <span>Registrasi</span>
          </div>
          <div onClick={() => navigate('/video')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/video')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-play-btn-fill me-3"></i> <span>Video Belajar</span>
          </div>

          <div className="menu-label px-4 small fw-bold text-muted mb-2 mt-4" style={{ fontSize: '0.7rem' }}>MANAJEMEN</div>
          <div onClick={() => navigate('/payment')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/payment')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-wallet2 me-3"></i> <span>Payment</span>
          </div>
          <div onClick={() => navigate('/program')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/program')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-collection-play-fill me-3"></i> <span>Program</span>
          </div>

          <div className="menu-label px-4 small fw-bold text-muted mb-2 mt-4" style={{ fontSize: '0.7rem' }}>STATISTIK & KONTEN</div>
          <div onClick={() => navigate('/stats')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/stats')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-bar-chart-line-fill me-3"></i> <span>Company Stats</span>
          </div>
          <div onClick={() => navigate('/testimoni')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/testimoni')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-chat-heart-fill me-3"></i> <span>Testimoni</span>
          </div>
          {/* Menu Gallery Baru */}
          <div onClick={() => navigate('/gallery')} className={`nav-link-custom mx-3 d-flex align-items-center ${isActive('/gallery')}`} style={{ cursor: 'pointer' }}>
            <i className="bi bi-images me-3"></i> <span>Gallery</span>
          </div>

          <div onClick={() => navigate('/login')} className="nav-link-custom mx-3 d-flex align-items-center text-danger mt-4" style={{ cursor: 'pointer' }}>
            <i className="bi bi-box-arrow-right me-3"></i> <span>Keluar</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1" style={{ marginLeft: '260px' }}>
        {/* NAVBAR - Tinggi 70px */}
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 sticky-top" style={{ height: '70px' }}>
          <div className="container-fluid px-0">
            <h5 className="fw-bold mb-0 text-dark">{title}</h5>
            
            <div className="d-flex align-items-center">
              <div className="me-3 text-end d-none d-md-block">
                <div className="fw-bold small mb-0" style={{ color: '#1e293b' }}>Rizki Kasim</div>
                <small className="fw-bold" style={{ fontSize: '0.65rem', color: '#F97316' }}>SUPER ADMIN</small>
              </div>
              
              <div className="position-relative d-inline-block bg-white shadow-sm p-1" 
                   style={{ borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <img 
                  src="/assets/profilIcon.png" 
                  width="35" 
                  height="35" 
                  alt="profile"
                  style={{ objectFit: 'contain', borderRadius: '8px' }}
                />
                <span className="position-absolute border border-white rounded-circle" 
                      style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', bottom: '-2px', right: '-2px' }}></span>
              </div>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;