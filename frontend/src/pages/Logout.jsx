import { useContext, useEffect } from "react"
import { userContext } from "../App"
import { useNavigate } from "react-router"

export function Logout(){
    const {setUsername, setToken} = useContext(userContext)
    const nav = useNavigate()

    useEffect(() => {
        setToken()
        setUsername()
        nav('/')
    },[])

    return (
        <h2>Logging Out</h2>
    )
}