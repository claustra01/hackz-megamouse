import React, { useState } from 'react';
import Modal from './Modal';
import Panel from './Panel';
import Link from 'next/link';


const ChallengeCard = (data: any) => {
  // adminの時は全表示したい

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* {data.data.is_visible && */}
      <>
        <box onClick={handleOpenModal}>
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">{data.data.title}</h2>
              <p className="card-description">{data.data.description}</p>
              <p className="card-value">{data.data.value}</p>
            </div>
            {/* ↓adminの時だけ見えるように */}
            {/* <Link href="/challenges/edit">edit</Link> */}
          </div>
        </box>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Panel data={data.data} />
        </Modal>
      </>
      {/* } */}
    </>
  );
};

export default ChallengeCard;
