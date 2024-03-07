import React from 'react';
import './UserProfile.css';

const _items = [
    {
        id: 1,
        imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 2,
        imageUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 3,
        imageUrl: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 4,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIYJ0Y6KCRkAXnRZ5XnOcGI2C92ggGWMqClpyVkm2fN4hcQU6Ex7VCZPWMs_22MSXA5HQ&usqp=CAU',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    }
]
const user = {
    username: 'John Doe',
    location: 'Waterloo',
    avatarUrl: 'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=1024x1024&w=is&k=20&c=K2vyMGGU4E4iSfkfTwOGNgG-x-WBadv2anHPFvONnOc=',
    rating: 4.5
};

const UserProfile = () => {
    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-lg-3">
                <div className="">
                    <div className=" text-center">
                        <img className="avatar img-fluid rounded-circle mb-3" src={user.avatarUrl} alt="User Avatar" />
                       <div className='border h-100 w-100'> 
                        <h5>{user.username}</h5>
                        <p className="location">{user.location}</p>
                        <p className="location">Edit Profile</p>


                        <p className="user-rating">User Rating: {user.rating}</p>

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-9">
                <div className=" p-4">
                    <h3 className="mb-4"><b>Listings</b></h3>
                    <div className="row">
                        {_items.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={product.imageUrl} alt={product.title} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.description}</h5>
                                        <p className="card-text">{product.price}</p>
                                        <button className='btn btn-sm btn-primary view_button'>View Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default UserProfile;
