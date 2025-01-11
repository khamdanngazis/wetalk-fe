import React from 'react';
import SideBarHeader from '../fragments/SideBarHeader';

interface SideBarProps {
  children: React.ReactNode;
  showChatWindow: boolean;
  showSearch:boolean;
  setShowSearch: (show: boolean) => void;
  menuOpen: boolean; 
  setMenuOpen: (open: boolean) => void; 
}

const SideBar: React.FC<SideBarProps> = ({ children, showChatWindow, showSearch, setShowSearch, menuOpen, setMenuOpen }) => {
  return (
     
    <div
        className={`${
        showChatWindow ? "hidden sm:block" : "block"
        } w-full sm:w-1/2 md:w-1/4 bg-white shadow-lg flex flex-col rounded-r-3xl overflow-hidden`}
    >
     {/* Sidebar Header */}
     <SideBarHeader 
       showSearch={showSearch} 
       setShowSearch={setShowSearch} 
       menuOpen={menuOpen} 
       setMenuOpen={setMenuOpen} 
     />

    {children}

    <div className="ml-24 p-2 text-center text-sm font-semibold text-teal-600 fixed bottom-0">
        &copy; {new Date().getFullYear()} We Talk
      </div>
   </div>
  );
};

export default SideBar;
