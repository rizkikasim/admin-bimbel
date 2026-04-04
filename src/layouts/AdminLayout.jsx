import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuthStorage, getAdminUsername } from '../utils/auth';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUsername = getAdminUsername();

  // Fungsi untuk mengecek menu aktif
  const isActive = (path) => location.pathname === path;

  // Objek Style untuk reusable UI
  const navItemStyle = (path) => ({
    cursor: 'pointer',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    backgroundColor: isActive(path) ? '#FFF7ED' : 'transparent', // Background soft orange saat aktif
    color: isActive(path) ? '#F97316' : '#64748b', // Text orange saat aktif
    fontWeight: isActive(path) ? '700' : '500',
    padding: '12px 16px',
    fontSize: '0.85rem'
  });

  const iconStyle = (path) => ({
    fontSize: '1.2rem',
    color: isActive(path) ? '#F97316' : '#94a3b8',
    marginRight: '16px'
  });

  const handleLogout = () => {
    clearAuthStorage();
    navigate('/login', { replace: true });
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* SIDEBAR */}
      <div className="sidebar-custom shadow-sm bg-white border-end" style={{ width: '280px', position: 'fixed', height: '100vh', zIndex: 1000 }}>
        
        {/* LOGO AREA - Ditingkatkan Spacingnya */}
        <div className="d-flex align-items-center px-4" style={{ height: '90px' }}>
          <div className="bg-white shadow-sm d-flex align-items-center justify-content-center me-3" 
               style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <img src="/assets/logo.jpeg" alt="Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          </div>
          <div>
            <h6 className="fw-bold mb-0" style={{ color: '#F97316', fontSize: '0.9rem', letterSpacing: '0.5px' }}>BIMBELKU</h6>
            <small className="text-muted fw-bold" style={{ fontSize: '0.55rem', letterSpacing: '1px' }}>RUMAH SUKSES</small>
          </div>
        </div>

        {/* MENU NAVIGASI - Padding ditingkatkan agar lebih lega */}
        <div className="overflow-auto py-3 custom-scrollbar px-3" style={{ height: 'calc(100vh - 90px)' }}>
          
          <div className="menu-label px-3 small fw-bold text-muted mb-3" style={{ fontSize: '0.65rem', letterSpacing: '1.2px' }}>UTAMA</div>
          <div onClick={() => navigate('/dashboard')} className="d-flex align-items-center mb-1" style={navItemStyle('/dashboard')}>
            <i className="bi bi-grid-fill" style={iconStyle('/dashboard')}></i> <span>Dashboard</span>
          </div>

          <div className="menu-label px-3 small fw-bold text-muted mb-3 mt-4" style={{ fontSize: '0.65rem', letterSpacing: '1.2px' }}>AKADEMIK</div>
          <div onClick={() => navigate('/video')} className="d-flex align-items-center mb-1" style={navItemStyle('/video')}>
            <i className="bi bi-play-circle-fill" style={iconStyle('/video')}></i> <span>Video Belajar</span>
          </div>
          <div onClick={() => navigate('/gallery')} className="d-flex align-items-center mb-1" style={navItemStyle('/gallery')}>
            <i className="bi bi-image-fill" style={iconStyle('/gallery')}></i> <span>Gallery</span>
          </div>

          <div className="menu-label px-3 small fw-bold text-muted mb-3 mt-4" style={{ fontSize: '0.65rem', letterSpacing: '1.2px' }}>MANAJEMEN</div>
          <div onClick={() => navigate('/payment')} className="d-flex align-items-center mb-1" style={navItemStyle('/payment')}>
            <i className="bi bi-wallet2" style={iconStyle('/payment')}></i> <span>Payment</span>
          </div>
          <div onClick={() => navigate('/program')} className="d-flex align-items-center mb-1" style={navItemStyle('/program')}>
            <i className="bi bi-collection-play-fill" style={iconStyle('/program')}></i> <span>Program</span>
          </div>

          <div className="menu-label px-3 small fw-bold text-muted mb-3 mt-4" style={{ fontSize: '0.65rem', letterSpacing: '1.2px' }}>STATISTIK & KONTEN</div>
          <div onClick={() => navigate('/stats')} className="d-flex align-items-center mb-1" style={navItemStyle('/stats')}>
            <i className="bi bi-bar-chart-fill" style={iconStyle('/stats')}></i> <span>Company Stats</span>
          </div>
          <div onClick={() => navigate('/testimoni')} className="d-flex align-items-center mb-1" style={navItemStyle('/testimoni')}>
            <i className="bi bi-chat-left-heart-fill" style={iconStyle('/testimoni')}></i> <span>Testimoni</span>
          </div>

          <div className="border-top mt-4 pt-3">
            <div onClick={handleLogout} className="d-flex align-items-center text-danger px-3 py-2 fw-bold" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
              <i className="bi bi-box-arrow-right me-3 fs-5"></i> <span>Keluar</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 sticky-top" style={{ height: '70px' }}>
          <div className="container-fluid px-0">
            <h5 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.5px' }}>{title}</h5>
            <div className="d-flex align-items-center">
              <div className="me-3 text-end d-none d-md-block">
                <div className="fw-bold small mb-0" style={{ color: '#1e293b' }}>{adminUsername}</div>
                <small className="fw-bold" style={{ fontSize: '0.65rem', color: '#F97316' }}>SUPER ADMIN</small>
              </div>
              <div className="position-relative d-inline-block bg-white shadow-sm p-1" style={{ borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <img src="/assets/profilIcon.png" width="35" height="35" alt="profile" style={{ objectFit: 'contain', borderRadius: '8px' }} />
                <span className="position-absolute border border-white rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', bottom: '-2px', right: '-2px' }}></span>
              </div>
            </div>
          </div>
        </nav>
        <div className="p-4" style={{ minHeight: 'calc(100vh - 70px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;