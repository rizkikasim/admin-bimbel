import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

const DEFAULT_CATEGORIES = ['BIMBEL', 'KURSUS', 'PRIVAT'];

const initialForm = {
  category: 'BIMBEL',
  product_parent_name: '',
  description: '',
  registration_price: '',
  is_visible: true,
  sub_products: [
    {
      product_name: '',
      description: '',
      price: '',
    },
  ],
  thumbnail: null,
};

export const useProgramLogic = () => {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const isEditing = Boolean(editingProgram?.id);

  const fetchPrograms = async () => {
    setIsLoading(true);
    setPageError('');

    try {
      const response = await api.get('/admin/programs');
      setPrograms(Array.isArray(response?.data) ? response.data : []);

      if (Array.isArray(response?.categories) && response.categories.length) {
        setCategories(response.categories);
      }
    } catch (err) {
      setPageError(err.message || 'Gagal mengambil data program.');
      setPrograms([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleFormChange = (field, value) => {
    if (modalError) {
      setModalError('');
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubProductChange = (index, field, value) => {
    if (modalError) {
      setModalError('');
    }
    setFormData((prev) => ({
      ...prev,
      sub_products: prev.sub_products.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addSubProductRow = () => {
    if (modalError) {
      setModalError('');
    }
    setFormData((prev) => ({
      ...prev,
      sub_products: [
        ...prev.sub_products,
        {
          product_name: '',
          description: '',
          price: '',
        },
      ],
    }));
  };

  const removeSubProductRow = (index) => {
    if (modalError) {
      setModalError('');
    }
    setFormData((prev) => {
      if (prev.sub_products.length <= 1) {
        return prev;
      }

      return {
        ...prev,
        sub_products: prev.sub_products.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const setThumbnailFile = (file) => {
    if (modalError) {
      setModalError('');
    }
    setFormData((prev) => ({ ...prev, thumbnail: file || null }));
  };

  const openCreateModal = () => {
    setModalError('');
    setEditingProgram(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (program) => {
    setModalError('');
    setEditingProgram(program);
    setFormData({
      category: program.category || 'BIMBEL',
      product_parent_name: program.product_parent_name || program.title || '',
      description: program.description || '',
      registration_price:
        program.registration_price !== undefined && program.registration_price !== null
          ? String(program.registration_price)
          : '',
      is_visible: program.is_visible !== undefined ? Boolean(program.is_visible) : true,
      sub_products: Array.isArray(program.sub_products) && program.sub_products.length
        ? program.sub_products.map((sub) => ({
            id: sub.id,
            product_name: sub.product_name || sub.grade || '',
            description: sub.description || '',
            price: sub.price !== undefined && sub.price !== null ? String(sub.price) : '',
          }))
        : [{ product_name: '', description: '', price: '' }],
      thumbnail: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProgram(null);
    setFormData(initialForm);
    setModalError('');
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append('category', formData.category);
    payload.append('product_parent_name', formData.product_parent_name);
    payload.append('description', formData.description || '');
    payload.append('registration_price', String(formData.registration_price || '0'));
    payload.append('is_visible', String(formData.is_visible));

    const subProducts = formData.sub_products.map((sub) => ({
      product_name: String(sub.product_name || '').trim(),
      description: String(sub.description || '').trim(),
      price: String(sub.price || '').replace(/[^0-9]/g, ''),
    }));

    payload.append('sub_products', JSON.stringify(subProducts));

    if (formData.thumbnail instanceof File) {
      payload.append('thumbnail', formData.thumbnail);
    }

    return payload;
  };

  const validateBeforeSubmit = () => {
    if (!formData.product_parent_name.trim()) {
      return 'Nama program wajib diisi.';
    }

    if (!String(formData.registration_price).trim()) {
      return 'Biaya pendaftaran wajib diisi.';
    }

    const subProducts = formData.sub_products || [];
    if (!subProducts.length) {
      return 'Minimal harus ada satu sub program.';
    }

    for (let i = 0; i < subProducts.length; i += 1) {
      const item = subProducts[i];
      if (!String(item.product_name || '').trim()) {
        return `Nama sub program ke-${i + 1} wajib diisi.`;
      }
      if (!String(item.price || '').trim()) {
        return `Harga sub program ke-${i + 1} wajib diisi.`;
      }
    }

    if (!isEditing && !(formData.thumbnail instanceof File)) {
      return 'Thumbnail program wajib diupload.';
    }

    return '';
  };

  const submitProgram = async () => {
    const validationError = validateBeforeSubmit();
    if (validationError) {
      setModalError(validationError);
      return;
    }

    setIsSubmitting(true);
    setModalError('');

    try {
      const payload = buildPayload();

      if (isEditing) {
        await api.put(`/admin/programs/${editingProgram.id}`, payload);
      } else {
        await api.post('/admin/programs', payload);
      }

      closeModal();
      await fetchPrograms();
    } catch (err) {
      setModalError(err.message || 'Gagal menyimpan program.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProgram = async (id) => {
    if (!window.confirm('Hapus program ini?')) return;

    setPageError('');
    try {
      await api.delete(`/admin/programs/${id}`);
      await fetchPrograms();
    } catch (err) {
      setPageError(err.message || 'Gagal menghapus program.');
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredPrograms = programs.filter((prog) => {
    if (!normalizedSearch) return true;
    return [
      prog.product_parent_name,
      prog.title,
      prog.category,
      prog.description,
      ...(Array.isArray(prog.sub_products)
        ? prog.sub_products.map((sub) => `${sub.product_name || ''} ${sub.description || ''}`)
        : []),
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedSearch));
  });

  return {
    programs,
    categories,
    searchTerm,
    setSearchTerm,
    filteredPrograms,
    isLoading,
    isSubmitting,
    isEditing,
    pageError,
    modalError,
    showModal,
    formData,
    openCreateModal,
    openEditModal,
    closeModal,
    handleFormChange,
    handleSubProductChange,
    addSubProductRow,
    removeSubProductRow,
    setThumbnailFile,
    submitProgram,
    deleteProgram,
  };
};