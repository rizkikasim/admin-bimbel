import React from 'react';
import { Table, Badge, Dropdown, Button } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import pendaftarData from '../data/pendaftarData.json'; // Import JSON langsung

const Registrasi = () => {
  // Fungsi untuk label status yang rapi
  const getStatusBadge = (status) => {
    const isVerified = status === 'Verified';
    return (
      <Badge 
        bg={isVerified ? 'success' : 'warning'} 
        className={isVerified ? 'fw-medium px-2 py-1' : 'text-dark fw-medium px-2 py-1'}
        style={{ borderRadius: '5px', fontSize: '0.7rem' }}
      >
        {status}
      </Badge>
    );
  };

  return (
    <AdminLayout title="Registrasi Siswa">
      <div className="card-premium animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold mb-0">Daftar Registrasi Masuk</h6>
          <Button className="btn-rs-primary btn-sm px-3">
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
                <th>KK</th>
                <th>Akta</th>
                <th>Alamat</th>
                <th className="text-center">Aksi</th>
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
                  <td>
                    <Button variant="light" size="sm" className="p-1 px-2" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td>
                    <Button variant="light" size="sm" className="p-1 px-2" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-file-earmark-pdf text-danger"></i>
                    </Button>
                  </td>
                  <td className="text-truncate text-muted" style={{ maxWidth: '120px' }} title={item.alamat}>
                    {item.alamat}
                  </td>
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm" className="no-caret bg-transparent border-0">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="shadow-sm border-0" style={{ fontSize: '0.8rem', borderRadius: '5px' }}>
                        <Dropdown.Item className="text-success"><i className="bi bi-check-circle me-2"></i>Verifikasi</Dropdown.Item>
                        <Dropdown.Item><i className="bi bi-pencil me-2"></i>Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger"><i className="bi bi-trash me-2"></i>Hapus</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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