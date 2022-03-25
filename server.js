const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3001;

http.listen(PORT, ()=>{
    console.log(`server is live on PORT: ${PORT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})


const io =require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log('connected to socket!');
    socket.on('send', (message)=>{
        socket.broadcast.emit('send', message);
    });

})
