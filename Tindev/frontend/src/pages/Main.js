import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png'


export default function Main({ match, location }) {
    console.log(1, '#############', location.state.user);
    const [users, setUsers] = useState([]);
    const [macthDev, setMatchDev] = useState(null);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('./devs', {
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id])
    useEffect(() => {

        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });
        socket.on('macth', dev => {
            setMatchDev(dev);
        })
    }, [match.params.id]);

    async function handLeLike(id) {

        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handLeDisLike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }
    return (
        <div className="main-container">
            <Link to="/" >
                <img src={logo} alt="Tindev" />
            </Link>
        
            <h4 className="username" type="button">{location.state.user.user}</h4>
           
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id} >
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handLeDisLike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handLeLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>

                        </li>
                    ))}

                </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
            {macthDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="its a match" />

                    <img className="avatar" src={macthDev.avatar} alt="" />
                    <strong>{macthDev.name}</strong>
                    <p>{macthDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>



                </div>
            )}
        </div>
    )
}