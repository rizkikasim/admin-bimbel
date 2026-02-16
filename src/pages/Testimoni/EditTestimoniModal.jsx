import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTestimoniModal = ({ show, handleClose, testiData }) => {
  if (!testiData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Testimoni</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Nama Lengkap</Form.Label>
            <Form.Control type="text" defaultValue={testiData.nama} style={{ borderRadius: '8px' }} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Peran / Status</Form.Label>
            <Form.Control type="text" defaultValue={testiData.peran} style={{ borderRadius: '8px' }} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Isi Testimoni</Form.Label>
            <Form.Control as="textarea" rows={4} defaultValue={testiData.pesan} style={{ borderRadius: '8px' }} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold text-muted">Ganti Foto</Form.Label>
            <div className="p-2 border rounded-3 bg-light">
              <Form.Control type="file" accept="image/*" size="sm" className="border-0 bg-transparent" />
            </div>
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

export default EditTestimoniModal; // INI HARUS ADA!