import React from 'react';

type Userdata = {
  username: string;
  profile: string;
  score: number;
};

interface UserCardProps {
  user: Userdata;
  index: number;
}

const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '10px' }}>{index + 1}</div>
      <div style={{ marginRight: '10px' }}>{user.username}</div>
      <div style={{ marginRight: '10px' }}>{user.profile}</div>
      <div>{user.score}</div>
    </div>
  );
};

export default UserCard;
