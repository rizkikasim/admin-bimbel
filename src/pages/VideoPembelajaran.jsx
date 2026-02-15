import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import videoData from '../data/videoData.json';

const VideoPembelajaran = () => {
  return (
    <AdminLayout title="Video Pembelajaran">
      <Row className="g-4">
        {/* KOLOM KIRI: FORM INPUT VIDEO (STICKY) */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-play-circle-fill me-2" style={{ color: '#F97316' }}></i>Input Video Baru
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Title Video</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Belajar Aljabar" style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Description</Form.Label>
                <textarea 
                  className="search-input ps-3 py-2" 
                  rows="4" 
                  placeholder="Masukkan deskripsi video..."
                  style={{ borderRadius: '5px' }}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Video URL (Embed)</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="https://youtube.com/embed/..." style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Button className="btn-rs-primary w-100 py-2 border-0" style={{ backgroundColor: '#F97316', borderRadius: '5px' }}>
                <i className="bi bi-cloud-upload-fill me-2"></i>Publish Video
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: KOLEKSI VIDEO (SCROLLABLE) */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Koleksi Video Belajar</h6>
              <div className="search-wrapper" style={{ width: '250px' }}>
                <i className="bi bi-search"></i>
                <input type="text" className="search-input" placeholder="Cari video..." />
              </div>
            </div>

            {/* AREA SCROLL KHUSUS */}
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
              <Row className="g-3">
                {videoData.map((vid) => (
                  <Col md={6} key={vid.id}>
                    <Card className="border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: '5px' }}>
                      <div className="position-relative">
                        <img 
                          src={vid.thumbnail} 
                          className="card-img-top" 
                          alt={vid.title} 
                          style={{ height: '160px', objectFit: 'cover' }} 
                        />
                      </div>
                      <Card.Body className="p-3">
                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.9rem' }}>{vid.title}</h6>
                        <p className="text-muted mb-3" style={{ fontSize: '0.75rem', height: '35px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                          {vid.description}
                        </p>
                        <div className="d-flex gap-2 pt-2 border-top">
                          <Button variant="light" className="btn-sm flex-grow-1 text-primary fw-bold" style={{ fontSize: '0.7rem' }}>
                            <i className="bi bi-pencil-square me-1"></i> Edit
                          </Button>
                          <Button variant="light" className="btn-sm text-danger" style={{ backgroundColor: '#fff1f2' }}>
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default VideoPembelajaran;