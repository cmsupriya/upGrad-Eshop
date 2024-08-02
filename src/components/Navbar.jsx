import React from 'react'
import './Navbar.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <AppBar>
                <div className='logo'>
                    <div>
                        <ShoppingCartIcon></ShoppingCartIcon>
                    </div>
                    <div>
                        upGrad E-Shop
                    </div>
                </div>
                <div className="search">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        //onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <div className='menu'>
                    <ul>
                        <li>
                            <Link to=''>Home</Link>
                        </li>
                        <li>
                            <Link to=''>Add Product</Link>
                        </li>
                        <li>
                        <Link to="/Login">Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>SignUp</Link>
                        </li>
                    </ul>
                </div>
            </AppBar>
        </div>
    )
}

export default Navbar