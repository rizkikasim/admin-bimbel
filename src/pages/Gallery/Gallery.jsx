import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useGalleryLogic } from './useGalleryLogic';
import EditGalleryModal from './EditGalleryModal';
import ImageCropModal from '../../components/ImageCropModal';

const Gallery = () => {
  const { 
    isLoading,
    error,
    categories,
    searchTerm, setSearchTerm, filteredGalleries, 
    createForm,
    newCategoryName,
    createFile,
    handleCreateChange,
    handleCreateFileChange,
    setNewCategoryName,
    createCategory,
    createGallery,
    deleteItem, startEdit, showEditModal, 
    selectedItem, closeEditModal,
    editForm,
    editFile,
    handleEditChange,
    handleEditFileChange,
    saveEdit,
  } = useGalleryLogic();

  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: '',
    target: null,
  });

  const openCropModal = (file, target) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({
        show: true,
        imageSrc: reader.result,
        target,
      });
    };
    reader.readAsDataURL(file);
  };

  const closeCropModal = () => {
    setCropModal({
      show: false,
      imageSrc: '',
      target: null,
    });
  };

  const handleCropApply = (croppedFile) => {
    if (cropModal.target === 'create') {
      handleCreateFileChange(croppedFile);
    }

    if (cropModal.target === 'edit') {
      handleEditFileChange(croppedFile);
    }

    closeCropModal();
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    await createGallery();
  };

  return (
    <AdminLayout title="Manajemen Gallery">
      <Row className="g-4">
        {/* KOLOM KIRI: FORM INPUT GALLERY (STICKY) */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-images me-2" style={{ color: '#F97316' }}></i>Upload Foto Baru
            </h6>
            <Form onSubmit={onSubmitCreate}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Judul Foto</Form.Label>
                <input
                  type="text"
                  className="search-input ps-3"
                  placeholder="Contoh: Kegiatan Belajar Bersama"
                  style={{ borderRadius: '5px' }}
                  value={createForm.title}
                  onChange={(e) => handleCreateChange('title', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Kategori</Form.Label>
                <Form.Select
                  className="search-input ps-3"
                  style={{ borderRadius: '5px' }}
                  value={createForm.category_id}
                  onChange={(e) => handleCreateChange('category_id', e.target.value)}
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.category}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Tambah Kategori Baru</Form.Label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="search-input ps-3"
                    placeholder="Contoh: Events"
                    style={{ borderRadius: '5px' }}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button type="button" variant="light" className="border fw-bold" onClick={createCategory}>Tambah</Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Upload Foto</Form.Label>
                <div className="upload-box">
                  <label htmlFor="upload-gallery-photo" className="w-100 mb-0">
                    <div className="text-center p-3 border-dashed rounded-3 bg-light-orange" 
                         style={{ cursor: 'pointer', border: '2px dashed #F97316', borderRadius: '5px' }}>
                      <i className="bi bi-cloud-arrow-up-fill text-rs-orange fs-4" style={{ color: '#F97316' }}></i>
                      <p className="small mb-0 text-muted mt-1">
                        {createFile ? createFile.name : 'Klik untuk pilih foto'}
                      </p>
                    </div>
                  </label>
                </div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="d-none"
                  id="upload-gallery-photo"
                  onChange={(e) => {
                    openCropModal(e.target.files?.[0], 'create');
                    e.target.value = '';
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Deskripsi Singkat</Form.Label>
                <textarea 
                  className="search-input ps-3 py-2" 
                  rows="4" 
                  placeholder="Ceritakan momen dalam foto ini..."
                  style={{ borderRadius: '5px' }}
                  value={createForm.description}
                  onChange={(e) => handleCreateChange('description', e.target.value)}
                ></textarea>
              </Form.Group>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <Button type="submit" className="btn-rs-primary w-100 py-2 border-0" style={{ backgroundColor: '#F97316', borderRadius: '5px' }}>
                <i className="bi bi-plus-circle-fill me-2"></i>Tambah ke Gallery
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: DAFTAR GALLERY (SCROLLABLE AREA) */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Koleksi Foto Bimbelku</h6>
              <div className="search-wrapper" style={{ width: '250px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari foto..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredGalleries.map((item) => (
                  <Col md={12} key={item.id}>
                    <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '10px' }}>
                      <Card.Body className="p-3">
                        <div className="d-flex gap-3 align-items-start">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '220px', height: '124px', objectFit: 'cover', borderRadius: '8px' }}
                          />

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                              <div>
                                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>{item.title}</h6>
                                <div className="mb-1">
                                  <span className="badge bg-light text-dark border" style={{ fontSize: '0.68rem' }}>{item.category || '-'}</span>
                                </div>
                                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>{item.description || '-'}</p>
                              </div>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="light"
                                  className="btn-sm text-primary fw-bold"
                                  style={{ fontSize: '0.75rem' }}
                                  onClick={() => startEdit(item)}
                                >
                                  <i className="bi bi-pencil-square me-1"></i> Edit
                                </Button>
                                <Button
                                  variant="light"
                                  className="btn-sm d-flex align-items-center justify-content-center"
                                  style={{
                                    borderRadius: '5px',
                                    backgroundColor: '#fff1f2',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px'
                                  }}
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '0.9rem' }}></i>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {!isLoading && filteredGalleries.length === 0 && (
                  <Col md={12}>
                    <div className="text-center py-4 text-muted">Belum ada data gallery.</div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal Edit Gallery */}
      <EditGalleryModal 
        show={showEditModal} 
        handleClose={closeEditModal} 
        itemData={selectedItem}
        formData={editForm}
        categories={categories}
        onChange={handleEditChange}
        onFileChange={(file) => openCropModal(file, 'edit')}
        selectedFileName={editFile?.name}
        onSave={saveEdit}
      />

      <ImageCropModal
        show={cropModal.show}
        title={cropModal.target === 'edit' ? 'Crop Foto Gallery (Edit)' : 'Crop Foto Gallery'}
        imageSrc={cropModal.imageSrc}
        onClose={closeCropModal}
        onApply={handleCropApply}
      />
    </AdminLayout>
  );
};

export default Gallery;