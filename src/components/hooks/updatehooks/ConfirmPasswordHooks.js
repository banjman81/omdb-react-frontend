import { useState, useEffect } from "react";
import {isStrongPassword} from 'validator'

function ConfirmPasswordHooks(){
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [onFocus, setOnFocus] = useState(false)

    useEffect(() => {
        if(onFocus){
            if(password.length > 0){
                if(isStrongPassword(password)){
                    setError("")
                }
            }else{
                setError("")
            }
            
        }
    }, [password, onFocus])

    function handlePasswordOnChange(e){
        setPassword(e.target.value)
    }

    return [password, handlePasswordOnChange, error, setOnFocus]
}

export default ConfirmPasswordHooks