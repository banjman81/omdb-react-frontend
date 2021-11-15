import React from 'react'
import jwt from 'jsonwebtoken'
import axios from "axios";
import {useNavigate, Link} from'react-router-dom'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import '../signup/user.css'


import FirstNameHooks from "../hooks//updatehooks/FirstNameHooks";
import LastNameHooks from "../hooks//updatehooks/LastNameHooks";
import PasswordHooks from "../hooks/updatehooks/PasswordHooks";
import UsernameHooks from "../hooks/updatehooks/UsernameHooks";
import ConfirmPasswordHooks from "../hooks/updatehooks/ConfirmPasswordHooks";

function UpdateProfile() {
    const navigate = useNavigate()
    
    const key = process.env.REACT_APP_JWT_SECRET
    let jwtToken = localStorage.getItem("loginToken") 

    let decodedToken = jwt.verify(jwtToken, key)

    let [firstName, handleFirstNameOnChange, firstNameError, setFirstNameOnFocus] = FirstNameHooks()
    let [lastName, handleLastNameOnChange, lastNameError, setOnFocus] = LastNameHooks()
    let [password, handlePasswordOnChange, passwordError, setPasswordOnFocus] = PasswordHooks()
    let [confirmPassword, handleConfirmPasswordOnChange, confirmPasswordError, setConfirmPasswordOnFocus] = ConfirmPasswordHooks()
    let [username, handleUsernameOnChange, usernameError] = UsernameHooks()

    const notifySuccess = (input) => toast.success(input, {
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
            if(firstName.length === 0){
                console.log(true, 1)
                firstName = decodedToken.firstName
            }
            if(lastName.length === 0){
                console.log(true, 2)
                lastName = decodedToken.lastName
            }
            if(username.length === 0){
                console.log(true, 3)
                username = decodedToken.username
            }
            if(password.length === 0 ){
                console.log(true, 4)
                let payload = await axios.put("http://localhost:3001/users/update-user",
                {
                    firstName,
                    lastName,
                    username
                },
                {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
                notifySuccess("successfully updated user.")
                navigate('/profile')
                
            }else{
                let payload = await axios.put("http://localhost:3001/users/update-user",
                {
                    firstName,
                    lastName,
                    username,
                    password,
                    confirmPassword
                },
                {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
                notifySuccess("successfully updated user.")
                navigate('/profile')
            }
            
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
                        <h1 className="h3 mb-3 fw-normal">Update User Information</h1>
                
                        <div className="form-floating" >
                            <input
                            style={{border : `1px solid ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            name={firstName} 
                            onChange={handleFirstNameOnChange}
                            onFocus={() => setFirstNameOnFocus(true)}
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First name"
                            />
                            <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{firstNameError.length > 0 ? <span style={{color : 'red'}}>{firstNameError}</span>  : ("First Name")}</label>
                        </div>

                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            name={lastName} 
                            onChange={handleLastNameOnChange}
                            onFocus={() => setOnFocus(true)} 
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last name"
                            />
                            <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{lastNameError.length > 0 ? <span style={{color : 'red'}}>{lastNameError}</span>  : ("Last Name")}</label>
                        </div>

                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            name={username} 
                            onChange={handleUsernameOnChange} 
                            // onFocus={() => setUsernameOnFocus(true)} 
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            />
                            <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{usernameError.length > 0 ? <span style={{color : 'red'}}>{usernameError}</span>  : ("Username")}</label>
                        </div>

                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            type="password"
                            name={password} 
                            onChange={handlePasswordOnChange}
                            onFocus={()=> setPasswordOnFocus(true)} 
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            />
                            <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{passwordError.length > 0 ? <span style={{color : 'red'}}>{passwordError}</span>  : ("Password")}</label>
                        </div>

                        <div className="form-floating">
                            <input
                            style={{border : `1px solid ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                            type="password"
                            name={confirmPassword} 
                            onChange={handleConfirmPasswordOnChange}
                            onFocus={()=> setConfirmPasswordOnFocus(true)}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            />
                            <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{confirmPasswordError.length > 0 ? <span style={{color : 'red'}}>{confirmPasswordError}</span>  : ("Comfirm Password")}</label>
                        </div>
                
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            Update
                        </button>
                        <Link to="/profile">
                            <button className="w-100 btn btn-lg btn-danger" style={{marginTop : "20px"}}>
                                Cancel
                            </button>
                        </Link>
                    </form>
                    
                </main>
            </div>
        </div>
    )
}

export default UpdateProfile
