import React  from "react";
import { useState } from "react";

import LoginEmailHooks from "../hooks/loginHooks/LoginEmailHooks"
import LoginPasswordHooks from '../hooks/loginHooks/LoginPasswordHooks'

import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router";


// export const SignIn = () => {
function SignIn(){
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
    
    const [isLoggedin, setIsLoggedin] = useState(false)

    const [email, handleEmailOnChange, emailError, setEmailOnFocus, setEmailOnBlur] = LoginEmailHooks()
    const [password, handlePassowrdOnChange, passwordError, setPasswordOnFocus, setPasswordOnBlur] = LoginPasswordHooks()

    async function handleOnSubmit(e) {
        e.preventDefault()
        
        try {

            console.log(emailError, passwordError)

            let payload = await axios.post("http://localhost:3001/users/login",{
                email,
                password
            })
            console.log(payload.data.token)
            notifySuccess()
            setIsLoggedin(true)
            localStorage.setItem("loginToken", payload.data.token)
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
        <div>{!isLoggedin ?
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
            </div> :
            <Redirect to="/" />}
        </div>
        
    );
}

export default SignIn
