import { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
require('dotenv').config()

function CheckToken() {
    const key = process.env.REACT_APP_JWT_SECRET

    function checkJwtToken() {
        let jwtToken = localStorage.getItem("loginToken") 
        
        if(jwtToken){
            
            let decodedToken = jwt.verify(jwtToken, key)
            if(decodedToken.exp < Date.now()/1000){
                localStorage.removeItem("loginToken")
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }
    return { checkJwtToken }
}

export default CheckToken
