import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';
import { getCroppedImageFile } from '../utils/cropImage';

const DEFAULT_ASPECT = 4 / 3;

export default function ImageCropModal({
  show,
  title,
  imageSrc,
  onClose,
  onApply,
  aspect = DEFAULT_ASPECT,
  helperText,
  fileNamePrefix = 'gallery',
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!show) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
      setIsProcessing(false);
    }
  }, [show]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImageFile(
        imageSrc,
        croppedAreaPixels,
        rotation,
        `${fileNamePrefix}-${Date.now()}.jpg`
      );
      onApply(croppedFile);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">{title || 'Crop Gambar'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="small text-muted mb-2">
          {helperText || 'Sesuaikan area crop sebelum menyimpan gambar.'}
        </p>

        <div
          className="position-relative rounded"
          style={{ width: '100%', height: '360px', backgroundColor: '#0f172a' }}
        >
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="mt-3">
          <Form.Label className="small fw-bold text-muted mb-1">Zoom</Form.Label>
          <Form.Range
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className="mt-2">
          <Form.Label className="small fw-bold text-muted mb-1">Rotate</Form.Label>
          <Form.Range
            min={-180}
            max={180}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={onClose} className="fw-bold px-4" disabled={isProcessing}>
          Batal
        </Button>
        <Button
          onClick={handleApply}
          className="fw-bold px-4 text-white"
          style={{ backgroundColor: '#F97316', border: 'none' }}
          disabled={isProcessing || !croppedAreaPixels}
        >
          {isProcessing ? 'Memproses...' : 'Terapkan Crop'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
