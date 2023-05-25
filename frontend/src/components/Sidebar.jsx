
export function Sidebar({username, nav, token, inChat, intervalRef}){
    return (
        <section className="side-bar">
            <h1 className="title">Chat App</h1>
            <button onClick={() => {clearInterval(intervalRef.id);nav('/')}}>Home</button>
                <section className="login-container">
                {token !== 'NONE' ?
                
                    <h2 onClick={() => {
                        nav('/logout')
                        }}>Logged in as {username}, Click to Log Out</h2>
                
                
                :
                <h2 onClick={() => {nav('/login')}}>Go to login</h2>
                }
            </section>
        </section>
    )
}