import React from "react";
import './Nav.css'
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";

function Nav({user}){
    const [search, setSearch] = useState("")

    let linkTitle1= user ? user.username : "Sign Up"
    let link1 = user ? "/profile" : "/signup"

    let linkTitle2= user ? "Logout" : "Sign In"
    let link2 = user ? "/signout" : "/signin"

    function handleOnChange(e){
        // e.preventDefault()
        setSearch(encodeURIComponent(e.target.value))
    }

    return(
        <div className="nav">
            <ul>
                <li><Link className="navlink" to="/"><h2>Home</h2></ Link></li>
                <li><Link className="navlink" to={link1}>{linkTitle1}</ Link></li>
                <li><Link className="navlink" to={link2}>{linkTitle2}</Link></li>
            </ul>
            <form action={`/search/${search}`} className="searchbar">
                <input className="form-control" type="text" name={search} onChange={handleOnChange} />
                <button className="btn btn-secondary">Search</button>
            </form>
        </div>
    )
}

export default Nav