import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "../utils/axiosInstance"
import { useContext } from "react"
import { userContext } from "../App"
import { useNavigate } from "react-router"

export function Chat(){
    const [chatDetails, setDetails] = useState({})
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState()
    const {token, setOpenChat, openChat} = useContext(userContext)
    const intervalRef = useRef()
    const nav = useNavigate()
    const chatId = window.location.pathname.split('/').reverse()[0]
    useEffect(() => {
        if (token !== 'NONE'){
            axiosInstance.get(`/chat/${chatId}`,  {headers: { Authorization:token}})
            .then((res) => {setDetails(res.data)})
        }
    }, [])

    useEffect(() => {
        if (chatDetails.id && !intervalRef.id){
            setOpenChat(true)
            intervalRef.id = setInterval(() => {                
                axiosInstance.get(`/chat/${chatId}/${0}/${50}`, {headers: { Authorization:token}})
                .then((res) => {setMessages(res.data.messages)})
            }, 500)
        }
    }, [chatDetails])

    return (
        <section className="page-chat">
            {chatDetails !== {} && 
            <section className="chat">
                <h2 className="chat-name">Chat: {chatDetails.name}</h2>

                {messages !== [] && 
                <section className="messages">
                    {messages.map((message) => {
                        return (
                            <section className="message">
                                <h3>{message.user}: {message.content}</h3>
                            </section>
                        )
                    })}
                </section>
                }
                <label htmlFor="">Message: </label>
                <input type="text" onChange={(e) => {setMessage(e.target.value)}}/>
                <button onClick={() => {
                    if (message.length < 1){
                        return
                    }
                    axiosInstance.post(`/chat/${chatId}`, {message: message}, {headers: { Authorization:token}})
                }}>Send</button>
            </section>
            }
            <button onClick={() => {clearInterval(intervalRef.id);nav('/')}}>Home</button>
        </section>
    )
}