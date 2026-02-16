import { useState } from 'react';
import initialVideoData from '../../data/videoData.json';

export const useVideoLogic = () => {
  const [videos, setVideos] = useState(initialVideoData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modal Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const startEdit = (video) => {
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedVideo(null);
  };

  const deleteVideo = (id) => {
    if (window.confirm("Hapus video ini?")) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const filteredVideos = videos.filter((vid) =>
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm, setSearchTerm,
    filteredVideos, deleteVideo,
    showEditModal, selectedVideo,
    startEdit, closeEditModal
  };
};