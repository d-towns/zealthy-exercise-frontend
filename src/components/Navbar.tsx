import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar: React.FC = () => {
  const {isAdmin, isLoggedIn} = useAuth();

  return (
    <nav className="bg-brutalist-gray-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/'><h1 className="text-2xl">Zealthy Zupport</h1></Link>
        <div>
          { isLoggedIn ?
        isAdmin ? (
          <Link to='/admin'>  
            <button className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-600 transition ease-in-out duration-200 ">Admin Dashboard</button>
          </Link>
        ) : (
          <Link to='/ticket/create'>  
            <button className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-600 transition ease-in-out duration-200 ">Create Ticket</button>
          </Link>
        ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;