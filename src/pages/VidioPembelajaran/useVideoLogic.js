import { useEffect, useState } from 'react';
import initialVideoData from '../../data/videoData.json';
import { api } from '../../utils/api';

export const useVideoLogic = () => {
  const fallbackVideos = Array.isArray(initialVideoData) ? initialVideoData : [];
  const [videos, setVideos] = useState(fallbackVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    url: '',
  });
  
  // State untuk Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    url: '',
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchVideos() {
      setIsLoading(true);
      setError('');
      try {
        const response = await api.get('/admin/eduvideos');
        if (isMounted && Array.isArray(response?.data)) {
          setVideos(response.data);
        }
      } catch {
        if (isMounted) {
          setVideos(fallbackVideos);
          setError('Gagal mengambil data video dari server. Menampilkan data lokal.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const startEdit = (video) => {
    setSelectedVideo(video);
    setEditForm({
      title: video.title || '',
      description: video.description || '',
      url: video.url || video.video_url || '',
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedVideo(null);
    setEditForm({ title: '', description: '', url: '' });
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      url: '',
    });
  };

  const addVideo = async () => {
    if (!form.title.trim() || !form.url.trim()) {
      setError('Judul dan link YouTube wajib diisi.');
      return;
    }

    setError('');
    try {
      const response = await api.post('/admin/eduvideos', {
        title: form.title,
        description: form.description,
        url: form.url,
      });

      if (response?.data) {
        setVideos((prev) => [response.data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.message || 'Gagal menambahkan video.');
    }
  };

  const updateVideo = async () => {
    if (!selectedVideo) return;
    if (!editForm.title.trim() || !editForm.url.trim()) {
      setError('Judul dan link YouTube wajib diisi.');
      return;
    }

    setError('');
    try {
      const response = await api.put(`/admin/eduvideos/${selectedVideo.id}`, {
        title: editForm.title,
        description: editForm.description,
        url: editForm.url,
      });

      if (response?.data) {
        setVideos((prev) => prev.map((item) => (item.id === selectedVideo.id ? response.data : item)));
      }
      closeEditModal();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui video.');
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Hapus video ini?')) return;

    setError('');
    try {
      await api.delete(`/admin/eduvideos/${id}`);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setError(err.message || 'Gagal menghapus video.');
    }
  };

  const filteredVideos = videos.filter((vid) =>
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, setSearchTerm,
    isLoading, error,
    filteredVideos, deleteVideo,
    form, handleFormChange, addVideo,
    editForm, handleEditFormChange, updateVideo,
    showEditModal, selectedVideo,
    startEdit, closeEditModal
  };
};