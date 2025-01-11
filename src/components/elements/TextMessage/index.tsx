import React from "react";
import { formatDateToTime } from "../../../utils/formatTime";
import MessageStatusIcon from "../MessageStatusIcon";
import { MessageStatus } from "../../../types/message";

interface TextMessageProps {
  message: {
    id: string;
    text: string;
    type: "incoming" | "outgoing";
    time: string;
    status: MessageStatus;
  };
  isLastMessage: boolean;
  lastMessageRef?: React.Ref<HTMLDivElement>;
}

const TextMessage: React.FC<TextMessageProps> = ({ message, isLastMessage, lastMessageRef }) => {
  return (
    <div
      className={`flex items-start space-x-2 ${message.type === "outgoing" ? "justify-end" : ""}`}
      ref={isLastMessage ? lastMessageRef : undefined}
    >
      <div
        className={`px-4 py-1 rounded shadow-md ${
          message.type === "outgoing" ? "bg-gray-200" : "bg-white"
        } text-gray-900`}
      >
        <div className="flex items-center space-x-2">
          <p className="text-sm -mt-1">{message.text}</p>
          <div className="flex items-center space-x-1 mt-3 text-xs">
            <span className="text-gray-500">{formatDateToTime(message.time)}</span>
            {message.type === "outgoing" && message.status && (
              <MessageStatusIcon status={message.status} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
