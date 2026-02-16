import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useProgramLogic } from './useProgramLogic';
import EditProgramModal from './EditProgramModal';

const Program = () => {
  const { 
    searchTerm, setSearchTerm, filteredPrograms, 
    deleteProgram, startEdit, showEditModal, 
    selectedProgram, closeEditModal 
  } = useProgramLogic();

  return (
    <AdminLayout title="Manajemen Program">
      <Row className="g-4">
        <Col lg={4}>
          <div className="card-premium sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-plus-square-fill me-2" style={{ color: '#F97316' }}></i>Tambah Program Baru
            </h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori</Form.Label>
                <Form.Select className="search-input ps-3">
                  <option>Pilih Kategori</option>
                  <option>Bimbel</option>
                  <option>Kursus</option>
                  <option>Private</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Judul..." />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto Thumbnail</Form.Label>
                <div className="upload-box">
                  <input type="file" accept="image/*" className="d-none" id="upload-prog" />
                  <label htmlFor="upload-prog" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3 bg-light-orange" style={{ cursor: 'pointer', border: '2px dashed #F97316' }}>
                      <i className="bi bi-image text-rs-orange fs-4" style={{ color: '#F97316' }}></i>
                      <p className="small mb-0 text-muted mt-1">Klik untuk upload foto</p>
                    </div>
                  </label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Deskripsi</Form.Label>
                <textarea className="search-input ps-3 py-2" rows="3" placeholder="Deskripsi..."></textarea>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Harga (Rp)</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="1.500.000" />
              </Form.Group>
              <Button className="btn-rs-primary w-100 py-2 border-0" style={{ backgroundColor: '#F97316' }}>Simpan Program</Button>
            </Form>
          </div>
        </Col>

        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Daftar Program Bimbelku</h6>
              <div className="search-wrapper" style={{ width: '220px' }}>
                <i className="bi bi-search"></i>
                <input type="text" className="search-input" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredPrograms.map((prog) => (
                  <Col md={6} key={prog.id}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px' }}>
                      <div className="position-relative">
                        <img src={prog.thumbnail} className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt={prog.judul} />
                        <span className="position-absolute top-0 start-0 m-2 badge" style={{ backgroundColor: '#F97316' }}>{prog.kategori}</span>
                      </div>
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-dark mb-0 pe-2" style={{ fontSize: '0.9rem' }}>{prog.judul}</h6>
                          <span className="fw-bold small" style={{ color: '#F97316' }}>Rp {prog.harga}</span>
                        </div>
                        <p className="text-muted small mb-3" style={{ height: '40px', overflow: 'hidden' }}>{prog.deskripsi}</p>

                        <div className="d-flex gap-2 border-top pt-2">
                        <Button 
                          variant="light" 
                          className="btn-sm flex-grow-1 text-primary fw-bold" 
                          style={{ borderRadius: '5px', fontSize: '0.75rem' }}
                          onClick={() => startEdit(prog)}
                        >
                          <i className="bi bi-pencil-square me-1"></i> Edit
                        </Button>
                        <Button variant="light" className="btn-sm d-flex align-items-center justify-content-center" style={{ 
                            borderRadius: '5px', 
                            backgroundColor: '#fff1f2', 
                            border: 'none',
                            width: '32px', 
                            height: '32px'
                          }} 
                          onClick={() => deleteProgram(prog.id)}
                        >
                          <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '0.9rem' }}></i>
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

      <EditProgramModal show={showEditModal} handleClose={closeEditModal} programData={selectedProgram} />
    </AdminLayout>
  );
};

export default Program;