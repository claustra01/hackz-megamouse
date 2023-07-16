import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';


const Panel = (data: any) => {
  const [cookies] = useCookies(['token']);
  const [flag, setFlag] = useState('');
  const [iscollect, setIsCollect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    setFlag(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${cookies.token}`, // トークンをリクエストヘッダーに付与
        },

      });
      const response = await api.post('/api/auth/submissions', {
        challenge_id: data.data.id,
        body: flag,
      });
      if (response.status === 201) {
        // 保存成功時の処理
        console.log('Response:', response.data);
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
    <div className="panel">
      <h2 className="panel-title">{data.data.title}</h2>
      <div className="panel-description">{data.data.description}</div>
      <div className="panel-filepath">{data.data.filepath}</div>
      <div className="panel-connectioninfo">{data.data.connection_info}</div>
      {!iscollect &&
        <div >
          <p>flag</p>
          <input type="text" onChange={handleInputChange} />
          <button onClick={handleSubmit}>submit</button>
        </div>
      }
      {(iscollect == false && isSubmit) && <p>Failed...</p>}
      {iscollect &&
        <p>Success!</p>
      }
    </div>
  );
};

export default Panel;
