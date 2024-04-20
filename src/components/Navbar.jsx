import './Navbar.css';
import logoUni from '../assets/Logo_de_la_Universidad_El_Bosque.png';
import React, { useState, useEffect } from 'react';


function Navbar({ menuItems }) {
    return(
        <>
        {/* Font */}
        <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="Navbar.css"></link>
        
           <div className='navbar_container'>
            <nav>
                <img className='logo_menu' src={logoUni} alt="Logo de la Universidad el Bosque"/>
                <ul className='navbar_menu'>
                    {menuItems.map((item, index) => (
                        <li key={index} 
                            className="navbar_wrapper transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-lime-400 duration-300 rounded">
                            {item.icon}
                            <button className='text-white'>{item.name}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            
           </div>
        </>
    )
}

export default Navbar;