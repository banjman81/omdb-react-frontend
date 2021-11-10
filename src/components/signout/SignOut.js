import React from "react";
import { Redirect } from "react-router";

function SignOut(){
    localStorage.removeItem("loginToken")

    return(
        <Redirect to="/" />
    )
}

export default SignOut