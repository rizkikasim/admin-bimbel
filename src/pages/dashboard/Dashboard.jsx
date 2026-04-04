import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Table, Button, Modal, Badge } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import * as XLSX from 'xlsx';
import { api } from '../../utils/api';

const DashboardCard = ({ label, value, icon, color }) => (
  <div className="card-premium d-flex align-items-center justify-content-between p-4">
    <div>
      <p className="text-muted small fw-bold text-uppercase mb-1" style={{letterSpacing: '0.5px'}}>{label}</p>
      <h3 className="fw-bold mb-0">{value}</h3>
    </div>
    <div className="rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
         style={{width: '50px', height: '50px', backgroundColor: `${color}15`, color: color, borderRadius: '5px'}}>
      <i className={`bi ${icon}`} style={{fontSize: '1.4rem'}}></i>
    </div>
  </div>
);

function formatDateTime(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString('id-ID');
  } catch {
    return '-';
  }
}

function formatBirthDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleDateString('id-ID');
  } catch {
    return '-';
  }
}

function mapRegistrationStatus(value) {
  const normalized = String(value || '').toLowerCase();
  return normalized === 'settlement' ? 'Success' : 'Pending';
}

function renderStatusBadge(value) {
  const status = mapRegistrationStatus(value);
  return status === 'Success'
    ? <Badge bg="success">Success</Badge>
    : <Badge bg="warning" text="dark">Pending</Badge>;
}

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const summary = useMemo(() => {
    const total = registrations.length;
    const success = registrations.filter((item) => mapRegistrationStatus(item.payment_state) === 'Success').length;
    const pending = total - success;

    return {
      total,
      success,
      pending,
    };
  }, [registrations]);

  useEffect(() => {
    let isMounted = true;

    async function fetchRegistrations() {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/admin/registrations');
        if (!isMounted) return;
        setRegistrations(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Gagal memuat data registrasi.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRegistrations();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleExportExcel = () => {
    const dataToExport = registrations.map((item) => ({
      'Timestamp (Updated At)': formatDateTime(item.updated_at),
      Fullname: item.full_name || '-',
      Birthdate: formatBirthDate(item.birth),
      'No Telp': item.whatsapp_number || '-',
      Email: item.email || '-',
      'Nama Orangtua': item.parent_name || '-',
      'Program Dipilih': item.product_name || '-',
      Subprogram: item.sub_product_name || '-',
      'Status Pendaftaran': mapRegistrationStatus(item.payment_state),
      invoice_id: item.invoice_id || '-',
      payment_method: item.payment_method || '-',
      amount: Number(item.payment_amount || 0),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrasi');
    XLSX.writeFile(workbook, `Registrasi_Dashboard_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <AdminLayout title="Overview">
      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} lg={4}>
          <DashboardCard label="Total Registrasi" value={summary.total} icon="bi-people-fill" color="#F97316" />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <DashboardCard label="Registrasi Pending" value={summary.pending} icon="bi-person-plus-fill" color="#3b82f6" />
        </Col>
        <Col xs={12} lg={4}>
          <DashboardCard label="Registrasi Success" value={summary.success} icon="bi-check-circle-fill" color="#10b981" />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="card-premium">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h5 className="fw-bold mb-0">Data Registrasi Terbaru</h5>
              <Button className="btn-sm btn-rs-primary px-3" style={{ fontSize: '0.75rem' }} onClick={handleExportExcel}>
                <i className="bi bi-file-earmark-excel me-2"></i>Export Excel
              </Button>
            </div>

            <div className="table-responsive">
              <Table hover className="align-middle custom-table border-0">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Email</th>
                    <th>Fullname</th>
                    <th>Program</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th className="text-center">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && !error && registrations.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        Belum ada data registrasi.
                      </td>
                    </tr>
                  )}

                  {loading && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        Memuat data registrasi...
                      </td>
                    </tr>
                  )}

                  {!loading && error && (
                    <tr>
                      <td colSpan={7} className="text-center text-danger py-4">
                        {error}
                      </td>
                    </tr>
                  )}

                  {!loading && !error && registrations.map((item) => (
                    <tr key={item.id}>
                      <td className="small text-muted">{formatDateTime(item.updated_at)}</td>
                      <td>{item.email || '-'}</td>
                      <td className="fw-bold text-dark">{item.full_name || '-'}</td>
                      <td>{item.product_name || '-'}</td>
                      <td>{item.sub_product_name || '-'}</td>
                      <td>{renderStatusBadge(item.payment_state)}</td>
                      <td className="text-center">
                        <Button variant="light" size="sm" onClick={() => setSelectedRow(item)}>
                          <i className="bi bi-eye-fill"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={Boolean(selectedRow)} onHide={() => setSelectedRow(null)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Registrasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <Row className="g-3">
              <Col md={6}><strong>Timestamp:</strong> {formatDateTime(selectedRow.updated_at)}</Col>
              <Col md={6}><strong>Status:</strong> {mapRegistrationStatus(selectedRow.payment_state)}</Col>
              <Col md={6}><strong>Fullname:</strong> {selectedRow.full_name || '-'}</Col>
              <Col md={6}><strong>Birthdate:</strong> {formatBirthDate(selectedRow.birth)}</Col>
              <Col md={6}><strong>No Telp:</strong> {selectedRow.whatsapp_number || '-'}</Col>
              <Col md={6}><strong>Email:</strong> {selectedRow.email || '-'}</Col>
              <Col md={6}><strong>Nama Orangtua:</strong> {selectedRow.parent_name || '-'}</Col>
              <Col md={6}><strong>Alamat:</strong> {selectedRow.address || '-'}</Col>
              <Col md={6}><strong>Program:</strong> {selectedRow.product_name || '-'}</Col>
              <Col md={6}><strong>Sub Program:</strong> {selectedRow.sub_product_name || '-'}</Col>

              <Col xs={12}><hr className="my-1" /></Col>
              <Col md={6}><strong>Invoice ID:</strong> {selectedRow.invoice_id || '-'}</Col>
              <Col md={6}><strong>Metode Pembayaran:</strong> {selectedRow.payment_method || '-'}</Col>
              <Col md={6}><strong>Jumlah Pembayaran:</strong> Rp {Number(selectedRow.payment_amount || 0).toLocaleString('id-ID')}</Col>

              <Col xs={12}><hr className="my-1" /></Col>
              <Col md={6}>
                <strong>Dokumen KK:</strong>{' '}
                {selectedRow.family_card_url ? (
                  <a href={selectedRow.family_card_url} target="_blank" rel="noreferrer">Lihat Dokumen</a>
                ) : '-'}
              </Col>
              <Col md={6}>
                <strong>Dokumen Akta:</strong>{' '}
                {selectedRow.birth_certificate_url ? (
                  <a href={selectedRow.birth_certificate_url} target="_blank" rel="noreferrer">Lihat Dokumen</a>
                ) : '-'}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRow(null)}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Dashboard;