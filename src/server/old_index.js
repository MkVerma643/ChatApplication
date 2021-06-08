const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(8080, {
    cors: {
        origin: ['http://localhost:3000']
    }
})
//port 
// const port = 8080
app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
})

// const getVisitors = () => {
//     let clients = io.socket.clients().connected
//     let sockets = Object.values(clients)
//     let users = sockets.map(s => s.user)
//     return users
// }

// const emitVisitors = () =>{
//     io.emit("Visitors", getVisitors())
//     console.log(allgetVisitors())
// }


io.on("connection", socket =>{
    console.log("a user just connected by id: ",socket.id)
    // var online = Object.keys(io.engine.clients)
    // io.emit("getonline", JSON.stringify(online))

    socket.emit("yourid",socket.id)
    socket.emit("test","workingg... fine")
    socket.on("send-message", body => {
        io.emit("message send" ,body)
        console.log("its >>>>.......",body)
    })

    // socket.on("new_visitor", user=>{
    //     console.log("New Visitor,", user)
    //     socket.user = user
    //     emitVisitors()
    // })

    
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

// http.listen(port, () => {
//     console.log(`listening on *: ${port}`)
// })
