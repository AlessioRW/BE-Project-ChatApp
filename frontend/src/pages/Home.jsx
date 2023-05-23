import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { userContext } from "../App"
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from '../utils/axiosInstance'

export function Home(){
    const nav = useNavigate()
    const {token, setToken, username, setUsername, openChat, setOpenChat } = useContext(userContext)
    const { user, isAuthenticated, isLoading} = useAuth0();
    const [creatingChat, setCreatingChat] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [newUsers, setNewUsers] = useState([username])
    const [chatName, setChatName] = useState('')
    const [chats, setChats] = useState([])

    useEffect(() => {
        if (user){
            axiosInstance.post('/user/auth0', {sub: user.sub, username: user.nickname}).then((res) => {setToken(res.data.token); setUsername(res.data.name)})
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (token){
            axiosInstance.post('/user/chats', {token: token}).then((res) => {setChats(res.data.chats)})
        }
    }, [token])

    useEffect(() => {
        if (openChat === true){
            setOpenChat(false)
        }
    }, [])

    return (
        <section className="page-home">
            <h1>Chat App</h1>
            {token && 
            <section className='chat-container'>
                {
                chats.length > 0 ? 
                <section className='chat-list'>
                    <h2>Chats:</h2>
                    {chats.map((chat) => {
                        return (
                            <section className='chat-item'>
                                <button onClick={() => {nav(`/chat/${chat.id}`)}}>{chat.name}</button>
                            </section>
                        )
                    })}
                </section>
                :
                <h2>No chats available</h2>
                
                }
                {!creatingChat ?
                    <button onClick={() => {setCreatingChat(true)}}>New Chat</button>

                    :

                    <section className="new-chat">
                        <section className="new-users">
                            <h4>Chat Members:</h4>
                            {newUsers.map((username) => {
                                return (
                                    <p>{username}</p>
                                )
                            })}
                            <label htmlFor="">Add Chat Member:</label>
                            <input onChange={(e) => {
                                setUserInput(e.target.value)
                            }}></input>
                            <button onClick={() => {
                                setNewUsers(newUsers => [...newUsers, userInput])
                                
                            }}>Add</button>
                        </section>
                        
                        <label htmlFor="">Chat Name:</label>
                        <input type="text" onChange={(e) => {setChatName(e.target.value)}}/>
                        <button onClick={() => {
                            axiosInstance.post('/chat/new', {headers: { Authorization:token}, members: newUsers, name: chatName})
                        }}>Create Chat</button>
                    </section>
                }

                
                
            </section>
            }

            {token ?
            <section>
                <h2 onClick={() => {nav('/logout')}}>Logged in as {username}, Click to Log Out</h2>
            </section>
            
            :
            <h2 onClick={() => {nav('/login')}}>Go to login</h2>
            }
            
        </section>
    )
}