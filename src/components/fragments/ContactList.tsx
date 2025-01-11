import { useState, useEffect } from "react";
import Input from "../elements/InputForm/Input";
import UserList from "../elements/UserList";
import searchUser from "../../services/search.user.service";
import { User } from "../../types/user";
import { useLogin } from "../../hooks/useLogin";
import { createRoom } from "../../services/create.room.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectRoom } from "../../redux/slices/chatRoomSelected";

interface ContactListProps {
  setShowSearch: (show: boolean) => void;
}

const ContactList: React.FC<ContactListProps> = ({setShowSearch}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token") || "";
  const user = useLogin();
  const userID = user?.user_id || ""; // Ensure `user` is optional
  const [formData, setFormData] = useState({
    search: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectUser = async (id: string) => {
    const selectedUsers = [userID, id];
    try {
     const response = await createRoom(selectedUsers, "", false, token);
     dispatch(selectRoom(response.data));
     setShowSearch(false);
    } catch (err) {
      console.error("Failed to create room:", err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await searchUser(formData.search, token);
        setUsers(userData.data || []); // Ensure `data` exists in the response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (formData.search) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [formData.search, token]);

  return (
    <div>
      <div className="px-4 py-2 mt-1 border-b">
        <Input
          value={formData.search}
          onChange={handleChange}
          name="search"
          type="text"
          placeholder="Search"
          classname="rounded-lg"
        />
      </div>
      {users.map((user) => (
        <div key={user.user_id}>
          <UserList
            name={user.username}
            onClick={() => handleSelectUser(user.user_id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ContactList;
