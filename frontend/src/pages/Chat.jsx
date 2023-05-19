import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axiosInstance"
import { useContext } from "react"
import { userContext } from "../App"

export function Chat(){
    const [chatDetails, setDetails] = useState({})
    const [messages, setMessages] = useState([])
    const {token} = useContext(userContext)
    useEffect(() => {
        const chatId = window.location.pathname.split('/').reverse()[0]
        axiosInstance.get(`/chat/${chatId}`,  {headers: { Authorization:token}})
            .then((res) => {setDetails(res.data)})
        axiosInstance.get(`/chat/${chatId}/${0}/${50}`, {headers: { Authorization:token}})
            .then((res) => {setMessages(res.data.messages)})
    }, [])

    return (
        <section className="page-chat">
            {chatDetails !== {} && 
            <section className="chat">
                <h2 className="chat-name">Chat: {chatDetails.name}</h2>

                {messages !== [] && 
                <section className="messages">
                    {messages.map((message) => {
                        console.log(message)
                        return (
                            <section className="message">
                                <h3>{message.user}: {message.content}</h3>
                            </section>
                        )
                    })}
                </section>
                }
            </section>
            }
        </section>
    )
}