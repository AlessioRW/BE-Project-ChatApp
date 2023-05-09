import { useContext } from "react"
import { useNavigate } from "react-router"
import { userContext } from "../App"

export function Home(){
    const nav = useNavigate()

    const {token, username} = useContext(userContext)

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