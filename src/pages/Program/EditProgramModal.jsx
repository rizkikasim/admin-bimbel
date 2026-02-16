import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProgramModal = ({ show, handleClose, programData }) => {
  if (!programData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Program</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={programData.judul} 
              className="py-2"
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Harga (Rp)</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={programData.harga} 
              className="py-2"
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Deskripsi</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              defaultValue={programData.deskripsi} 
              style={{ borderRadius: '8px', resize: 'none' }}
            />
          </Form.Group>

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
            <Form.Text className="text-muted" style={{ fontSize: '0.7rem' }}>
              Kosongkan jika tidak ingin mengubah gambar.
            </Form.Text>
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