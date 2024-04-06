import React from 'react'
import Nav from '../../UI/Nav/Nav'
import Footer from '../../UI/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../Signup/Signup.jsx';
import Login from '../Login/Login.jsx';
import ListingUpload from '../listing_upload/ListingUpload.jsx';
import UserProfile from '../UserPage/User_profile.jsx';
import ProductListing from '../ProductListing/ProductListing.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import {AdminPanel} from '../AdminPanel/AdminPanel.jsx'
import ProductDetails from '../ProductDetails/ProductDeatails.jsx';

const Home = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
            <Nav />
                <Routes>
                    <Route path='signup' element={<Signup />} />
                    <Route path='login' element={<Login />} />
                    <Route path='productListings' element={<ProductListing/>} />
                    <Route path='productdetails/:id' element = {<ProductDetails/>}></Route>
                    <Route path='ListingsUpload' element={<ListingUpload/>} />
                    <Route path='user' element={<UserProfile/>} />
                    <Route path='/' element={<HomePage/>} />
                    <Route path='admin' element={<AdminPanel/>} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </React.Fragment>
    )
}

export default Home