import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

function Nav(){
    return(
        <div className="nav">
            <ul>
                <li><Link className="navlink" to="/"><h2>Home</h2></ Link></li>
                <li><Link className="navlink" to="/signup">Sign Up</ Link></li>
                <li><Link className="navlink" to="/signin">Sign In</Link></li>
                <li><Link className="navlink" to="/signout">Sign Out</Link></li>
                <li><Link className="navlink" to="/profile">Profile</Link></li>
            </ul>
            <div className="searchbar">
                <input className="form-control" type="text" name="" id="" />
                <button className="btn btn-secondary">Search</button>
            </div>
        </div>
    )
}

export default Nav