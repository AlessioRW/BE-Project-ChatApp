import {useContext, useEffect, useState} from 'react'
import { fetchConfig } from '../utils/config'
import { axiosInstance } from '../utils/axiosInstance'
import { useNavigate } from 'react-router'
import { userContext } from '../App'
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorText } from '../components/ErrorText'

const {host} = fetchConfig()

export function Login(){
    const [register, setRegister] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sumbitted, setSubmitted] = useState(false)
    const [errorText, setErrorText] = useState('')
    const nav = useNavigate()

    const {setToken, setUsername} = useContext(userContext)
    const { loginWithRedirect } = useAuth0();

    return ( 
        <section className="page-login">
            <section className="inputs">
                <section className="username">
                    <label htmlFor="">Username</label>
                    <input type="text" onChange={(e) => {setUsernameInput(e.target.value);setSubmitted(false)}}/>
                </section>
                
                <section className="password">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={(e) => {setPassword(e.target.value);setSubmitted(false)}} />
                </section>

                {register === true && 
                <section className="confirm-password">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </section>
                }

                <ErrorText state={(sumbitted)} text={errorText} />
            </section>

            <button 
                onClick={() => {
                    if (usernameInput.length < 1 || password.length < 1){
                        setSubmitted(true)
                        setErrorText('Missing username or password')
                        return
                    }

                    if (register){ //registering
                        
                        if (password !== confirmPassword){
                            setErrorText('Passwords do not match')
                            setSubmitted(true)
                            return
                        }

                        axiosInstance.post('/user/register', {username: usernameInput, password})
                            .then((res) => {
                                if (res.status !== 200){
                                    return
                                }
                                setToken(res.data)
                            }).then(setUsername(usernameInput))
                            .then(() => {nav('/')})
                            .catch((error) => {
                                setSubmitted(true)
                                setErrorText(error.response.data.message)
                            })
                    } else { //logging in
                        axiosInstance.post('/user/login', {username: usernameInput, password})
                        .then((res) => {
                            if (res.status !== 200){
                                return
                            }
                            setToken(res.data)
                        }).then(setUsername(usernameInput))
                        .then(() => {nav('/')})
                        .catch((error) => {
                            setSubmitted(true)
                            setErrorText(error.response.data.message)
                        })
                    }
                }}
            > {register ? 'Create Account' : 'Login'} </button>
            

            {register === false ?  
            <h2 
                className='register-btn'
                onClick={() => {
                    setRegister(true)
                }}
                >
                Register
            </h2>
            :
            <h2 
                className='register-btn'
                onClick={() => {
                    setRegister(false)
                }}
                >
                Login
            </h2>
            }

            <h2 onClick={() => loginWithRedirect()}>
                Login with auth0
            </h2>
            
        </section>
    )
}