import { useState } from 'react';
import initialGalleryData from '../../data/galleryData.json';

export const useGalleryLogic = () => {
  const [galleries, setGalleries] = useState(initialGalleryData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const startEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const deleteItem = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus foto ini dari gallery?")) {
      setGalleries(galleries.filter(item => item.id !== id));
    }
  };

  const filteredGalleries = galleries.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, setSearchTerm,
    filteredGalleries, deleteItem,
    showEditModal, selectedItem,
    startEdit, closeEditModal
  };
};