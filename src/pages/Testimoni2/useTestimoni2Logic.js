import { useState } from 'react';
import initialData from '../../data/testimoni2Data.json';

export const useTestimoni2Logic = () => {
  const [alumni, setAlumni] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const startEdit = (data) => {
    setSelectedAlumni(data);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAlumni(null);
  };

  const deleteAlumni = (id) => {
    if (window.confirm("Hapus testimoni alumni ini?")) {
      setAlumni(alumni.filter(a => a.id !== id));
    }
  };

  const filteredAlumni = alumni.filter((a) =>
    a.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.universitas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, setSearchTerm, filteredAlumni,
    deleteAlumni, startEdit, showEditModal,
    selectedAlumni, closeEditModal
  };
};