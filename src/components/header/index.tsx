import { Link } from "react-router-dom";
import logoImg from "../../assets/logoCar.svg";
import { FiUser, FiLogIn } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { loading, signed, user } = useContext(AuthContext);

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full items-center justify-between max-w-7xl px-4 max-auto">
        <Link to="/">
          <img src={logoImg} alt="logo site" />
        </Link>

        {!loading && signed && (
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <div className="border-2 rounded-full p-1 border-gray-900">
                <FiUser size={24} color="#000" />
              </div>
            </Link>
            <p>
              Hello, <span className="text-red-600">{user?.name}</span>
            </p>
          </div>
        )}
        {!loading && !signed && (
          <Link to="/login">
            <div className="border-2 rounded-full p-1 border-gray-900">
              <FiLogIn size={24} color="#000" />
            </div>
          </Link>
        )}
      </header>
    </div>
  );
};

export default Header;
