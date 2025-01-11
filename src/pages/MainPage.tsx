import { useState } from "react";
import ContactList from "../components/fragments/ContactList";
import ChatRoomList from "../components/fragments/ChatRoomList";
import ChatMessage from "../components/fragments/ChatMessage";
import SideBar from "../components/layouts/SideBar";
import ChatMessageLayout from "../components/layouts/ChatMessageLayout";

const Main = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);
   

    const hideMenu = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }

    
    return (
      <div className="flex h-screen" onClick={hideMenu}>
          <SideBar
            showChatWindow={showChatWindow}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          >
              {showSearch ? (
                <ContactList setShowSearch={setShowSearch} />
              ) : (
                <ChatRoomList 
                  setShowChatWindow={setShowChatWindow}
                  />
              )}
          </SideBar>
  
          <ChatMessageLayout
            showChatWindow={showChatWindow}
            setShowChatWindow={setShowChatWindow}
          >
    
              <ChatMessage />
          </ChatMessageLayout>
            

      </div>
    );
};

export default Main;
