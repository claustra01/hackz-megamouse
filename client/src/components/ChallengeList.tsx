import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Panel from './Panel';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 横に並べる */
  justify-content: center; /* カードを中央寄せ */
  gap: 20px; /* カード間の余白 */
`;

const Card = styled.div`
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  transition: transform 0.2s ease;
  width: 300px;

  &:hover {
    transform: translateY(-5px);
  }

  .card-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
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
  .card-buttons {
    display: flex;
    justify-content: flex-end;
  }
  .card-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color:#ffac00;
    font-size: 20px;
    font-family: 'Tektur', sans-serif;
  }
`;

const ChallengeCard = ({ data }) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const EditChallenge = () => {
    router.push(`/challenges/edit/${data.id}`);
  };

  return (
    <>
      <Card onClick={handleOpenModal}>
        <div className="card-content">
          <h2 className="card-title">{data.title}</h2>
          <p className="card-description">{data.description}</p>
          <p className="card-value">{data.value}</p>
        </div>
        <div className='card-buttons'>
          {isAdmin && <button className='card-button' onClick={EditChallenge}>edit</button>}
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Panel data={data} />
      </Modal>
    </>
  );
};

const ChallengeListContainer = styled.div`
  overflow-x: auto; /* 横スクロール可能 */
`;

const ChallengeList = ({ data }) => {
  return (
    <ChallengeListContainer>
      <CardContainer>
        {data.map((item, index) => (
          <ChallengeCard key={index} data={item} />
        ))}
      </CardContainer>
    </ChallengeListContainer>
  );
};

export default ChallengeList;
