import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { useVideoLogic } from './useVideoLogic';
import EditVideoModal from './EditVideoModal';

const VideoPembelajaran = () => {
  const { 
    searchTerm, setSearchTerm, filteredVideos,
    isLoading, error,
    form, handleFormChange, addVideo,
    editForm, handleEditFormChange, updateVideo,
    deleteVideo, startEdit, showEditModal, 
    selectedVideo, closeEditModal 
  } = useVideoLogic();

  const onSubmitVideo = async (e) => {
    e.preventDefault();
    await addVideo();
  };

  return (
    <AdminLayout title="Video Pembelajaran">
      <Row className="g-4">
        {/* KOLOM KIRI: INPUT FORM (KEMBALI LENGKAP) */}
        <Col lg={4}>
          <div className="card-premium animate__animated animate__fadeIn sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-play-circle-fill me-2" style={{color: '#F97316'}}></i>Input Video Baru
            </h6>
            <Form onSubmit={onSubmitVideo}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Title Video</Form.Label>
                <input
                  type="text"
                  className="search-input ps-3"
                  placeholder="Contoh: Belajar Aljabar"
                  value={form.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Description</Form.Label>
                <textarea
                  className="search-input ps-3 py-2"
                  rows="4"
                  placeholder="Masukkan deskripsi video..."
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                ></textarea>
              </Form.Group>

              {/* KOLOM URL YANG SEBELUMNYA HILANG SUDAH KEMBALI */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Link YouTube</Form.Label>
                <input
                  type="text"
                  className="search-input ps-3"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={form.url}
                  onChange={(e) => handleFormChange('url', e.target.value)}
                />
              </Form.Group>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <Button type="submit" className="btn-rs-primary w-100 py-2 border-0" style={{backgroundColor: '#F97316', borderRadius: '5px'}}>
                <i className="bi bi-cloud-upload-fill me-2"></i>Publish Video
              </Button>
            </Form>
          </div>
        </Col>

        {/* KOLOM KANAN: LIST VIDEO */}
        <Col lg={8}>
          <div className="card-premium h-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Koleksi Video Belajar</h6>
              <div className="search-wrapper" style={{ width: '250px' }}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari video..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div style={{ maxHeight: '75vh', overflowY: 'auto', paddingRight: '10px' }}>
              <Row className="g-3">
                {filteredVideos.map((vid) => (
                  <Col md={12} key={vid.id}>
                    <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '10px' }}>
                      <Card.Body className="p-3">
                        <div className="d-flex gap-3 align-items-start">
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            style={{ width: '220px', height: '124px', objectFit: 'cover', borderRadius: '8px' }}
                          />

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                              <div>
                                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>{vid.title}</h6>
                                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>{vid.description || '-'}</p>
                              </div>

                              <div className="d-flex gap-2">
                                <Button variant="light" className="btn-sm text-primary fw-bold" onClick={() => startEdit(vid)}>
                                  <i className="bi bi-pencil-square me-1"></i> Edit
                                </Button>
                                <Button variant="light" className="btn-sm text-danger" style={{ backgroundColor: '#fff1f2' }} onClick={() => deleteVideo(vid.id)}>
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {!isLoading && filteredVideos.length === 0 && (
                  <Col md={12}>
                    <div className="text-center py-4 text-muted">Belum ada video untuk ditampilkan.</div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* MODAL POP-UP EDIT */}
      <EditVideoModal 
        show={showEditModal} 
        handleClose={closeEditModal} 
        videoData={selectedVideo}
        formData={editForm}
        onChange={handleEditFormChange}
        handleSave={updateVideo}
      />
    </AdminLayout>
  );
};

export default VideoPembelajaran;