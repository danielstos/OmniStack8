import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';


export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/devs', {
                username,
                });
                const {_id } =response.data;
        
                history.push({
                    pathname: `/dev/${_id}`,
                    state: { user: response.data }
                  }); 
        }
        catch(err) {
            alert( "usuario não cadastrado!!!");
        }
        
    }

    return (
        <div className="login-contaneir">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

        </div>


    );
}
