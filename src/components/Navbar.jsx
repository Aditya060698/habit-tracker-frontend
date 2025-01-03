import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex">
            <Link to="/home" state={props} className="font-bold mr-4">
              Home
            </Link>
            <Link to="/analytics" state={props} className="font-bold">
              Analytics
            </Link>
          </div>
          <button type="button" className="font-bold" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
