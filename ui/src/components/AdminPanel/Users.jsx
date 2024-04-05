import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import {toast} from 'react-toastify';
import ConfirmationModal from "../../UI/BootstrapModal/ConfirmationModal"; // Import the new modal component

export const Users = () => {
    const [users,setUsers] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");

    useEffect(()=>{
        fetch('http://localhost:8000/admin/users')
        .then(res => res.json())
        .then(data=>{
            setUsers(data.users)
        })
        .catch(err=>console.error("error fetching users",err))
    },[]);
    
    const token = localStorage.getItem('token');
    const handleToggleChange = (toggleState, userId, userFirstName) => {
        // Handle the toggle state change according to the toggleState
        if (toggleState) {
            // If toggled on, ask for confirmation to disable user
                setConfirmAction(()=> ()=>disableUser(userId,token));
                setConfirmMessage(`Are you sure you want to DEACTIVATE User ${userFirstName} ?`)
                setModalOpen(true)
        } else {
            // If toggled off, ask for confirmation to enable user
                setConfirmAction(()=> ()=>enableUser(userId,token));
                setConfirmMessage(`Are you sure you want to ACTIVATE User ${userFirstName} ?`)
                setModalOpen(true)
        }
    }

    const deleteUser = (userId, userFirstName)=>{
        setConfirmMessage(`Are you sure you want to DELETE the User ${userFirstName}`);
        if(!token){
            toast.error("Authentication token not found. Please login again")
            return;
        }

        setConfirmAction(()=> ()=> {
            fetch(`http://localhost:8000/admin/delete-user/${userId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                toast.success(data.message)
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                setModalOpen(false)
            })
            .catch(err=>console.error("error deleteing the product",err));
            setModalOpen(false)
        });
        setModalOpen(true)
    }

    const disableUser = (userId,token)=>{
        fetch(`http://localhost:8000/admin/disable-user/${userId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message)
            setModalOpen(false)
        })
        .catch(err => console.error("error removing from featured collection", err));
    }

    const enableUser = (userId, token)=>{
        fetch(`http://localhost:8000/admin/enable-user/${userId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message)
            setModalOpen(false)
        })
        .catch(err => console.error("error removing from featured collection", err));
    }

    return (
        <div>
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={()=> setModalOpen(false)}
                onConfirm={confirmAction}
                message={confirmMessage}
            />
            <table className="w-100 p-3"> 
                <thead className="bg-dark text-white align-items-center text-center">
                    <tr className="row p-2 align-items-center text-center">
                        <th className="col-md-2">Image</th>
                        <th className="col-md-2">Name</th>
                        <th className="col-md-2">Location</th>
                        <th className="col-md-2">Area Code</th>
                        <th className="col-md-2">Deactivate User</th>
                        <th className="col-md-1">Delete</th>
                        <th className="col-md-1">View</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user,index)=>{
                        return(
                            <tr className="row p-2 align-items-center text-center border-bottom" key={index}>
                                <td className="col-md-2 p-0">
                                    <img src={user.image} alt={user.firstName} style={{width : '100%', height:'70px'}} />
                                </td>
                                <td className="col-md-2">{user.firstName}</td>
                                <td className="col-md-2">{user.city}</td>
                                <td className="col-md-2">{user.areaCode}</td>
                                <td className="col-md-2 justify-content-center d-flex">
                                    <ToggleButton
                                        id={user._id}
                                        initialToggleState={user.disabled}
                                        onToggle={(toggleState) => handleToggleChange(toggleState, user._id, user.firstName)}    
                                        />
                                </td>
                                <td className="col-md-1">
                                    <button className="btn btn-primary" onClick={()=>deleteUser(user._id, user.firstName)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                                <td className="col-md-1">
                                    <a>
                                        <i className="fa-solid fa-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        )
}