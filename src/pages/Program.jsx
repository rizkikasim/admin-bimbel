import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import programData from '../data/programData.json'; // Import JSON murni

const Program = () => {
  // Menggunakan data dari JSON sebagai state awal
  const [programs] = useState(programData);

  return (
    <AdminLayout title="Manajemen Program">
      <Row className="g-4">
        {/* KOLOM KIRI: FORM INPUT PROGRAM */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-plus-square-fill me-2 text-rs-orange"></i>Tambah Program Baru
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori</Form.Label>
                <Form.Select className="search-input ps-3" style={{ borderRadius: '5px' }}>
                  <option>Pilih Kategori</option>
                  <option>Bimbel</option>
                  <option>Kursus</option>
                  <option>Private</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Bimbel Intensif" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto Thumbnail</Form.Label>
                <div className="upload-box">
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    className="d-none" 
                    id="upload-program-photo"
                  />
                  <label htmlFor="upload-program-photo" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3 bg-light-orange" 
                         style={{ cursor: 'pointer', border: '2px dashed #F97316', borderRadius: '5px' }}>
                      <i className="bi bi-image text-rs-orange fs-4"></i>
                      <p className="small mb-0 text-muted mt-1">Klik untuk upload foto</p>
                    </div>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Deskripsi</Form.Label>
                <textarea 
                  className="search-input ps-3 py-2" 
                  rows="3" 
                  placeholder="Jelaskan detail program..."
                  style={{ borderRadius: '5px' }}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Harga (Rp)</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: 1.500.000" />
              </Form.Group>

              <Button className="btn-rs-primary w-100 py-2">
                <i className="bi bi-save-fill me-2"></i>Simpan Program
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR PROGRAM */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Daftar Program Bimbelku</h6>
              <div className="search-wrapper" style={{ width: '200px' }}>
                <i className="bi bi-search"></i>
                <input type="text" className="search-input" placeholder="Cari program..." />
              </div>
            </div>

            <Row className="g-3">
              {programs.map((prog) => (
                <Col md={6} key={prog.id}>
                  <Card className="border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: '5px' }}>
                    <div className="position-relative">
                      <img 
                        src={prog.thumbnail} 
                        className="card-img-top" 
                        alt={prog.judul} 
                        style={{ height: '160px', objectFit: 'cover' }} 
                      />
                      <span className="position-absolute top-0 start-0 m-2 badge bg-rs-orange" style={{ borderRadius: '5px' }}>
                        {prog.kategori}
                      </span>
                    </div>
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0 pe-2">{prog.judul}</h6>
                        <span className="text-rs-orange fw-bold small">
                          Rp {prog.harga}
                        </span>
                      </div>
                      <p className="text-muted small mb-3" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                        {prog.deskripsi}
                      </p>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" className="btn-sm flex-grow-1" style={{ borderRadius: '5px', fontSize: '0.75rem' }}>
                          <i className="bi bi-pencil-square me-1"></i> Edit
                        </Button>
                        <Button variant="outline-danger" className="btn-sm" style={{ borderRadius: '5px' }}>
                          <i className="bi bi-trash"></i>
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

export default Program;