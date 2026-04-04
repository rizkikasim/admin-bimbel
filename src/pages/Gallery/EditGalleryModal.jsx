import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditGalleryModal = ({ show, handleClose, itemData, formData, categories, onChange, onFileChange, selectedFileName, onSave }) => {
  if (!itemData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">Edit Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Judul Foto</Form.Label>
            <Form.Control 
              type="text" 
              value={formData?.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className="py-2"
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Kategori</Form.Label>
            <Form.Select
              value={formData?.category_id || ''}
              onChange={(e) => onChange('category_id', e.target.value)}
              className="py-2"
              style={{ borderRadius: '8px' }}
            >
              <option value="">Pilih kategori</option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>{item.category}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Deskripsi Singkat</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={formData?.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              style={{ borderRadius: '8px', resize: 'none' }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold text-muted">Ganti Foto</Form.Label>
            <div className="p-2 border rounded-3 bg-light">
              <Form.Control 
                type="file" 
                accept="image/*" 
                size="sm"
                className="border-0 bg-transparent"
                onChange={(e) => {
                  onFileChange(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </div>
            {selectedFileName && (
              <Form.Text className="text-success d-block" style={{ fontSize: '0.7rem' }}>
                File terpilih: {selectedFileName}
              </Form.Text>
            )}
            <Form.Text className="text-muted" style={{ fontSize: '0.7rem' }}>
              Kosongkan jika tidak ingin mengubah foto. Gambar baru akan di-crop 4:3 landscape.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={handleClose} className="fw-bold px-4">Batal</Button>
        <Button 
          style={{ backgroundColor: '#F97316', border: 'none' }} 
          className="fw-bold px-4 text-white"
          onClick={onSave}
        >
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGalleryModal;