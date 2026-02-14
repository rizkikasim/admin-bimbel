import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import testimoniData from '../data/testimoniData.json';

const Testimoni = () => {
  return (
    <AdminLayout title="Manajemen Testimoni">
      <Row className="g-4">
        {/* KOLOM KIRI: INPUT TESTIMONI BARU */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-chat-quote-fill me-2 text-rs-orange"></i>Tambah Testimoni
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Nama Lengkap</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Ibu Ratna" style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Peran / Status</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Orang Tua Siswa" style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto</Form.Label>
                <input type="file" className="form-control form-control-sm" style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Isi Testimoni</Form.Label>
                <textarea className="search-input ps-3 py-2" rows="4" placeholder="Tulis testimoni di sini..." style={{ borderRadius: '5px' }}></textarea>
              </Form.Group>

              <Button className="btn-rs-primary w-100 py-2">
                <i className="bi bi-send-fill me-2"></i>Simpan Testimoni
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR TESTIMONI (GAYA KOMBINASI GAMBAR 1 & 2) */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <h6 className="fw-bold mb-4">Preview Testimoni di Website</h6>
            <Row className="g-3">
              {testimoniData.map((item) => (
                <Col md={6} key={item.id}>
                  <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '5px', backgroundColor: '#fff7ed' }}>
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center mb-3">
                        <img 
                          src={item.foto} 
                          alt={item.nama} 
                          className="rounded-circle me-3 border border-2 border-white shadow-sm"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{item.nama}</h6>
                          <small className="text-rs-orange fw-medium" style={{ fontSize: '0.75rem' }}>{item.peran}</small>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        {[...Array(item.rating)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill text-warning me-1" style={{ fontSize: '0.7rem' }}></i>
                        ))}
                      </div>

                      <p className="text-muted mb-3" style={{ fontSize: '0.8rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                        "{item.pesan}"
                      </p>

                      <div className="d-flex gap-2">
                        <Button variant="white" className="btn-sm bg-white border shadow-sm flex-grow-1" style={{ fontSize: '0.7rem', borderRadius: '5px' }}>
                          <i className="bi bi-pencil-square text-primary"></i> Edit
                        </Button>
                        <Button variant="white" className="btn-sm bg-white border shadow-sm" style={{ borderRadius: '5px' }}>
                          <i className="bi bi-trash text-danger"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Testimoni;