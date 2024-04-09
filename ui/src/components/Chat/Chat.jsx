import React, { useEffect, useState } from "react";
import UserImage from '../../Assets/Images/User.png'
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import '../../Assets/Stylesheets/Components/Chat.css'

export const Chat = () => {
    const [users,setUsers] = useState([]);
    const [activeReciver, setActiveReciever] = useState()

    const navigate = useNavigate()
    const usersArray = [
        {
            _id : 1,
            firstName:'Rahul',
        },
        {
            _id : 2,
            firstName:'Ashok',
        },
        {
            _id : 3,
            firstName:'Ajay',
        } 
    ]

    
    const handleUserClick = (_id)=>{
        (users.map(u=>
            {
                if(u._id===_id){
                    setActiveReciever(u)
                }
            }))
    }

    useEffect(()=>{
        setUsers(usersArray);
    },[])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Login required to directly contact the seller");
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);

    return(
        <>
            <div className='container pt-5 pb-5'>
                <div className="d-flex gap-2">
                    <div className="shadow rounded col-md-3 p-3">
                        <h4 className="fw-bold">Chats</h4>
                        <div className="d-flex align-items-center mb-3 gap-1">
                            <div className="col-md-10">
                                <input type="text" className="border p-2 rounded form-control" placeholder="search all users"/>
                            </div>
                            <a href="" className="col-md-2 text-white border-0 text-center border sendButton p-2 rounded">
                                <i className="fa fa-search"></i>
                            </a>
                        </div>
                        {users.map(user=>
                            <div className="selectUserButton">
                                <button 
                                    className=
                                    {
                                        `row border-0 p-0 py-2 align-items-center 
                                            ${activeReciver && activeReciver._id === user._id ? 
                                                'fw-bold bg-dark text-white' : 
                                                'bg-white'
                                            }`
                                    }                                
                                    onClick={handleUserClick.bind(null,user._id)} key={user._id}>
                                    <div className="col-md-3">
                                    {   user.image ?
                                            (<img src={user.image} alt={user.firstName} className="border rounded" style={{width:'100%'}}/>) :
                                            (<img src={UserImage} alt={user.firstName} className="border rounded" style={{width:'100%'}}/>)
                                        } 
                                    </div>
                                    <p className="col-md-9 m-0">{user.firstName}</p>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="shadow rounded col-md-9">
                        <div className="chatHeader">
                            {activeReciver ? 
                                <div className="d-flex p-2 px-3 align-items-center rounded-top border-bottom">
                                    <div className="col-md-1">
                                        {activeReciver.image ?
                                        (<img src={activeReciver.image} alt={activeReciver.firstName} className="chatImage" />) :
                                        (<img src={UserImage} alt={activeReciver.firstName} className="border rounded chatImage"/>)}
                                    </div>
                                    <p className="col-md-10 fw-bold m-0">{activeReciver.firstName}</p>
                                    <div className="col-md-1 d-flex text-end gap-4">
                                            <button className="rounded border-0 bg-white">
                                                <i className="fa fa-search text-danger"></i>
                                            </button>
                                            <button className="rounded border-0 bg-white">
                                                <i className="fa fa-circle-info text-danger"></i>
                                            </button>
                                    </div>
                                </div> :
                                <div>

                                </div>
                            }
                        </div>
                        <div className="chatBody px-4">

                        </div>
                        <div className="chatFooter d-flex px-4 align-items-center mb-3 gap-3">
                            <div className="col-md-11">
                                <input type="text" className="rounded border p-2 form-control" placeholder="Write your message here... " />
                            </div>
                            <button className="rounded border-0 sendButton text-white px-3 py-2">
                                <i className="fa fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}