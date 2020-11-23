var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const formatMessage = require('./utils/message');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const port = process.env.PORT || 5000;
const botName = 'Mati Admin';

let interval;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');


    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    
    socket.on('joinRoom', ({username, room}) => {
        
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room);
        
        console.log(`${user.username} has connectod to ${user.room}`);
        
        socket.emit('message', formatMessage(botName, 'Welcome to the Pocker Scrum!'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the Session`));

        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
         });
    });

    socket.on('disconnect', () => {
        
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the Session`));
            console.log(`${user.username} disconnected`);    
        }
    });
    
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
        console.log(msg);
    });
    
});

http.listen(port, () => {
  console.log(`listing on ${port}`);
});