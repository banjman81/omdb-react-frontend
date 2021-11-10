import React from "react";
import './Nav.css'
import { Link} from "react-router-dom";
import { useState } from "react";

function Nav(){
    const [search, setSearch] = useState("")
    function handleOnChange(e){
        // e.preventDefault()
        setSearch(encodeURIComponent(e.target.value))
    }

    return(
        <div className="nav">
            <ul>
                <li><Link className="navlink" to="/"><h2>Home</h2></ Link></li>
                <li><Link className="navlink" to="/signup">Sign Up</ Link></li>
                <li><Link className="navlink" to="/signin">Sign In</Link></li>
                <li><Link className="navlink" to="/signout">Sign Out</Link></li>
                <li><Link className="navlink" to="/profile">Profile</Link></li>
            </ul>
            <form action={`/search/${search}`} className="searchbar">
                <input className="form-control" type="text" name={search} onChange={handleOnChange} />
                <button className="btn btn-secondary">Search</button>
            </form>
        </div>
    )
}

export default Nav