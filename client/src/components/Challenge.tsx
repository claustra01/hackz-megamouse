import React, { useState } from 'react';
import Modal from './Modal';
import Panel from './Panel';


const ChallengeCard = (data: any) => {


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
            <h2 className="card-title">{data.data.title}</h2>
            <p className="card-description">{data.data.description}</p>
            <p className="card-value">{data.data.value}</p>
          </div>
        </div>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Panel data={data.data} />
      </Modal>
    </>
  );
};

export default ChallengeCard;
