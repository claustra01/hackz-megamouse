import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  .panel-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .panel-description {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .panel-filepath {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  .panel-connectioninfo {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #333;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ffac00;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .panel-submit-message {
    font-size: 16px;
    margin-top: 10px;
  }

  .panel-success {
    color: #00cc00;
  }

  .panel-failure {
    color: #ff0000;
  }
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: #333;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Tektur', sans-serif;

  &:hover {
    background-color: #ffac00;
  }

  &:focus {
    outline: none;
  }
`;

const Panel = (data: any) => {
  const [cookies] = useCookies(['token']);
  const [flag, setFlag] = useState('');
  const [isCollect, setIsCollect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlag(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const response = await api.post('/api/auth/submissions', {
        challenge_id: data.data.id,
        body: flag,
      });
      if (response.status === 201) {
        setIsCollect(response.data.is_collect);
        setIsSubmit(true);
      } else {
        console.log(`Failed to save submit: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PanelContainer>
      <h2 className="panel-title">{data.data.title}</h2>
      <div className="panel-description">{data.data.description}</div>
      <div className="panel-filepath">{data.data.filepath}</div>
      <div className="panel-connectioninfo">{data.data.connection_info}</div>
      {!isCollect && (
        <div>
          <p>flag</p>
          <input type="text" onChange={handleInputChange} />
          <SubmitButton onClick={handleSubmit}>submit</SubmitButton>
        </div>
      )}
      {isSubmit && (
        <p className={`panel-submit-message ${isCollect ? 'panel-success' : 'panel-failure'}`}>
          {isCollect ? 'Success!' : 'Failed...'}
        </p>
      )}
    </PanelContainer>
  );
};

export default Panel;
