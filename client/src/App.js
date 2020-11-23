import React, { useState, useEffect } from "react";
import MainComponent from './components/MainComponent';
import { AppBar, IconButton,  Toolbar, Typography, Container } from '@material-ui/core';
import './App.css';

function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Scrum Pocker
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className="main-container" maxWidth="sm">
                <MainComponent></MainComponent>
            </Container>
        </div>
    );
}

export default App;
