import { useState, useEffect } from 'react';
import initialProgramData from '../../data/programData.json';

export const useProgramLogic = () => {
  // Pastikan data awal adalah array untuk mencegah error .filter
  const [programs, setPrograms] = useState(Array.isArray(initialProgramData) ? initialProgramData : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const startEdit = (prog) => {
    setSelectedProgram(prog);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProgram(null);
  };

  const deleteProgram = (id) => {
    if (window.confirm("Hapus program ini?")) {
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  // Filter dengan pengamanan data
  const filteredPrograms = programs.filter((prog) =>
    (prog.judul || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { 
    searchTerm, setSearchTerm, filteredPrograms, 
    deleteProgram, startEdit, showEditModal, 
    selectedProgram, closeEditModal 
  };
};