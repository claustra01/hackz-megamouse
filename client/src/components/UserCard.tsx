import React from 'react';
import styled from 'styled-components';

type Userdata = {
  username: string;
  profile: string;
  score: number;
};

interface UserCardProps {
  user: Userdata;
  index: number;
}

const UserCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  width: 400px;
`;

const Rank = styled.div`
  font-weight: bold;
  width: 30px;

  /* 1位には金の色を適用 */
  ${(props) => props.index === 0 && 'color: #FFD700;'}
  /* 2位には銀の色を適用 */
  ${(props) => props.index === 1 && 'color: #C0C0C0;'}
  /* 3位には銅の色を適用 */
  ${(props) => props.index === 2 && 'color: #CD7F32;'}
`;

const Username = styled.div`
  margin-right: 20px;
  font-weight: bold;
  width: 150px;
`;

const Profile = styled.div`
  margin-right: 20px;
  width: 100px;
`;

const Score = styled.div`
  font-weight: bold;
  width: 50px;
`;

const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <UserCardContainer>
      <Rank index={index}>{index + 1}</Rank>
      <Username>{user.username}</Username>
      <Profile>{user.profile}</Profile>
      <Score>{user.score}</Score>
    </UserCardContainer>
  );
};

export default UserCard;
