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
        {/* KOLOM KIRI: FORM INPUT PROGRAM */}
        <Col lg={4}>
          <div className="card-premium sticky-top shadow-sm border-0" style={{ top: '20px', zIndex: 10, borderRadius: '15px' }}>
            <h6 className="fw-bold mb-3 d-flex align-items-center">
              <i className="bi bi-plus-circle-fill me-2" style={{ color: '#F97316' }}></i>
              Tambah Program Baru
            </h6>
            <Form>
              {/* INPUT KATEGORI - SUDAH DITAMBAHKAN */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori Program</Form.Label>
                <Form.Select className="search-input ps-3" style={{ borderRadius: '8px' }}>
                  <option value="">Pilih Kategori</option>
                  <option value="Bimbel">Bimbel</option>
                  <option value="Kursus">Kursus</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="Contoh: Mathematics Intensive" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Biaya Pendaftaran (Rp)</Form.Label>
                <input type="text" className="search-input ps-3" placeholder="300.000" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto Thumbnail</Form.Label>
                <div className="upload-box">
                  <input type="file" accept="image/*" className="d-none" id="upload-prog" />
                  <label htmlFor="upload-prog" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3" 
                         style={{ cursor: 'pointer', border: '2px dashed #F97316', backgroundColor: '#fff7ed' }}>
                      <i className="bi bi-cloud-arrow-up-fill fs-4" style={{ color: '#F97316' }}></i>
                      <p className="small mb-0 text-muted mt-1">Klik untuk upload foto</p>
                    </div>
                  </label>
                </div>
              </Form.Group>

              {/* SETTING HARGA PER GRADE */}
              <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="small fw-bold text-dark mb-3">Setting Harga per Grade</div>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold text-muted mb-1">Grade I-III (Rp)</Form.Label>
                  <input type="text" className="search-input ps-3 bg-white" placeholder="1.050.000" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold text-muted mb-1">Grade IV-VII (Rp)</Form.Label>
                  <input type="text" className="search-input ps-3 bg-white" placeholder="1.200.000" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold text-muted mb-1">Grade VIII-IX (Rp)</Form.Label>
                  <input type="text" className="search-input ps-3 bg-white" placeholder="1.250.000" />
                </Form.Group>
                <Form.Group className="mb-0">
                  <Form.Label className="small fw-bold text-muted mb-1">Grade X–XI (Rp)</Form.Label>
                  <input type="text" className="search-input ps-3 bg-white" placeholder="1.400.000" />
                </Form.Group>
              </div>

              <Button className="btn-rs-primary w-100 py-2 border-0 shadow-sm" style={{ backgroundColor: '#F97316', borderRadius: '10px' }}>
                <i className="bi bi-save-fill me-2"></i>Simpan Program
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: LIST PROGRAM (2 CARD BERJEJER) */}
        <Col lg={8}>
          <div className="card-premium h-auto shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Daftar Program Bimbel</h6>
              <div className="search-wrapper" style={{ width: '250px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari program..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>

            <div className="custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredPrograms.map((prog) => (
                  <Col md={6} key={prog.id}>
                    <Card className="border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: '15px' }}>
                      <div className="position-relative">
                        <img src={prog.thumbnail} className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt={prog.judul} />
                        <div className="position-absolute top-0 end-0 m-2">
                          <span className="badge bg-white text-dark shadow-sm py-2 px-3" style={{ borderRadius: '10px', fontSize: '0.65rem', border: '1px solid #f1f5f9' }}>
                            {prog.kategori || 'Bimbel'}
                          </span>
                        </div>
                      </div>
                      
                      <Card.Body className="p-3 d-flex flex-column">
                        <h6 className="fw-bold text-dark mb-1">{prog.judul}</h6>
                        <p className="text-muted mb-3" style={{ fontSize: '0.75rem' }}>{prog.deskripsi}</p>

                        <div className="p-2 rounded-3 mb-3 text-center" style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
                          <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Biaya Pendaftaran</small>
                          <span className="fw-bold" style={{ color: '#F97316', fontSize: '1rem' }}>Rp {prog.biayaPendaftaran}</span>
                        </div>

                        <div className="flex-grow-1 mb-3">
                          {prog.grades && prog.grades.map((item, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom border-light">
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{item.grade}</span>
                              <span className="fw-bold text-dark" style={{ fontSize: '0.75rem' }}>Rp {item.harga}</span>
                            </div>
                          ))}
                        </div>

                        <div className="d-flex gap-2 mt-auto pt-2">
                          <Button 
                            variant="light" 
                            className="btn-sm flex-grow-1 text-primary fw-bold" 
                            style={{ borderRadius: '10px', height: '38px' }} 
                            onClick={() => startEdit(prog)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="light" 
                            className="btn-sm d-flex align-items-center justify-content-center" 
                            style={{ backgroundColor: '#fff1f2', width: '38px', height: '38px', borderRadius: '10px', border: 'none' }} 
                            onClick={() => deleteProgram(prog.id)}
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

      <EditProgramModal show={showEditModal} handleClose={closeEditModal} programData={selectedProgram} />
    </AdminLayout>
  );
};

export default Program;