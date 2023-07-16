import ChallengeList from '../components/ChallengeList';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';



const Challenges = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/auth/challenges', {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const data = response.data;
        console.log(data)
        // レスポンスデータの処理
        if (data != null) {
          setData(data);
          const fetchedcategories = data.map((arr) => arr[0].category);
          setCategories(fetchedcategories)
        } else {
          const nulldata = [
            [
              {
                "id": 100000,
                "title": "none",
                "category": "none",
                "description": "description",
                "filepath": "file",
                "connection_info": "hoge",
                "value": 0,
                "is_visible": false,
              }
            ]
          ]
          setData(nulldata);
        }

      } catch (error) {
        console.error('Error:', error.message);
        // エラーハンドリング
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <p>{categories[index]}</p>
            <ChallengeList data={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Challenges;