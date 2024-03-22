import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

export const Products = () => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8000/get-products")
        .then(res=>res.json())
        .then(data=>setProducts(data["list of products"]))
        .catch(err=>console.error("error fetching data", err))
    },[]);
    
    const handleToggleChange = (index)=>{
        console.log("toggle changed",index)
    } 
    
    return (
            <table className="w-100 p-3"> 
                <thead className="bg-dark text-white align-items-center text-center">
                    <tr className="row p-2 align-items-center text-center">
                        <th className="col-md-1">Image</th>
                        <th className="col-md-2">Title</th>
                        <th className="col-md-3">Featured Product</th>
                        <th className="col-md-3">User</th>
                        <th className="col-md-1">City</th>
                        <th className="col-md-1">Delete</th>
                        <th className="col-md-1">View</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product,index)=>{
                        return(
                            <tr className="row p-2 align-items-center text-center border-bottom" key={index}>
                                <td className="col-md-1 p-0">
                                    <img src={product.image} alt={product.title} style={{width : '100%', height:'70px'}} />
                                </td>
                                <td className="col-md-2">{product.title}</td>
                                <td className="col-md-3 justify-content-center d-flex">Featured Product <ToggleButton onClick = {()=>handleToggleChange(index)}/></td>
                                <td className="col-md-3">{product.email}</td>
                                <td className="col-md-1">city</td>
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