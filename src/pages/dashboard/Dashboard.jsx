import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardCard = ({ label, value, icon, color }) => (
  <div className="card-premium d-flex align-items-center justify-content-between p-4">
    <div>
      <p className="text-muted small fw-bold text-uppercase mb-1" style={{letterSpacing: '0.5px'}}>{label}</p>
      <h3 className="fw-bold mb-0">{value}</h3>
    </div>
    <div className="rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
         style={{width: '50px', height: '50px', backgroundColor: `${color}15`, color: color, borderRadius: '5px'}}>
      <i className={`bi ${icon}`} style={{fontSize: '1.4rem'}}></i>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout title="Overview">
      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} lg={4}>
          <DashboardCard label="Siswa Aktif" value="250+" icon="bi-people-fill" color="#F97316" />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <DashboardCard label="Registrasi Baru" value="12" icon="bi-person-plus-fill" color="#3b82f6" />
        </Col>
        <Col xs={12} lg={4}>
          <DashboardCard label="Tutors Result " value="30" icon="bi-currency-exchange" color="#10b981" />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="card-premium">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h5 className="fw-bold mb-0">Aktivitas Pendaftaran</h5>
              <button className="btn btn-sm btn-rs-primary px-3" style={{fontSize: '0.75rem'}}>Cek Semua Data</button>
            </div>
            
            <div className="text-center py-5">
              <div className="bg-light d-inline-block rounded-circle p-4 mb-3">
                <i className="bi bi-clipboard2-data text-muted" style={{fontSize: '2rem'}}></i>
              </div>
              <h6 className="fw-bold text-dark">Data sedang diproses</h6>
              <p className="text-muted small mx-auto" style={{maxWidth: '300px'}}>
                Pastikan Anda mengecek menu <strong>Payment</strong> secara rutin untuk memverifikasi pendaftar baru.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Dashboard;