import { Challenge } from '../lib/contents';
import React, { useState } from 'react';
import Modal from './Modal';
import Panel from './Panel';

interface ChallengeProps {
  data: Challenge
}

const ChallengeCard = ({ data }: ChallengeProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={handleOpenModal}>
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">{data.title}</h2>
            <p className="card-description">{data.description}</p>
            <p className="card-value">{data.value}</p>
          </div>
        </div>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Panel />
      </Modal>
    </>
  );
};

export default ChallengeCard;
