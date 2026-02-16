import React from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import pendaftarData from '../../data/pendaftarData.json'; // Import data terpisah
import * as XLSX from 'xlsx';

const Registrasi = () => {
  // --- FUNGSI EXPORT EXCEL ---
  const handleExport = () => {
    const dataToExport = pendaftarData.map(item => ({
      'Nama Siswa': item.nama_siswa,
      'Tanggal Lahir': item.tanggal_lahir,
      'Program': item.program_dipilih,
      'Nama Orang Tua': item.nama_ortu,
      'Email Ortu': item.email_ortu,
      'No WA': item.no_wa,
      'Alamat': item.alamat
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
              {pendaftarData.map((item) => (
                <tr key={item.id}>
                  <td className="ps-3 fw-bold text-dark">{item.nama_siswa}</td>
                  <td className="text-muted">{item.tanggal_lahir}</td>
                  <td>
                    <span className="badge bg-light text-dark border fw-normal">
                      {item.program_dipilih}
                    </span>
                  </td>
                  <td>{item.nama_ortu}</td>
                  <td className="text-muted small">{item.email_ortu}</td>
                  <td><span className="text-success fw-bold">{item.no_wa}</span></td>
                  <td className="text-center">
                    <Button variant="light" size="sm" className="p-1 px-2" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button variant="light" size="sm" className="p-1 px-2" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td className="text-truncate text-muted" style={{ maxWidth: '150px' }} title={item.alamat}>
                    {item.alamat}
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