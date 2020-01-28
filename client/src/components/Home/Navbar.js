import React from 'react'
import { NavLink } from 'react-router-dom'

import './Home.scss'
const Navbar = () => {
    return(
        <div className='container'>
        <nav class='nav-bar'>
            <NavLink to ='users' className='links'>Home</NavLink>
            <NavLink to ='users' className='links' >Users</NavLink>
            <NavLink to ='users'  className='links'>About</NavLink>
        </nav>
        </div> 
    )
}


export default Navbar