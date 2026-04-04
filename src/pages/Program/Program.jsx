import React, { useState } from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useProgramLogic } from './useProgramLogic';
import EditProgramModal from './EditProgramModal';
import ImageCropModal from '../../components/ImageCropModal';

const Program = () => {
  const {
    categories,
    searchTerm,
    setSearchTerm,
    filteredPrograms,
    isLoading,
    isSubmitting,
    isEditing,
    pageError,
    modalError,
    showModal,
    formData,
    openCreateModal,
    openEditModal,
    closeModal,
    handleFormChange,
    handleSubProductChange,
    addSubProductRow,
    removeSubProductRow,
    setThumbnailFile,
    submitProgram,
  } = useProgramLogic();

  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: '',
  });

  const openCropModal = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({
        show: true,
        imageSrc: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const closeCropModal = () => {
    setCropModal({
      show: false,
      imageSrc: '',
    });
  };

  const handleCropApply = (croppedFile) => {
    setThumbnailFile(croppedFile);
    closeCropModal();
  };

  return (
    <AdminLayout title="Manajemen Program">
      <div className="card-premium h-auto shadow-sm border-0" style={{ borderRadius: '15px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
          <h6 className="fw-bold mb-0">Daftar Program</h6>

          <div className="d-flex gap-2 align-items-center flex-wrap">
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

            <Button
              className="btn-rs-primary border-0"
              style={{ backgroundColor: '#F97316', borderRadius: '10px' }}
              onClick={openCreateModal}
            >
              <i className="bi bi-plus-circle-fill me-2"></i>Tambah Program
            </Button>
          </div>
        </div>

        {pageError && <div className="alert alert-warning py-2 small">{pageError}</div>}

        <div className="custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '10px' }}>
          <Row className="g-3">
            {filteredPrograms.map((prog) => (
              <Col md={12} key={prog.id}>
                <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '12px' }}>
                  <Card.Body className="p-3">
                    <div className="d-flex gap-3 align-items-start">
                      <img
                        src={prog.thumbnail}
                        alt={prog.product_parent_name || prog.title}
                        style={{ width: '220px', height: '124px', objectFit: 'cover', borderRadius: '8px' }}
                      />

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                          <div>
                            <h6 className="fw-bold text-dark mb-1">{prog.product_parent_name || prog.title}</h6>
                            <div className="d-flex gap-2 flex-wrap mb-2">
                              <Badge bg="light" text="dark" className="border">{prog.category}</Badge>
                              <Badge bg={prog.is_visible ? 'success' : 'secondary'}>{prog.is_visible ? 'Published' : 'Draft'}</Badge>
                            </div>
                            <p className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>{prog.description || '-'}</p>
                          </div>

                          <Button
                            variant="light"
                            className="btn-sm text-primary fw-bold"
                            style={{ borderRadius: '10px' }}
                            onClick={() => openEditModal(prog)}
                          >
                            Edit
                          </Button>
                        </div>

                        <div className="p-2 rounded-3 mb-2 d-inline-block" style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
                          <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Biaya Pendaftaran</small>
                          <span className="fw-bold" style={{ color: '#F97316', fontSize: '0.95rem' }}>
                            Rp {prog.registration_price_formatted || Number(prog.registration_price || 0).toLocaleString('id-ID')}
                          </span>
                        </div>

                        <div className="mt-2">
                          {Array.isArray(prog.sub_products) && prog.sub_products.map((item) => (
                            <div key={item.id || `${item.product_name}-${item.price}`} className="d-flex justify-content-between align-items-center pb-1 mb-1 border-bottom border-light">
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>{item.product_name}</span>
                              <span className="fw-bold text-dark" style={{ fontSize: '0.78rem' }}>
                                Rp {item.price_formatted || Number(item.price || 0).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {!isLoading && filteredPrograms.length === 0 && (
              <Col md={12}>
                <div className="text-center py-4 text-muted">Belum ada data program.</div>
              </Col>
            )}

            {isLoading && (
              <Col md={12}>
                <div className="text-center py-4 text-muted">Memuat data program...</div>
              </Col>
            )}
          </Row>
        </div>
      </div>

      <EditProgramModal
        show={showModal}
        handleClose={closeModal}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        categories={categories}
        formData={formData}
        onChange={handleFormChange}
        onSubProductChange={handleSubProductChange}
        onAddSubProduct={addSubProductRow}
        onRemoveSubProduct={removeSubProductRow}
        onPickThumbnail={openCropModal}
        selectedThumbnailName={formData.thumbnail?.name}
        modalError={modalError}
        onSave={submitProgram}
      />

      <ImageCropModal
        show={cropModal.show}
        title="Crop Thumbnail Program"
        imageSrc={cropModal.imageSrc}
        onClose={closeCropModal}
        onApply={handleCropApply}
        aspect={4 / 3}
        helperText="Rasio akhir thumbnail program adalah 4:3 landscape."
        fileNamePrefix="program"
      />
    </AdminLayout>
  );
};

export default Program;