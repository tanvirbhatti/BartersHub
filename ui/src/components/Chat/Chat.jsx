import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { jwtDecode } from "jwt-decode"


import UserImage from '../../Assets/Images/User.png';
import '../../Assets/Stylesheets/Components/Chat.css';


const socket = io('http://localhost:8000');
export const Chat = () => {
    const [users, setUsers] = useState([]);
    const [activeReceiver, setActiveReceiver] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);



    const navigate = useNavigate();
    const { listingId } = useParams();  // Assume listingId is in the URL

    
    useEffect(() => {
        // Here you should replace with actual API call to fetch users
        setUsers([
            { _id: 1, firstName: 'Rahul' },
            { _id: 2, firstName: 'Ashok' },
            { _id: 3, firstName: 'Ajay' }
        ]);
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get-product/${listingId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const productData = await response.json();
                setActiveReceiver(productData.user);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();

        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You need to log in to access chats.");
            navigate('/login');
        }
        else{
            const decoded = jwtDecode(token);
            setUser({
                ...decoded,
                token 
            }); 
        }
    }, [navigate]);

    const handleUserClick = userId => {
        const user = users.find(user => user._id === userId);
        setActiveReceiver(user);
        fetchChatHistory(userId);
    };

    const fetchChatHistory = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/chat/history/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                setMessages(response.data.chatHistory || []);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
            toast.error('Failed to load chat history');
        }
    };


    const handleSendMessage = () => {
        console.log(messageInput)
        if (!messageInput.trim() || !activeReceiver) return;
        const toUserId = activeReceiver._id;
        const messageData = {
            fromUserId:user._id , 
            toUserId: toUserId,
            message: messageInput,
            listingId
        };
        console.log(messageData)

        socket.emit('sendMessage', messageData);
        setMessageInput('');
    };

    return (
        <div className='container pt-5 pb-5'>
            <div className="d-flex gap-2">
                <div className="shadow rounded col-md-3 p-3">
                    <h4 className="fw-bold">Chats</h4>
                    {/* User list */}
                    {users.map(user => (
                        <div className="selectUserButton" key={user._id} onClick={() => handleUserClick(user._id)}>
                            <div className={`row border-0 p-0 py-2 align-items-center ${activeReceiver && activeReceiver._id === user._id ? 'fw-bold bg-dark text-white' : 'bg-white'}`}>
                                <div className="col-md-3">
                                    <img src={UserImage} alt={user.firstName} className="border rounded" style={{width: '100%'}} />
                                </div>
                                <p className="col-md-9 m-0">{user.firstName}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shadow rounded col-md-9">
                    {/* Chat display */}
                    <div className="chatBody px-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                <div>{msg.fromUserId === 'yourUserId' ? 'You' : activeReceiver.firstName}: {msg.message}</div>
                            </div>
                        ))}
                    </div>
                    {/* Message input */}
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
