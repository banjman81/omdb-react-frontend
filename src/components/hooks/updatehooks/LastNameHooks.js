import { useState, useEffect } from "react";
import { isAlpha } from 'validator'

function LastNameHooks() {
    const [ lastName, setLastName ] = useState("")
    const [ error, setError ] = useState("")

    const [onFocus, setOnFocus] = useState(false)

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
        if(lastName.length === 0){
            setError("")
        }
    }, [lastName, onFocus])

    function handleLastNameOnChange(e){
            setLastName(e.target.value)
        }

    return [lastName, handleLastNameOnChange, error, setOnFocus]
}

export default LastNameHooks;