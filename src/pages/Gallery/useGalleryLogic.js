import { useEffect, useState } from 'react';
import initialGalleryData from '../../data/galleryData.json';
import { api } from '../../utils/api';

export const useGalleryLogic = () => {
  const fallbackGalleries = Array.isArray(initialGalleryData) ? initialGalleryData : [];
  const [galleries, setGalleries] = useState(fallbackGalleries);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [createForm, setCreateForm] = useState({
    title: '',
    category_id: '',
    description: '',
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [createFile, setCreateFile] = useState(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category_id: '',
    description: '',
  });
  const [editFile, setEditFile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      setError('');

      try {
        const [galleryResponse, categoryResponse] = await Promise.all([
          api.get('/admin/galleries'),
          api.get('/admin/galleries/categories'),
        ]);

        if (!isMounted) return;

        if (Array.isArray(galleryResponse?.data)) {
          setGalleries(galleryResponse.data);
        }
        if (Array.isArray(categoryResponse?.data)) {
          setCategories(categoryResponse.data);
        }
      } catch (err) {
        if (isMounted) {
          setGalleries(fallbackGalleries);
          setError(err.message || 'Gagal memuat data gallery.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateFileChange = (file) => {
    setCreateFile(file || null);
  };

  const handleEditFileChange = (file) => {
    setEditFile(file || null);
  };

  const resetCreateForm = () => {
    setCreateForm({
      title: '',
      category_id: '',
      description: '',
    });
    setCreateFile(null);
  };

  const createCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setError('Nama kategori wajib diisi.');
      return;
    }

    setError('');
    try {
      await api.post('/admin/galleries/categories', { category: trimmed });
      const categoryResponse = await api.get('/admin/galleries/categories');
      if (Array.isArray(categoryResponse?.data)) {
        setCategories(categoryResponse.data);
      }
      setNewCategoryName('');
    } catch (err) {
      setError(err.message || 'Gagal menambahkan kategori.');
    }
  };

  const createGallery = async () => {
    if (!createForm.title.trim()) {
      setError('Judul foto wajib diisi.');
      return;
    }
    if (!createForm.category_id) {
      setError('Kategori wajib dipilih.');
      return;
    }
    if (!createFile) {
      setError('File gambar wajib dipilih.');
      return;
    }

    setError('');
    try {
      const formData = new FormData();
      formData.append('title', createForm.title.trim());
      formData.append('category_id', createForm.category_id);
      formData.append('description', createForm.description.trim());
      formData.append('image', createFile);

      const response = await api.post('/admin/galleries', formData);

      if (response?.data) {
        setGalleries((prev) => [response.data, ...prev]);
      }
      resetCreateForm();
    } catch (err) {
      setError(err.message || 'Gagal menambahkan gallery.');
    }
  };

  const startEdit = (item) => {
    setSelectedItem(item);
    setEditForm({
      title: item.title || '',
      category_id: item.category_id ? String(item.category_id) : '',
      description: item.description || '',
    });
    setEditFile(null);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    setEditForm({ title: '', category_id: '', description: '' });
    setEditFile(null);
  };

  const saveEdit = async () => {
    if (!selectedItem) return;

    if (!editForm.title.trim()) {
      setError('Judul foto wajib diisi.');
      return;
    }
    if (!editForm.category_id) {
      setError('Kategori wajib dipilih.');
      return;
    }

    setError('');
    try {
      const formData = new FormData();
      formData.append('title', editForm.title.trim());
      formData.append('category_id', editForm.category_id);
      formData.append('description', editForm.description.trim());
      if (editFile) {
        formData.append('image', editFile);
      }

      const response = await api.put(`/admin/galleries/${selectedItem.id}`, formData);
      if (response?.data) {
        setGalleries((prev) => prev.map((item) => (item.id === selectedItem.id ? response.data : item)));
      }
      closeEditModal();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui gallery.');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini dari gallery?')) {
      return;
    }

    setError('');
    try {
      await api.delete(`/admin/galleries/${id}`);
      setGalleries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || 'Gagal menghapus gallery.');
    }
  };

  const filteredGalleries = galleries.filter((item) =>
    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    isLoading,
    error,
    categories,
    searchTerm, setSearchTerm,
    filteredGalleries, deleteItem,
    createForm,
    newCategoryName,
    createFile,
    handleCreateChange,
    handleCreateFileChange,
    setNewCategoryName,
    createCategory,
    createGallery,
    showEditModal, selectedItem,
    startEdit, closeEditModal,
    editForm,
    editFile,
    handleEditChange,
    handleEditFileChange,
    saveEdit,
  };
};