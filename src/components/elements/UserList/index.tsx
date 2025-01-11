// src/elements/ChatRoom.tsx
import React from 'react';

interface UserListProps {
  name: string;
  classname?: string;
  onClick?: () => void;
}

const UserList: React.FC<UserListProps> = ({ name, classname = '', onClick }) => {
  return (
    <div
      className={`p-4 ${classname} hover:bg-gray-50 cursor-pointer transition rounded-md mx-2  border-b`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">{name}</p>
      </div>
    </div>
  );
};

export default UserList;