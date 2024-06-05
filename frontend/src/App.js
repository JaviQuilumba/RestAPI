import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Inicio from "./Views/Inicio";
import RESTful from "./Views/ViewRest/RESTful";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/button1" element={<RESTful />} />
            </Routes>
        </Router>
    );
}

export default App;
