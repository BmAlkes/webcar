import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../service/firebase";

const PanelHeader = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <div className="w-full bg-red-600 h-10 flex items-center text-white font-medium gap-4 rounded-lg px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Register new car</Link>
      <button onClick={handleLogout} className="ml-auto">
        Logout
      </button>
    </div>
  );
};

export default PanelHeader;
