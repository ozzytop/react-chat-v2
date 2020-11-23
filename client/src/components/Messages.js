import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
const  socket = socketIOClient('http://localhost:5000');

class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
        this.props.connection.on('message', message => {
            console.log(message);
            /*
            this.setState((state) => {
                return {}
            });*/
            this.setState(prevState => ({
                messages: [...prevState.messages, message]
            }))
        })
    }
    
    render() {
        return(
            <div>
                <ul>
                    {this.state.messages.map((message, idx) => { 
                        return <li id={idx}>{message.username}: {message.text} at {message.time}</li>
                    })}
                </ul>
            </div>
        )
    }
    
}
export default Messages;