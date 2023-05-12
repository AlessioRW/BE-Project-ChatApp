import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { userContext } from "../App"
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from '../utils/axiosInstance'

export function Home(){
    const nav = useNavigate()

    const {token, setToken, username, setUsername} = useContext(userContext)
    const { user, isAuthenticated, isLoading  } = useAuth0();

    useEffect(() => {
        if (user){
            console.log(user)
            axiosInstance.post('/user/auth0', {sub: user.sub, username: user.nickname}).then((res) => {setToken(res.data.token); setUsername(res.data.name)})
            console.log(token)
        }
    }, [isAuthenticated])

    return (
        <section className="page-home">
            <h1>Chat App</h1>

            {token ?
            <section>
                <h2>Logged in as {username}</h2>
                <h2 onClick={() => {nav('/logout')}}>Log Out</h2>
            </section>
            
            :
            <h2 onClick={() => {nav('/login')}}>Go to login</h2>
            }
            
        </section>
    )
}