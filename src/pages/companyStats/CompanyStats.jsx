import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import statsData from '../../data/statsData.json'; // Import JSON langsung tanpa kurung kurawal

const CompanyStats = () => {
  return (
    <AdminLayout title="Company Stats">
      {/* BAGIAN ATAS: PREVIEW KARTU STATISTIK (Modern Style) */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{statsData.total_tutors}+</h3>
            <small className="text-muted fw-medium">Tutor Profesional</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{statsData.siswa_aktif}+</h3>
            <small className="text-muted fw-medium">Siswa Aktif</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{statsData.tingkat_kepuasan}%</h3>
            <small className="text-muted fw-medium">Tingkat Kepuasan</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{statsData.tahun_pengalaman}+</h3>
            <small className="text-muted fw-medium">Tahun Pengalaman</small>
          </div>
        </Col>
      </Row>

      {/* BAGIAN BAWAH: FORM UPDATE DATA */}
      <div className="card-premium animate__animated animate__fadeIn">
        <div className="mb-4">
          <h6 className="fw-bold mb-1">Update Data Perusahaan</h6>
          <p className="text-muted small mb-0">Ubah angka di bawah ini untuk memperbarui informasi di halaman publik website.</p>
        </div>
        
        <Form>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Total Tutors Profesional</Form.Label>
                <input 
                  type="number" 
                  className="search-input ps-3" 
                  defaultValue={statsData.total_tutors} 
                  style={{ borderRadius: '5px' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Jumlah Siswa Aktif</Form.Label>
                <input 
                  type="number" 
                  className="search-input ps-3" 
                  defaultValue={statsData.siswa_aktif} 
                  style={{ borderRadius: '5px' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Tingkat Kepuasan Siswa (%)</Form.Label>
                <input 
                  type="number" 
                  className="search-input ps-3" 
                  defaultValue={statsData.tingkat_kepuasan} 
                  style={{ borderRadius: '5px' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Tahun Pengalaman</Form.Label>
                <input 
                  type="number" 
                  className="search-input ps-3" 
                  defaultValue={statsData.tahun_pengalaman} 
                  style={{ borderRadius: '5px' }}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <hr className="my-4 opacity-25" />
          
          <div className="d-flex justify-content-end">
            <Button className="btn-rs-primary px-4 py-2">
              <i className="bi bi-cloud-upload-fill me-2"></i>Update Statistik
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default CompanyStats;