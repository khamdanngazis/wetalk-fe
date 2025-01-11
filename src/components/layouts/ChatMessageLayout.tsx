import React from 'react';
import MessageHeader from '../fragments/MessageHeader';

interface ChatMessageLayoutProps {
  children: React.ReactNode;
  showChatWindow: boolean;
  setShowChatWindow: (open: boolean) => void; 
}

const ChatMessageLayout: React.FC<ChatMessageLayoutProps> = ({ children, showChatWindow, setShowChatWindow }) => {
  return (
    <div
        className={`${
        showChatWindow ? "block" : "hidden sm:block"
        } w-full sm:w-1/2 md:w-3/4 flex flex-col bg-white shadow-lg rounded-l-3xl`}
    >

        <MessageHeader setShowChatWindow={setShowChatWindow} />

        {children}
    </div>
  );
};

export default ChatMessageLayout;
