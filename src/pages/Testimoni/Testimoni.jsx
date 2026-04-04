import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useTestimoniLogic } from './useTestimoniLogic';
import ImageCropModal from '../../components/ImageCropModal';

const Testimoni = () => {
  const {
    students,
    parents,
    products,
    filteredStudents,
    filteredParents,
    searchTerm,
    setSearchTerm,
    isLoading,
    isSubmitting,
    error,
    formType,
    formData,
    editingType,
    editingId,
    handleFormTypeChange,
    handleFormChange,
    submitForm,
    resetForm,
    startEditStudent,
    startEditParent,
    deleteStudent,
    deleteParent,
  } = useTestimoniLogic();

  const fallbackImage = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop';
  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: '',
  });

  const renderStars = (rate = 0) => {
    const totalStars = Math.max(1, Math.min(5, Math.round(rate || 0)));
    return [...Array(totalStars)].map((_, i) => (
      <i key={i} className="bi bi-star-fill text-warning me-1" style={{ fontSize: '0.75rem' }}></i>
    ));
  };

  const getProgramYearLabel = (studentItem) => {
    const yearText = studentItem?.year ? String(studentItem.year) : '-';
    const programName = studentItem?.product_parent?.product_parent_name;
    return programName ? `Program (${programName}) ${yearText}` : `Program ${yearText}`;
  };

  const renderRatingPicker = () => {
    const activeRate = Math.max(1, Math.min(5, Math.round(Number(formData.rate || 5))));

    return (
      <div className="d-flex align-items-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="btn btn-link p-0 border-0 text-decoration-none"
            onClick={() => handleFormChange('rate', String(star))}
            aria-label={`Pilih rating ${star}`}
          >
            <i
              className={`bi ${star <= activeRate ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
              style={{ fontSize: '1.1rem' }}
            ></i>
          </button>
        ))}
        <span className="small text-muted">{activeRate}/5</span>
      </div>
    );
  };

  const isEditing = Boolean(editingId);

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
    handleFormChange('image', croppedFile);
    closeCropModal();
  };

  function getFormTitle() {
    if (!formType) return 'Pilih Tipe Testimoni';

    if (isEditing) {
      return editingType === 'parent' ? 'Edit Testimoni Orang Tua' : 'Edit Testimoni Siswa';
    }

    return formType === 'parent' ? 'Tambah Testimoni Orang Tua' : 'Tambah Testimoni Siswa';
  }

  function getSubmitLabel() {
    if (!formType) return 'Simpan';
    if (isEditing) {
      return formType === 'parent' ? 'Update Orang Tua' : 'Update Siswa';
    }
    return formType === 'parent' ? 'Simpan Orang Tua' : 'Simpan Siswa';
  }

  return (
    <AdminLayout title="Manajemen Testimoni (Siswa & Orang Tua)">
      <Row className="g-4">
        <Col lg={4}>
          <div className="card-premium sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-mortarboard-fill me-2" style={{ color: '#F97316' }}></i>
              {getFormTitle()}
            </h6>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Tipe Testimoni</Form.Label>
                <Form.Select
                  value={formType}
                  onChange={(e) => handleFormTypeChange(e.target.value)}
                >
                  <option value="">Pilih Student / Parent</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </Form.Select>
              </Form.Group>

              {!formType && (
                <div className="alert alert-light border small mb-0">
                  Pilih tipe testimoni terlebih dahulu untuk menampilkan field input.
                </div>
              )}

              {formType && (
                <>
                  {formType === 'student' && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Nama Siswa</Form.Label>
                        <Form.Control
                          value={formData.student_name}
                          onChange={(e) => handleFormChange('student_name', e.target.value)}
                          placeholder="Contoh: Aisyah Putri"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Deskripsi (opsional)</Form.Label>
                        <Form.Control
                          value={formData.description}
                          onChange={(e) => handleFormChange('description', e.target.value)}
                          placeholder="Contoh: Lolos FK UI 2026"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Link ke Testimoni Orang Tua (opsional)</Form.Label>
                        <Form.Select
                          value={formData.id_parent_testimonials}
                          onChange={(e) => handleFormChange('id_parent_testimonials', e.target.value)}
                        >
                          <option value="">Tidak dihubungkan</option>
                          {parents.map((parent) => (
                            <option key={parent.id} value={parent.id}>
                              {parent.parent_name} - {parent.year}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Program Referensi</Form.Label>
                        <Form.Select
                          value={formData.id_product_parent}
                          onChange={(e) => handleFormChange('id_product_parent', e.target.value)}
                        >
                          <option value="">Pilih program (opsional)</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.product_parent_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  {formType === 'parent' && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Nama Orang Tua</Form.Label>
                        <Form.Control
                          value={formData.parent_name}
                          onChange={(e) => handleFormChange('parent_name', e.target.value)}
                          placeholder="Contoh: Ibu Ratna"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Link ke Testimoni Siswa (opsional)</Form.Label>
                        <Form.Select
                          value={formData.id_testimonial_student}
                          onChange={(e) => handleFormChange('id_testimonial_student', e.target.value)}
                        >
                          <option value="">Tidak dihubungkan</option>
                          {students.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.student_name} - {student.year}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  <Row className="g-2">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Tahun</Form.Label>
                        <Form.Control
                          type="number"
                          min="1990"
                          max="2100"
                          value={formData.year}
                          onChange={(e) => handleFormChange('year', e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">Rating</Form.Label>
                        {renderRatingPicker()}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-muted">
                      {formType === 'student' ? 'Foto Siswa' : 'Foto Orang Tua (opsional)'}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        openCropModal(e.target.files?.[0]);
                        e.target.value = '';
                      }}
                    />
                    <small className="text-muted">
                      Foto akan di-crop ke rasio 1:1 sebelum disimpan.
                    </small>
                    {formData.image?.name && (
                      <div className="small text-success mt-1">File terpilih: {formData.image.name}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-muted">Isi Testimoni</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.testimonials}
                      onChange={(e) => handleFormChange('testimonials', e.target.value)}
                      placeholder={formType === 'student' ? 'Tulis pengalaman siswa' : 'Tulis pengalaman orang tua'}
                    />
                  </Form.Group>

                  <Form.Check
                    className="mb-3"
                    type="switch"
                    label="Tampilkan di website"
                    checked={formData.is_visible}
                    onChange={(e) => handleFormChange('is_visible', e.target.checked)}
                  />

                  <div className="d-flex gap-2">
                    <Button
                      type="submit"
                      className="btn-rs-primary flex-grow-1 border-0"
                      style={{ backgroundColor: '#F97316' }}
                      disabled={isSubmitting}
                    >
                      {getSubmitLabel()}
                    </Button>
                    {isEditing && (
                      <Button variant="outline-secondary" onClick={resetForm}>
                        Batal
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Form>
          </div>
        </Col>

        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Preview Testimoni Website</h6>
              <div className="search-wrapper" style={{ width: '220px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari testimoni..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-warning py-2" role="alert">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="text-muted small mb-3">Memuat data testimoni...</div>
            )}

            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
              <h6 className="fw-bold mb-3 text-dark">Testimoni Siswa</h6>
              <Row className="g-3">
                {filteredStudents.map((item) => (
                  <Col md={12} key={item.id}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px', backgroundColor: '#fff7ed' }}>
                      <Card.Body className="p-3">
                        <div className="d-flex gap-3 align-items-start">
                          <img
                            src={item.image || fallbackImage}
                            alt={item.student_name}
                            className="rounded-circle border border-2 border-white shadow-sm"
                            style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                          />

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                              <div>
                                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.95rem' }}>{item.student_name}</h6>
                                <small style={{ fontSize: '0.75rem', color: '#F97316' }}>{getProgramYearLabel(item)}</small>
                              </div>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="white"
                                  className="btn-sm bg-white border shadow-sm fw-bold"
                                  style={{ fontSize: '0.75rem', borderRadius: '5px', color: '#0d6efd' }}
                                  onClick={() => startEditStudent(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="white"
                                  className="btn-sm bg-white border shadow-sm d-flex align-items-center justify-content-center"
                                  style={{ borderRadius: '5px', width: '32px', height: '32px' }}
                                  onClick={() => deleteStudent(item.id)}
                                >
                                  <i className="bi bi-trash3-fill text-danger"></i>
                                </Button>
                              </div>
                            </div>

                            <div className="mb-2 mt-2">
                              {renderStars(item.rate)}
                            </div>

                            <div className="d-flex gap-2 mb-2 flex-wrap">
                              <span className={`badge ${item.is_visible ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                {item.is_visible ? 'Visible' : 'Hidden'}
                              </span>
                              {item.parent?.parent_name && (
                                <span className="badge bg-info-subtle text-info">
                                  Link Parent: {item.parent.parent_name}
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className="small fw-bold text-dark mb-1" style={{ fontSize: '0.78rem' }}>{item.description}</p>
                            )}

                            <p className="text-muted mb-0" style={{ fontSize: '0.82rem', fontStyle: 'italic', lineHeight: '1.55' }}>
                              "{item.testimonials}"
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}

                {!filteredStudents.length && (
                  <Col>
                    <div className="text-muted small">Belum ada testimoni siswa.</div>
                  </Col>
                )}
              </Row>

              <h6 className="fw-bold mb-3 mt-4 text-dark">Testimoni Orang Tua</h6>
              <Row className="g-3">
                {filteredParents.map((item) => (
                  <Col md={12} key={item.id}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px', backgroundColor: '#f8fafc' }}>
                      <Card.Body className="p-3">
                        <div className="d-flex gap-3 align-items-start">
                          <img
                            src={item.image || fallbackImage}
                            alt={item.parent_name}
                            className="rounded-circle border border-2 border-white shadow-sm"
                            style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                          />

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                              <div>
                                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.95rem' }}>{item.parent_name}</h6>
                                <small style={{ fontSize: '0.75rem', color: '#F97316' }}>Orang Tua {item.year}</small>
                              </div>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="white"
                                  className="btn-sm bg-white border shadow-sm fw-bold"
                                  style={{ fontSize: '0.75rem', borderRadius: '5px', color: '#0d6efd' }}
                                  onClick={() => startEditParent(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="white"
                                  className="btn-sm bg-white border shadow-sm d-flex align-items-center justify-content-center"
                                  style={{ borderRadius: '5px', width: '32px', height: '32px' }}
                                  onClick={() => deleteParent(item.id)}
                                >
                                  <i className="bi bi-trash3-fill text-danger"></i>
                                </Button>
                              </div>
                            </div>

                            <div className="mb-2 mt-2">
                              {renderStars(item.rate)}
                            </div>

                            <div className="d-flex gap-2 mb-2 flex-wrap">
                              <span className={`badge ${item.is_visible ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                {item.is_visible ? 'Visible' : 'Hidden'}
                              </span>
                              {item.student?.student_name && (
                                <span className="badge bg-info-subtle text-info">
                                  Link Student: {item.student.student_name}
                                </span>
                              )}
                            </div>

                            <p className="text-muted mb-0" style={{ fontSize: '0.82rem', fontStyle: 'italic', lineHeight: '1.55' }}>
                              "{item.testimonials}"
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}

                {!filteredParents.length && (
                  <Col>
                    <div className="text-muted small">Belum ada testimoni orang tua.</div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <ImageCropModal
        show={cropModal.show}
        title="Crop Foto Testimoni"
        imageSrc={cropModal.imageSrc}
        onClose={closeCropModal}
        onApply={handleCropApply}
        aspect={1}
        helperText="Rasio akhir gambar testimoni adalah 1:1 (persegi)."
        fileNamePrefix="testimonial"
      />
    </AdminLayout>
  );
};

export default Testimoni;