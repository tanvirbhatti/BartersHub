import React, { useState } from "react";
import { AddCategory } from "./Categories/AddCategory";
import { ViewAllCategories } from "./Categories/ViewAllCategories";

export const Categories = () => {
    const [activeComponent, setActiveComponent] = useState();

    const renderComponent = () => {
        switch (activeComponent) {
            case 'AddCategory':
                return <AddCategory />;
            case 'ViewAllCategories':
                return <ViewAllCategories />;
            default:
                setActiveComponent('ViewAllCategories')
                return <ViewAllCategories/>;
        }
    };

    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center">Categories List</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <button className={`btn btn-sm rounded ${(activeComponent === 'AddCategory') ? 'bg-orange text-white' : 'border'}`} onClick={() => setActiveComponent('AddCategory')}>Add New</button>
                    </div>
                    <div className="col-md-2">
                        <button className={`btn btn-sm rounded ${(activeComponent === 'ViewAllCategories') ? 'bg-orange text-white' : 'border'}`} onClick={() => setActiveComponent('ViewAllCategories')}>View All</button>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-10">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}
