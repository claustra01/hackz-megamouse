import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  & label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  & input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;

export const DataTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  & table {
    border-collapse: collapse;
    width: 80%;
    max-width: 400px;
    border: 1px solid #ccc;
    & th,
    td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }
  }
`;