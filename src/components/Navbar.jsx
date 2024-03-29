import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="flex justify-between bg-opacity-75 fixed top-0 left-0 right-0 z-50 py-3 px-5">
      <Link to={"/"} className="text-3xl font-bold text-red-600 uppercase">
        Netflix
      </Link>

      {user?.email ? (
        <div>
          <button
            className="text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="ml-4 text-white px-3 py-2 rounded border bg-red-600 border-red-600 hover:bg-white hover:text-black transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="ml-4 text-white px-3 py-2 rounded border bg-red-600 border-red-600 hover:bg-white hover:text-black transition duration-300"
            onClick={() => navigate("/sign-up")}
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
