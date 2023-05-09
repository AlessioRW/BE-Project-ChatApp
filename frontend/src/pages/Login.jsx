import {useState} from 'react'

export function Login(){
    const [create, setCreate] = useState(false)

    return ( 
        <section className="page-login">
            <section className="inputs">
                <section className="username">
                    <label htmlFor="">Username</label>
                    <input type="text" />
                </section>
                
                <section className="password">
                    <label htmlFor="">Password</label>
                    <input type="password" />
                </section>

                {create === true && 
                <section className="confirm-password">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" />
                </section>
                }
            </section>
            

            {create === false ?  
            <h2 
                className='register-btn'
                onClick={() => {setCreate(true)}}
                >
                Register
            </h2>
            :
            <h2 
                className='register-btn'
                onClick={() => {setCreate(false)}}
                >
                Login
            </h2>

            }
            
        </section>
    )
}