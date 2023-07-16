import React, { useState } from 'react';
import Modal from './Modal';
import Panel from './Panel';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';


const ChallengeCard = (data: any) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const EditChallenge = () => {
    router.push({
      pathname: "/challenges/edit",
      query: { id: data.data.id }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {(isAdmin || data.data.is_visible) &&
        <>
          <box onClick={handleOpenModal}>
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">{data.data.title}</h2>
                <p className="card-description">{data.data.description}</p>
                <p className="card-value">{data.data.value}</p>
              </div>
              {isAdmin && <button onClick={EditChallenge}>edit</button>}
            </div>
          </box>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <Panel data={data.data} />
          </Modal>
        </>
      }
    </>
  );
};

export default ChallengeCard;
