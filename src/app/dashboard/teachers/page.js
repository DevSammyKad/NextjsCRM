'use client';
import InviteTeamMember from '@/components/InviteTeamMember';
import React, { useState } from 'react';

const Teachers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      Teachers
      <InviteTeamMember handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Teachers;
