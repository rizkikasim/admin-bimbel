import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditProgramModal = ({
  show,
  handleClose,
  isEditing,
  isSubmitting,
  categories,
  formData,
  onChange,
  onSubProductChange,
  onAddSubProduct,
  onRemoveSubProduct,
  onPickThumbnail,
  selectedThumbnailName,
  modalError,
  onSave,
}) => {

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">
          {isEditing ? 'Edit Detail Program' : 'Tambah Program Baru'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        {modalError && (
          <div className="alert alert-danger py-2 small" role="alert">
            {modalError}
          </div>
        )}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori Program</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => onChange('category', e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  {(categories || []).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Program</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.product_parent_name}
                  onChange={(e) => onChange('product_parent_name', e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Biaya Pendaftaran (Rp)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.registration_price}
                  onChange={(e) => onChange('registration_price', e.target.value)}
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
                  value={formData.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  style={{ borderRadius: '8px', resize: 'none' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted d-block">Status Program</Form.Label>
                <Form.Check
                  type="switch"
                  id="program-visible-switch"
                  label={formData.is_visible ? 'Published' : 'Draft'}
                  checked={Boolean(formData.is_visible)}
                  onChange={(e) => onChange('is_visible', e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="small fw-bold text-dark">Sub Program & Harga</div>
              <Button type="button" variant="outline-secondary" size="sm" onClick={onAddSubProduct}>
                + Tambah Sub Program
              </Button>
            </div>

            {(formData.sub_products || []).map((item, index) => (
              <div key={index} className="border rounded p-2 mb-2 bg-white">
                <Row className="g-2 align-items-end">
                  <Col md={5}>
                    <Form.Label className="small text-muted mb-1">Nama Sub Program</Form.Label>
                    <Form.Control
                      size="sm"
                      value={item.product_name}
                      onChange={(e) => onSubProductChange(index, 'product_name', e.target.value)}
                      placeholder="Contoh: Kelas 7"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label className="small text-muted mb-1">Harga (Rp)</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => onSubProductChange(index, 'price', e.target.value)}
                      placeholder="850000"
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      type="button"
                      variant="outline-danger"
                      size="sm"
                      className="w-100"
                      onClick={() => onRemoveSubProduct(index)}
                      disabled={(formData.sub_products || []).length <= 1}
                    >
                      Hapus
                    </Button>
                  </Col>
                </Row>

                <Form.Group className="mt-2">
                  <Form.Label className="small text-muted mb-1">Deskripsi Sub Program (opsional)</Form.Label>
                  <Form.Control
                    size="sm"
                    value={item.description}
                    onChange={(e) => onSubProductChange(index, 'description', e.target.value)}
                    placeholder="Keterangan tambahan"
                  />
                </Form.Group>
              </div>
            ))}
          </div>

          <Form.Group className="mb-2">
            <Form.Label className="small fw-bold text-muted">Thumbnail Program (Crop 4:3)</Form.Label>
            <div className="p-2 border rounded-3 bg-light">
              <Form.Control
                type="file"
                accept="image/*"
                size="sm"
                className="border-0 bg-transparent"
                onChange={(e) => {
                  onPickThumbnail(e.target.files?.[0] || null);
                  e.target.value = '';
                }}
              />
            </div>
            {selectedThumbnailName && <small className="text-success">File terpilih: {selectedThumbnailName}</small>}
          </Form.Group>

          <div className="d-none">
            <button type="submit">hidden submit</button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={handleClose} className="fw-bold px-4">
          Batal
        </Button>
        <Button 
          style={{ backgroundColor: '#F97316', border: 'none' }} 
          className="fw-bold px-4 text-white"
          onClick={onSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Simpan Program'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProgramModal;