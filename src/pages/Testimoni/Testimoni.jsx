import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useTestimoniLogic } from './useTestimoniLogic';
import EditTestimoniModal from './EditTestimoniModal';

const Testimoni = () => {
  const { 
    searchTerm, setSearchTerm, filteredTestimonis, 
    deleteTesti, startEdit, showEditModal, 
    selectedTesti, closeEditModal 
  } = useTestimoniLogic();

  return (
    <AdminLayout title="Manajemen Testimoni">
      <Row className="g-4">
        {/* KOLOM KIRI: INPUT TESTIMONI (STICKY) */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-chat-quote-fill me-2" style={{ color: '#F97316' }}></i>Tambah Testimoni
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

              <Button className="btn-rs-primary w-100 py-2 border-0" style={{ backgroundColor: '#F97316' }}>
                <i className="bi bi-send-fill me-2"></i>Simpan Testimoni
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR TESTIMONI (SCROLLABLE) */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Preview Testimoni di Website</h6>
              <div className="search-wrapper" style={{ width: '220px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari nama/status..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* AREA SCROLL MANDIRI */}
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredTestimonis.map((item) => (
                  <Col md={6} key={item.id}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px', backgroundColor: '#fff7ed' }}>
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
                            <small style={{ fontSize: '0.75rem', color: '#F97316' }}>{item.peran}</small>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          {[...Array(item.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill text-warning me-1" style={{ fontSize: '0.7rem' }}></i>
                          ))}
                        </div>

                        <p className="text-muted mb-3" style={{ fontSize: '0.8rem', fontStyle: 'italic', lineHeight: '1.5', height: '60px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                          "{item.pesan}"
                        </p>

                        <div className="d-flex gap-2 border-top pt-2">
                          <Button 
                            variant="white" 
                            className="btn-sm bg-white border shadow-sm flex-grow-1 fw-bold" 
                            style={{ fontSize: '0.75rem', borderRadius: '5px', color: '#0d6efd' }}
                            onClick={() => startEdit(item)}
                          >
                             Edit
                          </Button>
                          <Button 
                            variant="white" 
                            className="btn-sm bg-white border shadow-sm d-flex align-items-center justify-content-center" 
                            style={{ borderRadius: '5px', width: '32px', height: '32px' }}
                            onClick={() => deleteTesti(item.id)}
                          >
                            <i className="bi bi-trash3-fill text-danger"></i>
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

      {/* MODAL POP-UP EDIT TESTIMONI */}
      <EditTestimoniModal 
        show={showEditModal} 
        handleClose={closeEditModal} 
        testiData={selectedTesti} 
      />
    </AdminLayout>
  );
};

export default Testimoni;