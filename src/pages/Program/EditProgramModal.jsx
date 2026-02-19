import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditProgramModal = ({ show, handleClose, programData }) => {
  if (!programData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Detail Program</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Row>
            {/* INPUT KATEGORI & JUDUL */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori Program</Form.Label>
                <Form.Select 
                  defaultValue={programData.kategori} 
                  style={{ borderRadius: '8px' }}
                >
                  <option value="Bimbel">Bimbel</option>
                  <option value="Kursus">Kursus</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue={programData.judul} 
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* INPUT BIAYA DAFTAR & DESKRIPSI */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Biaya Pendaftaran (Rp)</Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue={programData.biayaPendaftaran} 
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Deskripsi Singkat</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={1} 
                  defaultValue={programData.deskripsi} 
                  style={{ borderRadius: '8px', resize: 'none' }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* SECTION SETTING HARGA PER GRADE */}
          <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div className="small fw-bold text-dark mb-3">Update Harga per Grade</div>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="small text-muted mb-1">Grade I-III (Rp)</Form.Label>
                <Form.Control type="text" defaultValue={programData.grades?.[0]?.harga} size="sm" />
              </Col>
              <Col md={6}>
                <Form.Label className="small text-muted mb-1">Grade IV-VII (Rp)</Form.Label>
                <Form.Control type="text" defaultValue={programData.grades?.[1]?.harga} size="sm" />
              </Col>
              <Col md={6}>
                <Form.Label className="small text-muted mb-1">Grade VIII-IX (Rp)</Form.Label>
                <Form.Control type="text" defaultValue={programData.grades?.[2]?.harga} size="sm" />
              </Col>
              <Col md={6}>
                <Form.Label className="small text-muted mb-1">Grade X–XI (Rp)</Form.Label>
                <Form.Control type="text" defaultValue={programData.grades?.[3]?.harga} size="sm" />
              </Col>
            </Row>
          </div>

          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold text-muted">Ganti Thumbnail</Form.Label>
            <div className="p-2 border rounded-3 bg-light">
              <Form.Control 
                type="file" 
                accept="image/*" 
                size="sm"
                className="border-0 bg-transparent"
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={handleClose} className="fw-bold px-4">
          Batal
        </Button>
        <Button 
          style={{ backgroundColor: '#F97316', border: 'none' }} 
          className="fw-bold px-4 text-white"
          onClick={handleClose}
        >
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProgramModal;