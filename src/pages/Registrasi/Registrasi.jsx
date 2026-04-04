import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import * as XLSX from 'xlsx';
import { api } from '../../utils/api';

const Registrasi = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formattedRows = useMemo(
    () =>
      registrations.map((item) => ({
        ...item,
        birth_label: item.birth ? new Date(item.birth).toLocaleDateString('id-ID') : '-',
      })),
    [registrations]
  );

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

  // --- FUNGSI EXPORT EXCEL ---
  const handleExport = () => {
    const dataToExport = formattedRows.map((item) => ({
      'Nama Siswa': item.full_name,
      'Tanggal Lahir': item.birth_label,
      'Program': `${item.product_name} - ${item.sub_product_name}`,
      'Nama Orang Tua': item.parent_name,
      'Email Ortu': item.email,
      'No WA': item.whatsapp_number,
      Alamat: item.address,
      'Status Pembayaran': item.payment_state,
      Invoice: item.invoice_id,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");

    XLSX.writeFile(workbook, `Data_Registrasi_Bimbelku_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <AdminLayout title="Registrasi Siswa">
      <div className="card-premium animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold mb-0">Daftar Registrasi Masuk</h6>
          
          <Button 
            className="btn-rs-primary btn-sm px-3" 
            onClick={handleExport}
            style={{ backgroundColor: '#F97316', borderColor: '#F97316' }}
          >
            <i className="bi bi-file-earmark-excel me-2"></i>Export Excel
          </Button>
        </div>

        <div className="table-responsive">
          <Table hover className="align-middle custom-table border-0">
            <thead>
              <tr>
                <th className="ps-3">Nama Siswa</th>
                <th>Tgl Lahir</th>
                <th>Program</th>
                <th>Nama Ortu</th>
                <th>Email Ortu</th>
                <th>No WA</th>
                <th className="text-center">KK</th>
                <th className="text-center">Akta</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {!loading && !error && formattedRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-muted py-4">
                    Belum ada data registrasi.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={9} className="text-center text-muted py-4">
                    Memuat data registrasi...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={9} className="text-center text-danger py-4">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && formattedRows.map((item) => (
                <tr key={item.id}>
                  <td className="ps-3 fw-bold text-dark">{item.full_name}</td>
                  <td className="text-muted">{item.birth_label}</td>
                  <td>
                    <span className="badge bg-light text-dark border fw-normal">
                      {item.product_name} - {item.sub_product_name}
                    </span>
                  </td>
                  <td>{item.parent_name}</td>
                  <td className="text-muted small">{item.email}</td>
                  <td><span className="text-success fw-bold">{item.whatsapp_number}</span></td>
                  <td className="text-center">
                    <Button
                      as="a"
                      href={item.family_card_url}
                      target="_blank"
                      rel="noreferrer"
                      variant="light"
                      size="sm"
                      className="p-1 px-2"
                      style={{ fontSize: '0.7rem' }}
                      disabled={!item.family_card_url}
                    >
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button
                      as="a"
                      href={item.birth_certificate_url}
                      target="_blank"
                      rel="noreferrer"
                      variant="light"
                      size="sm"
                      className="p-1 px-2"
                      style={{ fontSize: '0.7rem' }}
                      disabled={!item.birth_certificate_url}
                    >
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td className="text-truncate text-muted" style={{ maxWidth: '150px' }} title={item.address}>
                    {item.address}
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

export default Registrasi;