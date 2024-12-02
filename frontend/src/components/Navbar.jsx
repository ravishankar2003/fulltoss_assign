import React from 'react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const Navbar = ({setCurrentUser, currentuser, isSett, sett, setShowCart, showCart}) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className='bg-slate-100 p-4 flex justify-between  items-center  h-14  shadow-md border-2 m-1 mx-2 rounded-3xl border-slate-200'>
      <div className=' text-xl font-semibold '>
        <Link to = '/' onClick={()=> {isSett(false), setShowCart(false); setIsOpen(false)}}>
        <h1>Full Toss</h1>
        </Link>
        
      </div>
      <div>
        <Dropdown setCurrentUser={setCurrentUser} currentuser={currentuser} isSett={isSett} 
        sett={sett} setShowCart={setShowCart} showCart={showCart} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
