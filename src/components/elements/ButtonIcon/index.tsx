import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  classname?: string;
  disabled?: boolean;
  icon: IconDefinition,
  iconSize?: string;
  text?: string;
}

const ButtonIcon: React.FC<ButtonProps> = ({onClick, classname = '' ,icon, disabled=false, text, iconSize }) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center ${classname} transition duration-200`}
      disabled={disabled}
    >
     <FontAwesomeIcon className={iconSize} icon={icon} />
     {text && <span className="ml-2">{text}</span>}
    </button>
  );
};

export default ButtonIcon;
