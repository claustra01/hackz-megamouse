import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { Button, ButtonContainer, ErrorMessage } from '@/styles/styledComponents';

const Input = styled.input`
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  padding: 8px;
  width: 100%;
`;

const TextArea = styled.textarea`
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  padding: 8px;
  width: 100%;
  resize: vertical;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  margin-left: 5px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 60px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  text-align: center;
`;

const ChallengeForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [filePath, setFilePath] = useState('');
  const [connectioninfo, setConnectionInfo] = useState('');
  const [flag, setFlag] = useState('');
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const [cookies] = useCookies(['token']);

  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const response = await api.post('/api/auth/challenges', {
        title,
        category,
        description,
        filePath,
        connectioninfo,
        flag,
        value,
        is_visible: isVisible,
      });

      if (response.status === 201) {
        console.log('Challenge saved successfully!');
        router.push('/challenges');
      } else {
        setError(`Failed to create: ${response.data.message}`);
      }
    } catch (error: any) {
      setError(`Failed to create: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <Title>Create Challenge</Title>
      <FormContainer>
        <FormGroup>
          <Label>Title:</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Category:</Label>
          <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>File Path:</Label>
          <Input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Connection Info:</Label>
          <Input type="text" value={connectioninfo} onChange={(e) => setConnectionInfo(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Flag:</Label>
          <Input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Value:</Label>
          <Input type="number" value={value !== 0 ? value : ''} onChange={(e) => setValue(Number(e.target.value))} />
        </FormGroup>
        <FormGroup>
          <CheckboxInput type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
          <CheckboxLabel>Visible</CheckboxLabel>
        </FormGroup>
        <ButtonContainer>
          <Button onClick={handleSubmit}>Create Challenge</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ButtonContainer>
      </FormContainer>
    </div>
  );
};

export default ChallengeForm;
