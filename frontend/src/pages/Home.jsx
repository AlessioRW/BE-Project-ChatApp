import { useNavigate } from "react-router"

export function Home(){
    const nav = useNavigate()


    return (
        <section className="page-home">
            <h1>Chat App</h1>
            <h2 onClick={() => {nav('/login')}}>Go to login</h2>
        </section>
    )
}