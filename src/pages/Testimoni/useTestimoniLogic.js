import { useState } from 'react';
import initialTestimoniData from '../../data/testimoniData.json';

export const useTestimoniLogic = () => {
  const [testimonis, setTestimonis] = useState(initialTestimoniData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTesti, setSelectedTesti] = useState(null);

  const startEdit = (testi) => {
    setSelectedTesti(testi);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedTesti(null);
  };

  const deleteTesti = (id) => {
    if (window.confirm("Hapus testimoni ini?")) {
      setTestimonis(testimonis.filter(t => t.id !== id));
    }
  };

  const filteredTestimonis = testimonis.filter((t) =>
    t.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, setSearchTerm, filteredTestimonis,
    deleteTesti, startEdit, showEditModal,
    selectedTesti, closeEditModal
  };
};