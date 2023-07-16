import React from 'react';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const SignupTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
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

const SignupButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #66b2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Tektur', sans-serif;

  &:hover {
    background-color: #4682b4;
  }

  &:focus {
    outline: none;
  }
`;

const Signup = () => {
  return (
    <SignupContainer>
      <SignupTitle>Signup</SignupTitle>
      <SignupForm>
        <FormField>
          <label>Username:</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label>Email:</label>
          <input type="email" />
        </FormField>
        <FormField>
          <label>Password:</label>
          <input type="password" />
        </FormField>
        <SignupButton type="submit">Signup</SignupButton>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
