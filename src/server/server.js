const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})
let users = []
const messages = {
    general: []
}

io.on('connection', socket =>{
    console.log('connection made successfully',socket.id)

                //test
                socket.on("test",test => {
                    console.log("testtttt success",test)
                })
                //test

    //new user joined
    socket.on("join",user=>{
        payload = {
            name: user,
            id: socket.id
        }
        users.push(payload)
        console.log("user joined..",users)
        io.emit("newuser",users)
    })
    //new user joined

    //joining room
    socket.on('join room',(roomName) => {
        console.log("room joineddd",roomName)
        socket.join(roomName)
        // cb(messages[roomName])
    } ) 
    //joining room 
    
    //Send Message 
    socket.on('send message', ({content,to,sender,chatName, isChannel}) => {
        console.log("sending message.....",content," to: ",to)
        if(isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            }
            socket.to(to).emit('new message',payload)
        }  else {
            const payload = {
                content,
                chatName: sender,
                sender
            }
            socket.to(to).emit("new message", payload)
        }
        if(messages[chatName]) {
            messages[chatName].push({
                sender,
                content,
                date: new Date()
            })
        }
    })
    //Send Message 

    socket.on("disconnect", () => {
        users = users.filter(u => u.id !== socket.id);
        console.log("user disconnected",users)
        io.emit("listen-client",users)
    })
})

server.listen(8080,()=>{
    console.log('I am listening at port: 7000)');
})





//  OLD CODE FOR JUST IN CASE

// socket.emit("yourid",socket.id)

// socket.on('message',payload => {
//     console.log('Message received on server: ', payload)
//     io.emit('message',payload)
// })
// socket.on('custom-message',payload =>{
//     console.log("send mesg to...",payload.to)
//     socket.to(payload.to).emit('message',payload)
    
// })