import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from '../elements/ButtonIcon';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface MessageHeaderProps {
  setShowChatWindow: (open: boolean) => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ setShowChatWindow }) => {
  const selectedRoom = useSelector(
    (state: RootState) => state.selectedRoom.selectedRoom
  );

  return (
    <div className="p-2 bg-teal-600 text-white flex items-center rounded-tl-3xl">
      <ButtonIcon
        icon={faArrowLeft}
        onClick={() => setShowChatWindow(false)}
        classname="sm:hidden p-2 text-white"
      />
      <div className="ml-4">
        {selectedRoom ? (
          <>
            <h3 className="text-md font-medium">{selectedRoom?.name}</h3>
            <p className="text-sm text-teal-200">Online</p>
          </>
        ) : (
          <p className="text-sm font-semibold p-2 inline-flex items-center">
            <span className="mr-2 text-xl"></span>
            Select a room to start chatting
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageHeader;
