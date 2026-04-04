import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import statsData from '../../data/statsData.json';
import { api } from '../../utils/api';

const CompanyStats = () => {
  const [stats, setStats] = useState(statsData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const response = await api.get('/admin/stats');
        if (isMounted && response?.data) {
          setStats(response.data);
        }
      } catch {
        if (isMounted) {
          setStats(statsData);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field, value) => {
    setStats((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSaving(true);

    try {
      const response = await api.put('/admin/stats', {
        total_tutors: stats.total_tutors,
        tingkat_kepuasan: stats.tingkat_kepuasan,
        siswa_aktif: stats.siswa_aktif,
        tahun_pengalaman: stats.tahun_pengalaman,
      });

      if (response?.data) {
        setStats(response.data);
      }
      setMessage('Statistik berhasil diperbarui.');
    } catch (err) {
      setMessage(err.message || 'Gagal memperbarui statistik.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Company Stats">
      {/* BAGIAN ATAS: PREVIEW KARTU STATISTIK (Modern Style) */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{stats.total_tutors}+</h3>
            <small className="text-muted fw-medium">Tutor Profesional</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{stats.siswa_aktif}+</h3>
            <small className="text-muted fw-medium">Siswa Aktif</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{stats.tingkat_kepuasan}%</h3>
            <small className="text-muted fw-medium">Tingkat Kepuasan</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="card-premium text-center border-0 shadow-sm" style={{ backgroundColor: '#fff7ed' }}>
            <h3 className="fw-bold text-rs-orange mb-0">{stats.tahun_pengalaman}+</h3>
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
        
        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Total Tutors Profesional</Form.Label>
                <input 
                  type="number" 
                  className="search-input ps-3" 
                  value={stats.total_tutors}
                  min="0"
                  onChange={(e) => handleChange('total_tutors', e.target.value)}
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
                  value={stats.siswa_aktif}
                  min="0"
                  onChange={(e) => handleChange('siswa_aktif', e.target.value)}
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
                  value={stats.tingkat_kepuasan}
                  min="0"
                  onChange={(e) => handleChange('tingkat_kepuasan', e.target.value)}
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
                  value={stats.tahun_pengalaman}
                  min="0"
                  onChange={(e) => handleChange('tahun_pengalaman', e.target.value)}
                  style={{ borderRadius: '5px' }}
                />
              </Form.Group>
            </Col>
          </Row>

          {message && (
            <div className="mt-3 small" style={{ color: message.includes('berhasil') ? '#16a34a' : '#dc2626' }}>
              {message}
            </div>
          )}
          
          <hr className="my-4 opacity-25" />
          
          <div className="d-flex justify-content-end">
            <Button type="submit" className="btn-rs-primary px-4 py-2" disabled={isSaving}>
              <i className="bi bi-cloud-upload-fill me-2"></i>Update Statistik
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default CompanyStats;