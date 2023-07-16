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
        setData(data);
        // レスポンスデータの処理
        const fetchedcategories = data.map((arr) => arr[0].category);

        setCategories(fetchedcategories)

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
