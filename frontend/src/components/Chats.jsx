import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';


const Chats = () => {
    
    const socket = useMemo (() => io('http://localhost:3000', {
        autoConnect: false,
    }), []);


    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', message);
        setMessage('');
    }


    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to the server');
        });
        socket.on('welcome', (message) => {
            console.log(message);
        });

        socket.on('message received', (data) => {
            console.log(data);
        }
        );

        return () => {
            socket.disconnect();
        };
    }
        , []);

    return (
        <div className='w-full h-screen bg-black'>
            <div className='flex justify-center items-center h-1/4'>
                <h1 className='text-white text-3xl'>WELCOME TO SOCKET IO</h1>
            </div>
            <div className='w-full flex flex-col justify-center items-center '>
                <form onSubmit={handleSubmit}>
                    <label className='text-white text-2xl mb-5 block'>Message</label>
                    <input
                        type="text"
                        placeholder="Enter your message"
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='w-100 h-15 border-2 text-white border-white border-solid rounded-md p-2'
                    />
                    <button type="submit" className='text-white text-2xl border-2 rounded-xl mt-5 p-2 bg-green-400 hover:text-3xl'>Send</button>
                </form>
            </div>

        </div>
    );
}

export default Chats;
