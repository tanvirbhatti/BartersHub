import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { jwtDecode } from "jwt-decode";

import UserImage from '../../Assets/Images/User.png';
import '../../Assets/Stylesheets/Components/Chat.css';

const socket = io('http://localhost:8000');

export const Chat = () => {
    const [chatSessions, setChatSessions] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [user, setUser] = useState(null);
    const [Reciver, setReciver] = useState(null)

    const navigate = useNavigate();
    const { listingId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You need to log in to access chats.");
            navigate('/login');
            return;
        }

        const decoded = jwtDecode(token);
        setUser(decoded);

        if (listingId) {
            initiateOrFetchChat(listingId, decoded.userId, token);
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/get-product/${listingId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch product");
                    }
                    const productData = await response.json();
                    setReciver(productData.user);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };
    
            fetchProduct();
        } else {
            fetchChatSessions(decoded.userId, token);
        }

        

        return () => socket.off('newMessage');
    }, [navigate, listingId]);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            if (activeChat && (message.listingId === activeChat.listingId)) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });
    
        return () => {
            if (activeChat) {
                socket.emit('leaveChat', activeChat._id);  
            }
        };
    }, [activeChat]);

    const initiateOrFetchChat = async (listingId, userId, token) => {
        try {
            const response = await axios.get(`http://localhost:8000/chat/listing/${listingId}/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200 && response.data) {
                setChatSessions([response.data]);
                setActiveChat(response.data);
                setMessages(response.data.messages || []);
            }
        } catch (error) {
            console.error('Error fetching or initiating chat:', error);
            toast.error('Error fetching or initiating chat');
        }
    };

    const fetchChatSessions = async (userId, token) => {
        try {
            const response = await axios.get(`http://localhost:8000/chat/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setChatSessions(response.data.chats || []);
            }
        } catch (error) {
            console.error('Error fetching chat sessions:', error);
            toast.error('Failed to load chat sessions');
        }
    };

    const handleSendMessage = () => {
        if (!messageInput.trim() || !activeChat) return;
    
        // Default to the current user as the sender
        const fromUserId = user.userId;
    
        // Determine the recipient of the message:
        // If in a chat initiated by the current user, the receiver is the other person in the chat
        // If replying in an existing chat, it depends on the chat context
        const toUserId = listingId ? 
            (Reciver ? Reciver._id : activeChat.toUserId) : // If there's a listingId, we're initiating a chat, so use Reciver._id or fall back to activeChat.toUserId
            (activeChat.fromUserId === user.userId ? activeChat.toUserId : activeChat.fromUserId); // In an existing chat, if the current user is the sender, the receiver is toUserId, otherwise, it's fromUserId
    
        let messageData = {
            fromUserId: fromUserId,
            toUserId: toUserId,
            message: messageInput,
            listingId: activeChat.listingId
        };
    
        // Optimistically update the local messages state before sending the message to the server
        setMessages([...messages, { ...messageData, createdAt: new Date() }]); 
        socket.emit('sendMessage', messageData);
        setMessageInput('');
    };
    
    
    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setMessages(chat.messages);
        socket.emit('joinChat', chat._id);  
    };


    return (
        <div className='container pt-5 pb-5'>
            <div className="d-flex gap-2">
                <div className="shadow rounded col-md-3 p-3">
                    <h4 className="fw-bold">Chats</h4>
                    {chatSessions.map((chat, index) => (
                        <div key={index} className="selectUserButton" onClick={() => handleChatSelect(chat)}>
                            <div className={`row border-0 p-0 py-2 align-items-center ${activeChat && activeChat._id === chat._id ? 'fw-bold bg-dark text-white' : 'bg-white'}`}>
                                <div className="col-md-3">
                                    <img src={UserImage} alt="User" className="border rounded" style={{width: '100%'}} />
                                </div>
                                <div className="col-md-9">
                                    <p className="m-0">{chat.Title|| 'Listing Name'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shadow rounded col-md-9">
                    <div className="chatBody px-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                <div>{msg.fromUserId === user.userId ? 'You' : msg.fromUserId}: {msg.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chatFooter d-flex px-4 align-items-center mb-3 gap-3">
                        <input 
                            type="text" 
                            className="rounded border p-2 form-control" 
                            placeholder="Write your message here..." 
                            value={messageInput}
                            onChange={e => setMessageInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="rounded border-0 sendButton text-white px-3 py-2" onClick={handleSendMessage}>
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
