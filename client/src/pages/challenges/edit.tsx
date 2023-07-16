import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

type Challenge = {
  title: string;
  category: string;
  description: string;
  filePath: string;
  connectioninfo: string;
  value: number;
  is_visible: boolean;
};

const UpdateChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
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
  const challengeid = router.query.id;


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const api = axios.create({
          headers: {
            Authorization: `Bearer ${cookies.token}`, // トークンをリクエストヘッダーに付与
          },

        });
        const response = await api.get(`/api/auth/challenges/${challengeid}`);

        if (response.status === 200) {
          console.log(response.data); // 成功した場合のレスポンスをログに表示
          const { title, category, description, filepath, connection_info, value, is_visible } = response.data;
          setChallenge(response.data);
          setTitle(title);
          setCategory(category);
          setDescription(description);
          setFilePath(filepath);
          setConnectionInfo(connection_info);
          setValue(value);
          setIsVisible(is_visible)
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        router.push('/');
      }
    };

    fetchChallenge();
  }, [challengeid, router]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${cookies.token}`, // トークンをリクエストヘッダーに付与
        },

      });
      const response = await api.put(`/api/auth/challenges/${challengeid}`, {
        title,
        category,
        description,
        filePath,
        connectioninfo,
        flag,
        value,
        is_visible: isVisible,
      });

      console.log(response.data); // 成功した場合のレスポンスをログに表示

      if (response.status === 200) {
        // 保存成功時の処理
        console.log('challenge saved successfully!');
        router.push('/challenges'); // 保存成功後に/challengesにリダイレクト
      } else {
        setError(`Failed to save challenge: ${response.data.message}`);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(`Failed to save challenge: ${error.response.data.message}`);
      } else {
        setError('An error occurred while saving the challenge.');
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>File Path:</label>
          <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} />
        </div>
        <div>
          <label>Connection Info:</label>
          <input type="text" value={connectioninfo} onChange={(e) => setConnectionInfo(e.target.value)} />
        </div>
        <div>
          <label>Flag:</label>
          <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} />
        </div>
        <div>
          <label>Value:</label>
          <input type="number" value={value !== 0 ? value : ''} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
        <div>
          <label>Visible:</label>
          <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
        </div>
      </div>
      <button onClick={handleSubmit}>save</button>
      {error && <p>{error}</p>}
    </>
  );
}

export default UpdateChallenge;