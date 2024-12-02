import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dropdown = ( {setCurrentUser, currentuser, isSett, sett, setShowCart, showCart, isOpen, setIsOpen}) => {
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlesignout = () => {
    localStorage.removeItem('fulltossaccesstoken');
    setCurrentUser(null);

    toggleDropdown();
    navigate('/login');

  };

  return (
    <div className="relative inline-block text-left z-10">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="profile" className="w-7 h-7 rounded-full bg-grey shadow-lg" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <span className="block px-4 py-2 text-sm text-gray-700 font-mono overflow-hidden whitespace-nowrap">
              {currentuser.name}
            </span>
            <Link  onClick={()=> {toggleDropdown(); isSett(true); setShowCart(false)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link  onClick={()=> {toggleDropdown();setShowCart(true); isSett(false)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cart
            </Link>
            <button onClick={handlesignout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Sign out
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
