import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { jwtDecode } from "jwt-decode";

import UserImage from '../../Assets/Images/User.png';
import '../../Assets/Stylesheets/Components/Chat.css';

const socket = io.connect(process.env.REACT_APP_API_SERVER);

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
        socket.on('newMessage', (message, callback) => {
            console.log("message received", message);
            if (activeChat && message.listingId === activeChat.listingId) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
            callback("Message received"); // This sends an acknowledgment back to the server.
        });
        return () => {
            socket.off('newMessage');
        };
    }, [activeChat, socket]);


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
            initiateOrFetchChat(listingId, decoded.userId, decoded.firstName, token);
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


    }, [navigate, listingId]);



    const initiateOrFetchChat = async (listingId, userId, firstName, token) => {
        try {
            const response = await axios.get(`http://localhost:8000/chat/listing/${listingId}/user/${userId}/name/${firstName}`, {
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
        const fromUserName = user.firstName;


        let toUserId;
        let toUserName;

        if (listingId) {
            // If there's a listingId, it implies a chat initiation is in process.
            if (Reciver) {
                toUserId = Reciver._id; // Use the receiver's ID if available.
                toUserName = Reciver.firstName;
            } else {
                toUserName = activeChat.toUserName
                toUserId = activeChat.toUserId; // Fall back to activeChat's toUserId if receiver info isn't available.
            }
        } else {
            // This case handles existing chats where the sender and receiver are already determined.
            if (activeChat.fromUserId === user.userId) {
                toUserName = activeChat.toUserName
                toUserId = activeChat.toUserId; // If the logged-in user is the sender, use the toUserId from activeChat.
            } else {
                toUserName = activeChat.fromUserName
                toUserId = activeChat.fromUserId; // If not, use the fromUserId, implying the current user is the receiver.
            }
        }

        
        let messageData = {
            fromUserId: fromUserId,
            fromUserName: fromUserName,
            toUserId: toUserId,
            toUserName: toUserName,
            message: messageInput,
            listingId: activeChat.listingId
        };

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
                                    <img src={UserImage} alt="User" className="border rounded" style={{ width: '100%' }} />
                                </div>
                                <div className="col-md-9">
                                    <p className="m-0">{`${chat.fromUserName} - ${chat.Title}` || 'Listing Name'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shadow rounded col-md-9">
                    <div className="chatBody px-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.fromUserId === user.userId ? 'message-sender' : 'message-receiver'}`}>
                                <div className="message-content">
                                    <strong>{msg.fromUserId === user.userId ? 'You' : msg.fromUserName}</strong>: {msg.message}
                                </div>
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
