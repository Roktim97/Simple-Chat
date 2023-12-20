import './App.css'
import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'

function App() {
  const [inputType, setInputType] = useState(null)
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [inputValues, setInputValues] = useState({
    username: '',
    room: ''
  })

  const createRoom = () => {
    setInputType("Create")
  }

  const joinRoom = () => {
    setInputType("Join")
  }

  const leave = () => {
    setIsChatVisible(false)
  }

  const handleInputs = (e) => {
    setInputValues({...inputValues, [e.target.name]: e.target.value})
  }
  const enterRoom = () => {
    if(inputValues.username.trim()!=='' && inputValues.room.trim()!==''){
      const socket = io('http://localhost:3000')
      if(inputType==='Create') {
        socket.emit('create-room', inputValues)
      }
      setIsChatVisible(true)
    }
  }

  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-10'>
      <h1 className='text-4xl font font-bold text-teal-950 rounded-xl uppercase border-4 border-teal-950 p-2 bg-white'>Simple Chat</h1>
      {
        !isChatVisible ?
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 justify-center items-center'>
            <button className='py-2 px-6 shadow-custom text-lg hover:scale-95' onClick={createRoom}>Create Room</button>
            <button className='py-2 px-6 shadow-custom text-lg hover:scale-95' onClick={joinRoom}>Join Room</button>
          </div>
          {
            inputType ?
            <div className='flex gap-2'>
              <input
                name='username'
                className='p-2 rounded-lg shadow-custom'
                placeholder='Username'
                value={inputValues.username}
                onChange={handleInputs}
              />
              <input
                name='room'
                className='p-2 rounded-lg shadow-custom'
                placeholder='Room name'
                value={inputValues.room}
                onChange={handleInputs}
              />
              <button onClick={enterRoom} className='py-2 px-6 shadow-custom text-lg hover:scale-95'>{ inputType==="Create"? "Create" : "Join" }</button>
            </div> :
            ''
          }
        </div> :
        <Chat data={inputValues} leave={leave}/>
      }
    </div>
    </>
  )
}

export default App
