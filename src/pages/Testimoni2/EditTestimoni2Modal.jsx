import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditTestimoni2Modal = ({ show, handleClose, alumniData }) => {
  if (!alumniData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Testimoni Alumni</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Nama Alumni</Form.Label>
                <Form.Control type="text" defaultValue={alumniData.nama} className="py-2" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Universitas</Form.Label>
                <Form.Control type="text" defaultValue={alumniData.universitas} className="py-2" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Nilai UTBK</Form.Label>
                <Form.Control type="number" defaultValue={alumniData.nilaiUtbk} className="py-2" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Ganti Foto</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Pesan Testimoni</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={alumniData.pesan} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={handleClose} className="fw-bold px-4">Batal</Button>
        <Button style={{ backgroundColor: '#F97316', border: 'none' }} className="fw-bold px-4 text-white" onClick={handleClose}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTestimoni2Modal;