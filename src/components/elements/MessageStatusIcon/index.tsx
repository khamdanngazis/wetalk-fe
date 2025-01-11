import React from "react";

interface MessageStatusIconProps {
  status: "1" | "2" | "3";
}

const MessageStatusIcon: React.FC<MessageStatusIconProps> = ({ status }) => {
  const icons = {
    1: "M9 12l2 2 4-4M7 16l6-6m2 2l4-4",
    2: "M7 16l6-6m2 2l4-4m0 6l-4-4",
    3: "M7 16l6-6m2 2l4-4m0 6l-4-4",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ${status == "3" ? "text-teal-500" : "text-gray-700"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d={icons[status]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MessageStatusIcon;
