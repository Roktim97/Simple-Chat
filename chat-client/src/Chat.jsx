import { useState, useEffect, useRef } from "react"
import io from 'socket.io-client'

const Chat = (prop) => {
    const username = prop.data.username
    const room = prop.data.room
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        newSocket.emit('join-room', {room, username})
        setSocket(newSocket);

        return () => newSocket.close();
      }, [room, username]);

      useEffect(() => {
        if (socket) {
          socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          });
        }
      }, [socket]);

      const handleSendMessage = () => {
        if (socket && message && username && room) {
          socket.emit('send-message', { room, username, message });
          setMessage('');
          scrollToBottom
        }
      };

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const leaveRoom = () => {
        socket.emit('leave-room', {room, username})
        prop.leave()
    } 

  return (
    <>
        <div className="w-[90%] h-[80%] md:w-[70%] xl:w-[50%] shadow-custom relative bg-zinc-900 rounded-xl flex flex-col">
            <button onClick={leaveRoom} className="bg-red-700 self-end px-3 mt-1  rounded-xl shadow-custom text-lg hover:scale-95">Leave</button>
            <div className="h-[89%] overflow-scroll flex flex-col max-w-100">
                {messages.map((msg, index) => (
                    <p className="py-2 px-5 shadow-custom m-4 rounded-xl" key={index}>{msg}</p>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <div className="absolute bottom-0 flex justify-between items-center w-full">
                <input className="p-3 w-5/6 rounded-xl" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
                <button className='py-2 px-6 w-28 rounded-xl bg-green-700 shadow-custom text-lg hover:scale-95' onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    </>
  )
}

export default Chat