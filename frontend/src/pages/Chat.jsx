import { useEffect } from "react"
import { axiosInstance } from "../utils/axiosInstance"

export function Chat(){

    useEffect(() => {
        console.log(window.location.pathname.split('/').reverse()[0])
        axiosInstance.get('')
    }, [])

    return (
        <section className="page-chat">
            <h1 className="title"></h1>
        </section>
    )
}