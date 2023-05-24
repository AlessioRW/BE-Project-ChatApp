import { useContext, useEffect } from "react";
import { userContext } from "../App";

export function TokenWrapper(props){
    const {token, setToken} = useContext(userContext)

    useEffect(() => {
        if (token === 'NONE'){
            if (window.localStorage.getItem('token')){
                setToken(window.localStorage.getItem('token'))
            }
        }
    }, [token])

    return (
    <section className="token-wrapper">
        {props.children}
    </section>
    )
}