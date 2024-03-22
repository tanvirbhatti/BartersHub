import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

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
                            <td className="col-md-2 justify-content-center d-flex">Active User<ToggleButton/></td>
                            <td className="col-md-1">
                                <a>
                                    <i className="fa-solid fa-trash"></i>
                                </a>
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