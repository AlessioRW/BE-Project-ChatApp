import { useContext, useEffect } from "react"
import { userContext } from "../App"
import { useNavigate } from "react-router"
import { useAuth0 } from "@auth0/auth0-react";

export function Logout(){
    const {setUsername, setToken} = useContext(userContext)
    const nav = useNavigate()
    const { logout, isAuthenticated } = useAuth0();

    useEffect(() => {
        setToken()
        setUsername()
        if (isAuthenticated){
            logout({ logoutParams: { returnTo: window.location.origin } })
        }
        else {
            nav('/')
        }
        
    },[])

    return (
        <h2>Logging Out</h2>
    )
}