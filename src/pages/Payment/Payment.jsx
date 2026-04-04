import React, { useEffect, useMemo, useState } from 'react';
import { Table, Badge, Row, Col, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { api } from '../../utils/api';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/admin/payments');
      setPayments(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      setError(err.message || 'Gagal memuat data payment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalRevenue = useMemo(
    () =>
      payments
        .filter((item) => String(item.state).toLowerCase() === 'settlement')
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [payments]
  );

  const pendingCount = useMemo(
    () => payments.filter((item) => String(item.state).toLowerCase() === 'pending').length,
    [payments]
  );

  // Fungsi untuk menentukan warna status transaksi
  const getStateBadge = (state) => {
    const normalized = String(state || '').toLowerCase();

    switch (normalized) {
      case 'settlement':
        return <Badge bg="success" className="fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Settlement</Badge>;
      case 'pending':
        return <Badge bg="warning" className="text-dark fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Pending</Badge>;
      case 'failed':
      case 'cancel':
      case 'expire':
      case 'deny':
        return <Badge bg="danger" className="fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>Failed</Badge>;
      default:
        return <Badge bg="secondary" className="fw-medium px-2 py-1" style={{ borderRadius: '5px', fontSize: '0.7rem' }}>{state || 'Unknown'}</Badge>;
    }
  };

  return (
    <AdminLayout title="Manajemen Pembayaran">
      {/* RINGKASAN TRANSAKSI */}
      <Row className="g-3 mb-4">
        <Col md={6}>
          <div className="card-premium d-flex align-items-center">
            <div className="bg-light-orange p-3 rounded-circle me-3">
              <i className="bi bi-wallet2 text-rs-orange fs-4"></i>
            </div>
            <div>
              <small className="text-muted d-block small fw-bold">TOTAL PENDAPATAN</small>
              <h4 className="fw-bold mb-0">Rp {totalRevenue.toLocaleString('id-ID')}</h4>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="card-premium d-flex align-items-center">
            <div className="bg-light-orange p-3 rounded-circle me-3">
              <i className="bi bi-hourglass-split text-rs-orange fs-4"></i>
            </div>
            <div>
              <small className="text-muted d-block small fw-bold">MENUNGGU KONFIRMASI</small>
              <h4 className="fw-bold mb-0">{pendingCount} Transaksi</h4>
            </div>
          </div>
        </Col>
      </Row>

      {/* TABEL PAYMENT SESUAI ERD */}
      <div className="card-premium animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold mb-0 text-dark">Riwayat Pembayaran Midtrans</h6>
          <Button variant="outline-primary" className="btn-sm px-3" style={{ borderRadius: '5px' }} onClick={fetchPayments}>
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
                <th>Status</th>
                <th>Waktu</th>
                <th className="text-center">Metode Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {!loading && !error && payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Belum ada data payment.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Memuat data payment...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={6} className="text-center text-danger py-4">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && payments.map((item) => (
                <tr key={item.id}>
                  <td className="ps-3 fw-bold text-rs-orange" style={{ fontSize: '0.8rem' }}>
                    {item.invoice_id}
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{item.full_name}</div>
                    <div className="text-muted small">{item.product_name} - {item.sub_product_name}</div>
                  </td>
                  <td>
                    <div className="fw-bold" style={{ color: '#334155' }}>Rp {Number(item.amount || 0).toLocaleString('id-ID')}</div>
                  </td>
                  <td>{getStateBadge(item.state)}</td>
                  <td className="text-muted small">
                    <i className="bi bi-calendar3 me-2"></i>{new Date(item.created_at).toLocaleString('id-ID')}
                  </td>
                  <td className="text-center">
                    <span className="text-muted small">{item.payment_method || '-'}</span>
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