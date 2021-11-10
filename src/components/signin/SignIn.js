import jwt from 'jsonwebtoken'
import React  from "react";
import { useState, useEffect } from "react";
import {useNavigate} from'react-router-dom'

import LoginEmailHooks from "../hooks/loginHooks/LoginEmailHooks"
import LoginPasswordHooks from '../hooks/loginHooks/LoginPasswordHooks'

import { toast } from "react-toastify";
import axios from "axios";

import CheckToken from '../hooks/CheckToken'

const { checkJwtToken } = CheckToken()

require('dotenv').config()



function SignIn({setUser}){
    let navigate = useNavigate()
    const [email, handleEmailOnChange, emailError, setEmailOnFocus, setEmailOnBlur] = LoginEmailHooks()
    const [password, handlePassowrdOnChange, passwordError, setPasswordOnFocus, setPasswordOnBlur] = LoginPasswordHooks()
    useEffect(() => {
        if(checkJwtToken()){
            navigate('/')
        }
    }, [])
    
    const notifyLogged = () => toast.success('User already signed in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifySuccess = () => toast.success('User successfully signed in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    async function handleOnSubmit(e) {
        e.preventDefault()
        
        try {

            console.log(emailError, passwordError)

            let payload = await axios.post("http://localhost:3001/users/login",{
                email,
                password
            })

            let decodedToken = jwt.verify(payload.data.token, process.env.REACT_APP_JWT_SECRET)

            setUser({
                email: decodedToken.email,
                username : decodedToken.username,
                userid: decodedToken.id
            })
            localStorage.setItem("loginToken", payload.data.token)
            notifySuccess()
            navigate('/')
        }catch(e){
            let arr = []
            console.log(e.response)
            for(let key in e.response.data.error){
                arr.push(e.response.data.error[key])
            }
            console.log(arr)
            if(arr[0].length === 1){
                notifyFailed(e.response.data.error)
            }else{
                arr.map( error => notifyFailed(error))
            }
        }
    }

    return (
        <div>
            <div className="form-div-signin">
                <main className="form-signin">
                    <form onSubmit={handleOnSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign In</h1>
                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${emailError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${emailError.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            name={email} 
                            onChange={handleEmailOnChange}
                            onFocus={()=> setEmailOnFocus(true)} 
                            onBlur={()=> setEmailOnBlur(true)}
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInput">{emailError.length > 0 ? <span style={{color : 'red'}}>Please enter your email</span> : ("Email")}</label>
                        </div>

                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${passwordError.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            type="password"
                            name={password} 
                            onChange={handlePassowrdOnChange}
                            onFocus={()=> setPasswordOnFocus(true)} 
                            onBlur={()=> setPasswordOnBlur(true)}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            />
                            <label htmlFor="floatingInput">{passwordError.length > 0 ? <span style={{color : 'red'}}>Please enter your password</span>  : ("Password")}</label>
                        </div>
                
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            Sign In
                        </button>
                    </form>
                </main>
            </div>
        </div>
        
    );
}

export default SignIn
