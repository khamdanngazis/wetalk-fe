// src/elements/ChatRoom.tsx
import React from 'react';

interface ChatRoomProps {
  name: string;
  lastMessage?: string;
  time?: string;
  classname?: string;
  isSelected: boolean;
  onSelect: () => void;
  badgeCount: number; // Add the badgeCount prop
}

const ChatRoom: React.FC<ChatRoomProps> = ({ name, lastMessage, time, classname = '', isSelected, onSelect, badgeCount }) => {
  return (
    <div
      className={`p-4 ${classname} ${isSelected ? 'bg-gray-100' : ''} hover:bg-gray-100 cursor-pointer transition rounded-md mx-2 border-b border-gray-50`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-medium text-gray-700">{name}</p>
        </div>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 truncate max-w-[90%]">
          {lastMessage}
        </p>
        {badgeCount > 0 && (
          <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-white bg-teal-500 rounded-full">
            {badgeCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
