import React, { useState } from 'react';
import Modal from './Modal';
import Panel from './Panel';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

import styled from 'styled-components';


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  background-color: #fff; /* 雰囲気に合った色 */
  transition: transform 0.2s ease;
  width: 300px;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
  }
  
  .card-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333; /* 雰囲気に合った色 */
  }
  
  .card-description {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
  }
  
  .card-value {
    font-size: 18px;
    font-weight: bold;
    color: #ffac00;
  }
  `;

const ChallengeCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { isAdmin } = useAuth();
  const router = useRouter();
  const EditChallenge = () => {
    router.push({
      pathname: "/challenges/edit",
      query: { id: data.data.id }
    });
  };

  return (
    <>
      {(isAdmin || data.data.is_visible) &&
        <div>
          <CardContainer onClick={handleOpenModal}>
            <div className="card-content">
              <h2 className="card-title">{data.title}</h2>
              <p className="card-description">{data.description}</p>
              <p className="card-value">{data.value}</p>
            </div>
            {isAdmin && <button onClick={EditChallenge}>edit</button>}
          </CardContainer>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <Panel data={data} />
          </Modal>
        </div>
      }
    </>
  );
};

export default ChallengeCard;
