import { useState, useEffect } from "react";
import { isAlpha } from 'validator'

function LastNameHooks() {
    const [ lastName, setLastName ] = useState("")
    const [ error, setError ] = useState("")

    const [onFocus, setOnFocus] = useState(false)
    const [onBlur, setOnBlur] = useState(false)

    useEffect(() => {
        if(onFocus) {
            if (lastName.length > 0){
                if (!isAlpha(lastName)){
                    setError("cannot have special character or #")
                }

                if(isAlpha(lastName)){
                    setError("")
                }
            }
        }
        if(onBlur){
            if (lastName.length === 0){
                setError("last name cannot be empty")
            }
        }
    }, [lastName, onFocus, onBlur])

    function handleLastNameOnChange(e){
            setLastName(e.target.value)
        }

    return [lastName, handleLastNameOnChange, error, setOnFocus, setOnBlur]
}

export default LastNameHooks;