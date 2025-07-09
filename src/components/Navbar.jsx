import { Link } from "react-router";
const Navbar = () => {
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
        <Link>Profile</Link>
        <Link>Signup</Link>
      </div>
    </div>
  );
};

export { Navbar };
