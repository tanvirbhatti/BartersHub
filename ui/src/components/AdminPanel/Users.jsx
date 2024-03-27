import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import {toast} from 'react-toastify';

export const Users = () => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(data=>{
            setUsers(data.users)
        })
        .catch(err=>console.error("error fetching users",err))
    },[]);
    
    const token = localStorage.getItem('token');
    const handleToggleChange = (toggleState, userId) => {
        // Update the users state with the new toggle state for the corresponding user
        setUsers(prevUsers => prevUsers.map(user => {
            if (user._id === userId) {
                return { ...user, disabled: toggleState };
            }
            return user;
        }));
        
        // Handle the toggle state change according to the toggleState
        if (toggleState) {
            // If toggled on, ask for confirmation to disable user
            if (window.confirm("Are you sure you want to disable the user?")) {
                disableUser(userId,token);
            }
        } else {
            // If toggled off, ask for confirmation to enable user
            if (window.confirm("Are you sure you want to enable the user?")) {
                enableUser(userId,token);
            }
        }
    }

    const deleteUser = (userId)=>{

        if(!token){
            toast.error("Authentication token not found. Please login again")
            return;
        }

        if(window.confirm("are you sure you want to delete this user?")){
            fetch(`http://localhost:8000/users/delete/${userId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                toast.success(data.message)
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            })
            .catch(err=>console.error("error deleteing the product",err));
        }
    }

    const disableUser = (userId,token)=>{
        fetch(`http://localhost:8000/users/${userId}/disable`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => toast.success(data.message))
        .catch(err => console.error("error removing from featured collection", err));
    }

    const enableUser = (userId, token)=>{
        fetch(`http://localhost:8000/users/${userId}/enable`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => toast.success(data.message))
        .catch(err => console.error("error removing from featured collection", err));
    }

    return (
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
                            <td className="col-md-2 justify-content-center d-flex">Disable User
                                <ToggleButton
                                    initialToggleState={user.disabled}
                                    onToggle={(toggleState) => handleToggleChange(toggleState, user._id)}    
                                />
                            </td>
                            <td className="col-md-1">
                                <button className="btn btn-primary" onClick={()=>deleteUser(user._id)}>
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
        )
}