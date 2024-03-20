import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

export const Users = () => {
    const [users,setUsers] = useState([])

    useEffect(()=>{
    },[])
   return ( 
    <div className="p-3">
        <div className="row p-2 align-items-center text-center">
                    <div className="col-md-1 p-0">image</div>
                    <div className="col-md-2">first name</div>
                    <div className="col-md-2">city</div>
                    <div className="col-md-2">area code</div>
                    <div className="col-md-3 justify-content-center d-flex">Active User <ToggleButton/>
                    </div>
                    <div className="col-md-1">
                        <a>
                            <i className="fa-solid fa-trash"></i>
                        </a>
                    </div>
                    <div className="col-md-1">
                        <a>
                            <i className="fa-solid fa-eye"></i>
                        </a>
                    </div>
                </div>
    </div>)
}