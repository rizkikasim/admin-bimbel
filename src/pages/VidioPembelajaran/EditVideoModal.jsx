import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditVideoModal = ({ show, handleClose, videoData, handleSave }) => {
  if (!videoData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Detail Video</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Judul Video</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={videoData.title} 
              className="py-2"
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Deskripsi</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              defaultValue={videoData.description} 
              style={{ borderRadius: '8px', resize: 'none' }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold text-muted">URL Embed</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={videoData.url} 
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={handleClose} className="fw-bold px-4">
          Batal
        </Button>
        <Button 
          style={{ backgroundColor: '#F97316', border: 'none' }} 
          className="fw-bold px-4"
          onClick={handleSave}
        >
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVideoModal;