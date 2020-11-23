import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import Messages from './Messages'
const  socket = socketIOClient('http://localhost:5000');

const MainComponent = () => {
    
    const [message, setMessage] = useState('a ver');
    const [username, setUsername] = useState('mpenas');
    const [room, setRoom] = useState('Berlin');
    
    const [roomjoined, setRoomjoined] = useState('');
    const [users, setUsers] = useState('');
    
    useEffect(() => {
        socket.on('roomUsers', ({room, users}) => {
            setRoomjoined(room);
            setUsers(users);
        });
    });

    const emitMessage = (e) => {
        socket.emit('chat message', message);
        socket.emit('chatMessage', message);
        return false;
    }
    
    const joinRoom = (e) => {
        socket.emit('joinRoom', {username, room});
    }
    
    return(
        <div>
            {
                roomjoined
                ?
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <h3>{`Channel: ${roomjoined}`}</h3>
                            <h3>{`User: ${username}`}</h3>
                            
                            <div>
                                <TextField fullWidth margin="normal" value={message} field="text" onInput={e => setMessage(e.target.value)} id="message" label="Message"/>    
                            </div>
                            <Button margin="normal" variant="contained" onClick={emitMessage}>
                                Send Message
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <div>Users:</div>
                            { users
                                ? 
                                    users.map((user) => { 
                                        return <div id={user.id}>{user.username}</div>
                                    })
                                : null
                            }
                        </Grid>
                        <Messages connection={socket}></Messages>
                    </Grid>
                :
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div>
                                <TextField fullWidth margin="normal" required error helperText="Incorrect entry." value={username} onInput={e => setUsername(e.target.value)} id="username" label="Username" />    
                            </div>
                            <div>
                                <TextField fullWidth margin="normal" value={room} field="text" onInput={e => setRoom(e.target.value)} id="room" label="Room"/>    
                            </div>
                            <Button margin="normal" variant="contained" color="primary" onClick={joinRoom}>
                                Join Room
                            </Button>
                        </Grid>
                    </Grid>   
            }
        </div>
    );
}

export default MainComponent;