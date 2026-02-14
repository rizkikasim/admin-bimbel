import React from 'react';
import { Table, Badge, Row, Col, Button } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import paymentData from '../data/paymentData.json';

const Payment = () => {
  // Fungsi untuk menentukan warna status transaksi
  const getStateBadge = (state) => {
    switch (state) {
      case 'Success': return <Badge bg="success" className="fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Success</Badge>;
      case 'Pending': return <Badge bg="warning" className="text-dark fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Pending</Badge>;
      case 'Failed': return <Badge bg="danger" className="fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Failed</Badge>;
      default: return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout title="Manajemen Pembayaran">
      {/* RINGKASAN TRANSAKSI */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <div className="card-premium d-flex align-items-center">
            <div className="bg-light-orange p-3 rounded-circle me-3">
              <i className="bi bi-wallet2 text-rs-orange fs-4"></i>
            </div>
            <div>
              <small className="text-muted d-block small fw-bold">TOTAL PENDAPATAN</small>
              <h4 className="fw-bold mb-0">Rp 12.500.000</h4>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="card-premium d-flex align-items-center">
            <div className="bg-light-orange p-3 rounded-circle me-3">
              <i className="bi bi-hourglass-split text-rs-orange fs-4"></i>
            </div>
            <div>
              <small className="text-muted d-block small fw-bold">MENUNGGU KONFIRMASI</small>
              <h4 className="fw-bold mb-0">5 Transaksi</h4>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="card-premium d-flex align-items-center">
            <div className="bg-light-orange p-3 rounded-circle me-3">
              <i className="bi bi-shield-check text-rs-orange fs-4"></i>
            </div>
            <div>
              <small className="text-muted d-block small fw-bold">METODE AKTIF</small>
              <h4 className="fw-bold mb-0">Midtrans Gateway</h4>
            </div>
          </div>
        </Col>
      </Row>

      {/* TABEL PAYMENT SESUAI ERD */}
      <div className="card-premium animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold mb-0 text-dark">Riwayat Pembayaran Midtrans</h6>
          <Button variant="outline-primary" className="btn-sm px-3" style={{ borderRadius: '5px' }}>
            <i className="bi bi-arrow-clockwise me-2"></i>Sync Data
          </Button>
        </div>

        <div className="table-responsive">
          <Table hover className="align-middle custom-table border-0">
            <thead>
              <tr>
                <th className="ps-3">ID Midtrans</th>
                <th>Siswa</th>
                <th>Jumlah Bayar (Rp)</th>
                <th>Status (State)</th>
                <th>Waktu (Timestamp)</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((item) => (
                <tr key={item.id}>
                  <td className="ps-3 fw-bold text-rs-orange" style={{ fontSize: '0.8rem' }}>
                    {item.id_midtrans}
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{item.nama_siswa}</div>
                  </td>
                  <td>
                    <div className="fw-bold" style={{ color: '#334155' }}>Rp {item.payment}</div>
                  </td>
                  <td>{getStateBadge(item.state)}</td>
                  <td className="text-muted small">
                    <i className="bi bi-calendar3 me-2"></i>{item.timestamp}
                  </td>
                  <td className="text-center">
                    <Button variant="light" size="sm" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>
                      <i className="bi bi-receipt me-1"></i> Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Payment;