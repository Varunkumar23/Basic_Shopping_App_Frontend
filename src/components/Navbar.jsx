import { Link } from "react-router";
import { useMyContext } from "../context/MyContext.js";
const Navbar = () => {
  const { count } = useMyContext();
  return (
    <div className="flex px-6 py-6 justify-between bg-gray-400 items-center">
      <p>Shopping App</p>
      <div className="flex items-center">
        <input
          className="px-2 py-1 border border-amber-800 rounded-lg mr-2"
          placeholder="Search..."
        />
        <button className="px-2 py-1 border border-amber-800 rounded-lg bg-amber-700 text-white">
          Search
        </button>
      </div>

      <div className="flex gap-2 text-b">
        <Link to="/profile">Profile</Link>
        <Link to="signup">Signup</Link>
        <p>{count}</p>

      </div>
    </div>
  );
};

export { Navbar };
