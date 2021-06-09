const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})

io.on('connection', socket =>{
    console.log('connection made successfully',socket.id)

    socket.on("join",room=>{
        console.log("newuser joined")
        socket.join(room.name)
        io.emit("listen-client",room)
    })

    socket.emit("yourid",socket.id)
    socket.on('message',payload => {
        console.log('Message received on server: ', payload)
        io.emit('message',payload)
    })
    socket.on('custom-message',payload =>{
        socket.to(payload.to).emit('message',payload)
    })
})

server.listen(7000,()=>{
    console.log('I am listening at port: 7000)');
})