import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff; /* 雰囲気に合った色 */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  .panel-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .panel-content {
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
      background-color: #333; /* 雰囲気に合った色 */
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
`;

const Panel = ({ data }) => {
  return (
    <PanelContainer>
      <h2 className="panel-title">{data.title}</h2>
      <div className="panel-content">{data.content}</div>
      <div className="panel-filepath">{data.filepath}</div>
      <div className="panel-connectioninfo">{data.connection_info}</div>
      <form>
        <p>flag</p>
        <input type="text" />
        <button>submit</button>
      </form>
    </PanelContainer>
  );
};

export default Panel;
