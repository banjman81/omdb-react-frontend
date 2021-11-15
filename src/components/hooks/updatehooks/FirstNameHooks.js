import { useState, useEffect } from "react";
import { isAlpha } from 'validator'

function FirstNameHooks() {
    const [ firstName, setFirstName ] = useState("")
    const [ error, setError ] = useState("")

    const [onFocus, setOnFocus] = useState(false)

    useEffect(() => {
        if(onFocus) {
            if (firstName.length > 0){
                if (!isAlpha(firstName)){
                    setError("cannot have special character or #")
                }

                if(isAlpha(firstName)){
                    setError("")
                }
            }
        }
    }, [firstName, onFocus])

    function handleFirstNameOnChange(e){
            setFirstName(e.target.value)
        }

    return [firstName, handleFirstNameOnChange, error, setOnFocus]
}

export default FirstNameHooks;