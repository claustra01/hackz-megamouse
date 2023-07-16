import React from 'react';
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

  return (
    <>
      <CardContainer onClick={handleOpenModal}>
        <div className="card-content">
          <h2 className="card-title">{data.title}</h2>
          <p className="card-description">{data.description}</p>
          <p className="card-value">{data.value}</p>
        </div>
      </CardContainer>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Panel data={data} />
      </Modal>
    </>
  );
};

export default ChallengeCard;
