
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignOut({setUser}){
    console.log('out1')
    let navigate = useNavigate()
    useEffect(() => {
        setUser(null)
        localStorage.removeItem("loginToken")
        navigate('/signin')
    }, [])
    

    return(
        <div></div>
    )
}

export default SignOut