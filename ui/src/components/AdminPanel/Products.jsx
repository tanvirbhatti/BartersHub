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
    if(products)   {products.forEach((e)=>{console.log(e)})}
   return ( 
   <div className="p-3">
        <h5 className="hadingUnderLiner col-md-1">Products</h5>
        <thead className="row thead-dark align-items-center text-center">
                <th className="col-md-1">Image</th>
                <th className="col-md-2">Title</th>
                <th className="col-md-3">Featured Product</th>
                <th className="col-md-3">User</th>
                <th className="col-md-1">City</th>
                <th className="col-md-1">Delete</th>
                <th className="col-md-1">View</th>
        </thead>
        {products && products.map((product,index)=>{
            return(
                <div className="row p-2 align-items-center text-center" key={index}>
                    <div className="col-md-1 p-0">
                        <img src={product.image} alt={product.title} style={{width : '100%', height:'80px'}} />
                    </div>
                    <div className="col-md-2">{product.title}</div>
                    <div className="col-md-3 justify-content-center d-flex">Featured Product <ToggleButton/>
                    </div>
                    <div className="col-md-3">{product.email}</div>
                    <div className="col-md-1">city</div>
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
            )
        })}
    </div>)
}