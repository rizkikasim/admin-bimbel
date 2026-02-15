import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import galleryData from '../data/galleryData.json'; // Pastikan file JSON sudah ada

const Gallery = () => {
  const [galleries] = useState(galleryData);

  return (
    <AdminLayout title="Manajemen Gallery">
      <Row className="g-4">
        {/* KOLOM KIRI: FORM INPUT GALLERY (STICKY) */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-images me-2" style={{ color: '#F97316' }}></i>Upload Foto Baru
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Foto</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Kegiatan Belajar Bersama" style={{ borderRadius: '5px' }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto</Form.Label>
                <div className="upload-box">
                  <Form.Control type="file" accept="image/*" className="d-none" id="upload-gallery-photo" />
                  <label htmlFor="upload-gallery-photo" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3 bg-light-orange" 
                         style={{ cursor: 'pointer', border: '2px dashed #F97316', borderRadius: '5px' }}>
                      <i className="bi bi-cloud-arrow-up-fill text-rs-orange fs-4"></i>
                      <p className="small mb-0 text-muted mt-1">Klik untuk pilih foto</p>
                    </div>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Deskripsi Singkat</Form.Label>
                <textarea 
                  className="search-input ps-3 py-2" 
                  rows="4" 
                  placeholder="Ceritakan momen dalam foto ini..."
                  style={{ borderRadius: '5px' }}
                ></textarea>
              </Form.Group>

              <Button className="btn-rs-primary w-100 py-2 border-0" style={{ backgroundColor: '#F97316', borderRadius: '5px' }}>
                <i className="bi bi-plus-circle-fill me-2"></i>Tambah ke Gallery
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR GALLERY (SCROLLABLE AREA) */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Koleksi Foto Bimbelku</h6>
              <div className="search-wrapper" style={{ width: '250px' }}>
                <i className="bi bi-search"></i>
                <input type="text" className="search-input" placeholder="Cari foto..." />
              </div>
            </div>

            {/* AREA SCROLL MANDIRI */}
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
              <Row className="g-3">
                {galleries.map((item) => (
                  <Col md={6} key={item.id}>
                    <Card className="border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: '5px' }}>
                      <div className="position-relative">
                        <img 
                          src={item.image} 
                          className="card-img-top" 
                          alt={item.title} 
                          style={{ height: '180px', objectFit: 'cover' }} 
                        />
                      </div>
                      <Card.Body className="p-3">
                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.9rem' }}>{item.title}</h6>
                        <p className="text-muted small mb-3" style={{ height: '35px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                          {item.description}
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

export default Gallery;