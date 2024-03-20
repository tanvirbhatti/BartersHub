import React, { useState } from 'react'
import './AdminPanel.css'
import { Products } from './Products';
import {Users} from './Users';

export const AdminPanel = () =>{

    const [activeComponent, setActiveComponent] = useState('Products');
    const renderComponent = () => {
        switch (activeComponent) {
            case 'Products':
                return <Products />;
            case 'Users':
                return <Users />;
            default:
                return null;
        }
    };

    return (
        <div className='container pt-5 pb-5'>
            <div className='d-flex'>
                <div className='shadow rounded CardMargin' style={{width:"20%"}}>
                    <div className='text-center'>
                        {
                            (<>
                                <img className="avatar img-fluid rounded-circle mb-3" src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=1024x1024&w=is&k=20&c=K2vyMGGU4E4iSfkfTwOGNgG-x-WBadv2anHPFvONnOc=" alt="User Avatar" />
                                <div  className='pb-3 h-100 w-100'>
                                    <h5>firstName lastName</h5>
                                    <p>Edit Profile</p>
                                    <button className={`border mb-2 rounded-0 Btn ${(activeComponent=='Products')?'active':'' }`} name='products' onClick={() => setActiveComponent('Products')}>Products</button>
                                    <br/>
                                    <button className={`border mb-2 rounded-0 Btn ${(activeComponent=='Users')?'active':'' }`} name='users' onClick={() => setActiveComponent('Users')}>Users</button>
                                    <button className='border mb-2 rounded-0 Btn'>Logout</button>
                                </div>
                            </>)
                        }
                    </div>
                </div>
                <div className='shadow rounded p-3' style={{width:"85%"}}>
                    {/* render active component */}
                    <h3 className='pb-0 hadingUnderLiner col-lg-2'>
                        {activeComponent}
                    </h3>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

