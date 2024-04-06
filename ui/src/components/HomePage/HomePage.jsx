import React from 'react'
import "../../Assets/Stylesheets/Components/Product_Home.css"
import Testimonials from './Testimonials';
import Hero from "../../Assets/Images/heroImage.png";
import FeaturedProducts from './FeaturedProducts';
import RecentlyListedProducts from './RecentlyListedProducts';
import Categories from './Categories';
import GradientButton from '../../UI/GradientButton/GradientButton';
import { useNavigate } from 'react-router';

const ProductHome = () => {

    const navigate = useNavigate()
    const handleAddProduct= ()=>{
        navigate('/ListingsUpload')
    }

    return (
        <>
            <div className="row p-5 align-items-center no_gutter">
                <div className="col-md-7">
                    <h4 className='text-dark'><b>Empower your exchanges, cultivate connections, thrive with Barters Hub today!</b></h4>
                    <div className='pt-3'>
                        <div className="col-md-3">
                            <GradientButton text="Add Your Product" rounded={true} onClick={handleAddProduct}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 text-center">
                    <img src={Hero} className="img-fluid w-100" alt="" />
                </div>
            </div>

            <Categories/>

            <FeaturedProducts/>

            <RecentlyListedProducts/>
            
            <Testimonials />

        </>
    )
}

export default ProductHome
