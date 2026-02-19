import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useTestimoni2Logic } from './useTestimoni2Logic';
import EditTestimoni2Modal from './EditTestimoni2Modal';

const Testimoni2 = () => {
  const { 
    searchTerm, setSearchTerm, filteredAlumni, 
    deleteAlumni, startEdit, showEditModal, 
    selectedAlumni, closeEditModal 
  } = useTestimoni2Logic();

  return (
    <AdminLayout title="Testimoni Alumni (Detail)">
      <Row className="g-4">
        {/* KOLOM KIRI: INPUT DATA ALUMNI */}
        <Col lg={4}>
          <div className="card-premium sticky-top shadow-sm border-0" style={{ top: '20px', zIndex: 10, borderRadius: '15px' }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-mortarboard-fill me-2" style={{ color: '#F97316' }}></i>Input Testimoni Alumni
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Nama Alumni</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Nama..." />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Universitas & Jurusan</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: UI - Kedokteran" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Nilai UTBK</Form.Label>
                <input type="number" className="search-input ps-3" placeholder="Contoh: 720" />
              </Form.Group>

              {/* FITUR BARU: UPLOAD FOTO ALUMNI */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto Alumni</Form.Label>
                <div className="upload-box">
                  <Form.Control type="file" accept="image/*" className="d-none" id="upload-alumni-photo" />
                  <label htmlFor="upload-alumni-photo" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3" 
                         style={{ cursor: 'pointer', border: '2px dashed #F97316', backgroundColor: '#fff7ed' }}>
                      <i className="bi bi-cloud-arrow-up-fill fs-4" style={{ color: '#F97316' }}></i>
                      <p className="small mb-0 text-muted mt-1">Klik untuk upload foto</p>
                    </div>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Pesan</Form.Label>
                <textarea className="search-input ps-3 py-2" rows="3" placeholder="Pesan testimoni..."></textarea>
              </Form.Group>

              <Button className="btn-rs-primary w-100 py-2 border-0 shadow-sm" style={{ backgroundColor: '#F97316', borderRadius: '10px' }}>
                <i className="bi bi-save-fill me-2"></i>Simpan Data Alumni
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR ALUMNI DENGAN SEARCH */}
        <Col lg={8}>
          <div className="card-premium h-auto shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Koleksi Testimoni Alumni</h6>
              <div className="search-wrapper" style={{ width: '220px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari alumni..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>

            <div className="custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredAlumni.map((item) => (
                  <Col md={12} key={item.id}>
                    <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '12px' }}>
                      <Row className="g-0">
                        <Col md={4}>
                          <img 
                            src={item.foto} 
                            className="img-fluid h-100" 
                            style={{ objectFit: 'cover', minHeight: '150px' }} 
                            alt={item.nama} 
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-bold text-dark mb-0">{item.nama}</h6>
                                <small className="text-muted d-block mb-2">{item.universitas}</small>
                                <div className="p-2 rounded-3 mb-2" style={{ backgroundColor: '#fff7ed', borderLeft: '3px solid #F97316' }}>
                                  <span className="small fw-bold text-dark">
                                    Nilai UTBK: <span style={{ color: '#F97316' }}>{item.nilaiUtbk}</span>
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex gap-1">
                                <Button variant="light" className="btn-sm text-primary" onClick={() => startEdit(item)}>
                                  <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button variant="light" className="btn-sm text-danger" style={{ backgroundColor: '#fff1f2' }} onClick={() => deleteAlumni(item.id)}>
                                  <i className="bi bi-trash3-fill"></i>
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted small italic mb-0">"{item.pesan}"</p>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <EditTestimoni2Modal show={showEditModal} handleClose={closeEditModal} alumniData={selectedAlumni} />
    </AdminLayout>
  );
};

export default Testimoni2;