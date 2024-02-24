import React from 'react'
import Nav from '../../UI/Nav/Nav'
import Footer from '../../UI/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../Signup/Signup.jsx';
import Login from '../Login/Login.jsx';
import Product_Listing from '../Product_Listing/Product_Listing.jsx';
import ListingUpload from '../listing_upload/ListingUpload.jsx';

const Home = () => {
    return (
        <React.Fragment>
            <Nav />
            <BrowserRouter>
                <Routes>
                    <Route path='signup' element={<Signup />} />
                    <Route path='login' element={<Login />} />
                    <Route path='productListings' element={<Product_Listing/>} />
                    <Route path='ListingsUpload' element={<ListingUpload/>} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </React.Fragment>

    )
}

export default Home