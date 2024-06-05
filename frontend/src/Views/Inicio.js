// src/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
    return (
        <div className="container">
            <div className="content">
                <h1>REST API</h1>
                <p>Proporciona una forma estándar para que las aplicaciones web </p>
                <p>se comuniquen entre sí a través de Internet.</p>
                <div className="button-container">
                    <Link to="/button1"><button className="styled-button">RESTAPI</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
