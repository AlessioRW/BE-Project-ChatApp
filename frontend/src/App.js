import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { createContext, useState } from 'react';
import { Logout } from './pages/Logout';
import { Chat } from './pages/Chat';
export const userContext = createContext()

function App() {
  const [token, setToken] = useState()
  const [username, setUsername] = useState()

  return (
    <div className="App">
      <userContext.Provider value={{token, setToken, username, setUsername}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/logout' element={<Logout/>}/>
            <Route exact path='/chat/:chatId' element={<Chat/>}/>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
