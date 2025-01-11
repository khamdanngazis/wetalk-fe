import { faBars, faSignOutAlt, faPlusSquare,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "../../hooks/useLogin";
import ButtonIcon from '../elements/ButtonIcon';

interface SideBarHeaderProps {
    showSearch:boolean;
    setShowSearch: (show: boolean) => void;
    menuOpen: boolean; 
    setMenuOpen: (open: boolean) => void; 
}

const SideBarHeader:React.FC<SideBarHeaderProps> = ({showSearch, setShowSearch, menuOpen, setMenuOpen}) => {
    const user = useLogin();

    const onLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="p-4 border-b">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-teal-600">WeTalk</h2>
                <div className="flex">
                    <div className="flex items-center space-x-2">
                        {!showSearch && (
                        <ButtonIcon
                            onClick={() => setShowSearch(!showSearch)}
                            classname='p-2 text-teal-600 rounded-lg hover:bg-gray-100'
                            icon={faPlusSquare}
                            iconSize='text-xl'
                        />
                        )}
                        {showSearch && (
                        <ButtonIcon
                            onClick={() => setShowSearch(!showSearch)}
                            classname='p-2 text-teal-600 rounded-lg hover:bg-gray-100'
                            icon={faArrowLeft}
                            iconSize='text-xl'
                        />
                        )}
                    </div>
                    <div className="relative">
                        <ButtonIcon
                            onClick={() => setMenuOpen(!menuOpen)}
                            classname='p-2 text-teal-600 rounded-lg hover:bg-gray-100'
                            icon={faBars}
                            iconSize='text-xl'
                        />
                        {/* Dropdown Menu */}
                        {menuOpen    && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                            <div className="p-3 border-b text-gray-600">
                                <span className="block text-sm">Logged in as</span>
                                <span className="block text-lg font-semibold">{user?.username}</span>
                            </div>
                            <ButtonIcon
                                onClick={onLogout}
                                classname='w-full px-4 py-2 text-left text-rose-600 hover:bg-gray-100'
                                icon={faSignOutAlt}
                                text="Logout"
                            />
                            </div>
                        )}
                    </div>   
                </div>                   
            </div>
        </div>
    )
}

export default SideBarHeader;
