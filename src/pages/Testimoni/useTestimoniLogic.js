import { useEffect, useState } from 'react';
import { api } from '../../utils/api';

const initialUnifiedForm = {
  student_name: '',
  parent_name: '',
  description: '',
  year: '',
  testimonials: '',
  rate: '5',
  is_visible: true,
  id_parent_testimonials: '',
  id_product_parent: '',
  id_testimonial_student: '',
  image: null,
};

export const useTestimoniLogic = () => {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState(initialUnifiedForm);
  const [editingType, setEditingType] = useState('');
  const [editingId, setEditingId] = useState(null);

  async function fetchTestimonials() {
    setIsLoading(true);
    setError('');
    try {
      const [studentResponse, parentResponse] = await Promise.all([
        api.get('/admin/testimonials/students'),
        api.get('/admin/testimonials/parents'),
      ]);

      const programResponse = await api.get('/admin/programs');

      setStudents(Array.isArray(studentResponse?.data) ? studentResponse.data : []);
      setParents(Array.isArray(parentResponse?.data) ? parentResponse.data : []);
      setProducts(Array.isArray(programResponse?.data) ? programResponse.data : []);
    } catch (err) {
      setError(err.message || 'Gagal mengambil data testimoni dari server.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingType('');
    setEditingId(null);
    setFormType('');
    setFormData(initialUnifiedForm);
  };

  const handleFormTypeChange = (value) => {
    setError('');
    setEditingType('');
    setEditingId(null);
    setFormType(value);
    setFormData(initialUnifiedForm);
  };

  const startEditStudent = (student) => {
    setEditingType('student');
    setEditingId(student.id);
    setFormType('student');
    setFormData({
      student_name: student.student_name || '',
      parent_name: '',
      description: student.description || '',
      year: student.year ? String(student.year) : '',
      testimonials: student.testimonials || '',
      rate: student.rate ? String(student.rate) : '5',
      is_visible: student.is_visible !== undefined ? Boolean(student.is_visible) : true,
      id_parent_testimonials: student.id_parent_testimonials || '',
      id_product_parent: student.id_product_parent || '',
      id_testimonial_student: '',
      image: null,
    });
  };

  const startEditParent = (parent) => {
    setEditingType('parent');
    setEditingId(parent.id);
    setFormType('parent');
    setFormData({
      student_name: '',
      parent_name: parent.parent_name || '',
      description: '',
      year: parent.year ? String(parent.year) : '',
      testimonials: parent.testimonials || '',
      rate: parent.rate ? String(parent.rate) : '5',
      is_visible: parent.is_visible !== undefined ? Boolean(parent.is_visible) : true,
      id_parent_testimonials: '',
      id_product_parent: '',
      id_testimonial_student: parent.id_testimonial_student || '',
      image: null,
    });
  };

  function buildStudentPayload() {
    const payload = new FormData();
    payload.append('student_name', formData.student_name);
    payload.append('description', formData.description || '');
    payload.append('year', formData.year);
    payload.append('testimonials', formData.testimonials);
    payload.append('rate', formData.rate || '5');
    payload.append('is_visible', String(formData.is_visible));
    payload.append('id_parent_testimonials', formData.id_parent_testimonials || '');
    payload.append('id_product_parent', formData.id_product_parent || '');
    if (formData.image instanceof File) {
      payload.append('image', formData.image);
    }
    return payload;
  }

  function buildParentPayload() {
    const payload = new FormData();
    payload.append('parent_name', formData.parent_name);
    payload.append('year', formData.year);
    payload.append('testimonials', formData.testimonials);
    payload.append('rate', formData.rate || '5');
    payload.append('is_visible', String(formData.is_visible));
    payload.append('id_testimonial_student', formData.id_testimonial_student || '');
    if (formData.image instanceof File) {
      payload.append('image', formData.image);
    }
    return payload;
  }
  const isEditing = Boolean(editingId);

  const submitForm = async () => {
    if (!formType) {
      setError('Pilih tipe testimoni terlebih dahulu.');
      return;
    }

    if (!formData.year || !formData.testimonials.trim()) {
      setError('Tahun dan isi testimoni wajib diisi.');
      return;
    }

    if (formType === 'student' && !formData.student_name.trim()) {
      setError('Nama siswa wajib diisi.');
      return;
    }

    if (formType === 'parent' && !formData.parent_name.trim()) {
      setError('Nama orang tua wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      if (formType === 'student') {
        const payload = buildStudentPayload();
        if (isEditing && editingType === 'student') {
          await api.put(`/admin/testimonials/students/${editingId}`, payload);
        } else {
          await api.post('/admin/testimonials/students', payload);
        }
      } else {
        const payload = buildParentPayload();
        if (isEditing && editingType === 'parent') {
          await api.put(`/admin/testimonials/parents/${editingId}`, payload);
        } else {
          await api.post('/admin/testimonials/parents', payload);
        }
      }

      resetForm();
      await fetchTestimonials();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan testimoni.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Hapus testimoni siswa ini?')) return;

    setError('');
    try {
      await api.delete(`/admin/testimonials/students/${id}`);
      await fetchTestimonials();
      if (editingType === 'student' && editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Gagal menghapus testimoni siswa.');
    }
  };

  const deleteParent = async (id) => {
    if (!window.confirm('Hapus testimoni orang tua ini?')) return;

    setError('');
    try {
      await api.delete(`/admin/testimonials/parents/${id}`);
      await fetchTestimonials();
      if (editingType === 'parent' && editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Gagal menghapus testimoni orang tua.');
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredStudents = students.filter((item) => {
    if (!normalizedSearch) return true;
    return [
      item.student_name,
      item.description,
      item.product_parent?.product_parent_name,
      item.testimonials,
      String(item.year || ''),
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  const filteredParents = parents.filter((item) => {
    if (!normalizedSearch) return true;
    return [
      item.parent_name,
      item.testimonials,
      String(item.year || ''),
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  return {
    students,
    parents,
    products,
    filteredStudents,
    filteredParents,
    searchTerm,
    setSearchTerm,
    isLoading,
    isSubmitting,
    error,
    formType,
    formData,
    editingType,
    editingId,
    handleFormTypeChange,
    handleFormChange,
    submitForm,
    resetForm,
    startEditStudent,
    startEditParent,
    deleteStudent,
    deleteParent,
  };
};