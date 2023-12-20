const express = require("express")
const cors = require('cors')

const app = express();

app.use(cors())

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
})

const rooms = {}

io.on('connection', (socket) => {
    socket.on('create-room', ({ room, username }) => {
      socket.to(room).emit('message', `${username} created the room`); 
    });
  
    socket.on('join-room', ({ room, username }) => {
      socket.join(room);
      socket.to(room).emit('message', `${username} joined the room`); 
    });
  
    socket.on('send-message', ({ room, username, message }) => {
      io.to(room).emit('message', `${username}: ${message}`); 
    });

    socket.on('leave-room', ({room, username}) => {
        socket.leave(room)
        socket.to(room).emit('message', `${username} left the room`)
    })
  });
  