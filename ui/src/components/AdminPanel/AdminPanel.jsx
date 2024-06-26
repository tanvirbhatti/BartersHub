import React, { useState, useEffect } from 'react'
import '../../Assets/Stylesheets/Components/AdminPanel.css'
import { Users } from './Users';
import { Products } from './Products';
import {Categories} from './Categories';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode";
import ConfirmationModal from '../../UI/BootstrapModal/ConfirmationModal';
import User from '../../Assets/Images/User.png'
import logout from '../../utills/logoutUtil'
import { useAuth } from "../../contexts/AuthContext";


export const AdminPanel = () =>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const [activeComponent, setActiveComponent] = useState('Products');
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");
    const { setIsLoggedIn } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token and set user data
            const decoded = jwtDecode(token);
            setUser({
                ...decoded,
                token // Store the token if needed for further requests
            });
        }
    }, []);

    const handleLogout = async () => {
        setConfirmMessage("Are you sure you want to logout?");
        setConfirmAction(() => () => {
            logout(user,setUser,setModalOpen, toast, navigate, setIsLoggedIn)
        });
        setModalOpen(true);
      };
    
    
    const renderComponent = () => {
        switch (activeComponent) {
            case 'Products':
                return <Products />;
            case 'Users':
                return <Users />;
            case 'Categories':
                return <Categories/>
            default:
                return null;
        }
    };

    return (
        <>
            <ConfirmationModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={confirmAction}
                    message={confirmMessage}
                    />
            <div className='container pt-5 pb-5'>
                <div className='d-flex'>
                    <div className='shadow rounded CardMargin' style={{width:"20%"}}>
                        <div className='text-center'>
                            {
                                (<>
                                    <img className="avatar img-fluid border rounded mb-3 mt-4" src={User} alt="User Avatar" />
                                    <div  className='pb-3 h-100 w-100'>
                                        <h5>{user && user.firstName} {user && user.lastName}</h5>
                                        <p>Edit Profile</p>
                                        <button className={`border mb-2 rounded-2 Btn ${(activeComponent==='Products')?'active':'' }`} name='products' onClick={() => setActiveComponent('Products')}>Products</button>
                                        <br/>
                                        <button className={`border mb-2 rounded-2 Btn ${(activeComponent==='Users')?'active':'' }`} name='users' onClick={() => setActiveComponent('Users')}>Users</button>
                                        <button className={`border mb-2 rounded-2 Btn ${(activeComponent==='Categories')?'active':'' }`} name='categories' onClick={() => setActiveComponent('Categories')}>Categories</button>
                                        <button className={`border mb-2 rounded-2 Btn `} name='users' onClick={handleLogout}>Logout</button>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                    <div className='shadow rounded p-3' style={{width:"85%"}}>
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}

