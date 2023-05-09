import {useContext, useState} from 'react'
import { fetchConfig } from '../utils/config'
import { axiosInstance } from '../utils/axiosInstance'
import { useNavigate } from 'react-router'
import { userContext } from '../App'
const {host} = fetchConfig()

export function Login(){
    const [register, setRegister] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()

    const {setToken, setUsername} = useContext(userContext)

    return ( 
        <section className="page-login">
            <section className="inputs">
                <section className="username">
                    <label htmlFor="">Username</label>
                    <input type="text" onChange={(e) => {setUsernameInput(e.target.value)}}/>
                </section>
                
                <section className="password">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} />
                </section>

                {register === true && 
                <section className="confirm-password">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" />
                </section>
                }
            </section>

            <button 
                onClick={() => {
                    if (register){ //registering
                        axiosInstance.post('/user/register', {username: usernameInput, password})
                            .then((res) => {setToken(res.data)})
                            .then(setUsername(usernameInput))
                            .then(nav('/'))
                    } else { //logging in
                        axiosInstance.post('/user/login', {username: usernameInput, password})
                        .then((res) => {setToken(res.data)})
                        .then(setUsername(usernameInput))
                        .then(nav('/'))
                    }
                }}
            > {register ? 'Create Account' : 'Login'} </button>
            

            {register === false ?  
            <h2 
                className='register-btn'
                onClick={() => {setRegister(true)}}
                >
                Register
            </h2>
            :
            <h2 
                className='register-btn'
                onClick={() => {setRegister(false)}}
                >
                Login
            </h2>

            }
            
        </section>
    )
}