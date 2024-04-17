import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ViewAllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/admin/get-all-categories`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((data) => {
        setCategories(data.data.categories);
      });
  }, []);
  
  const handleDelete = (categoryId) => {
    const authToken = localStorage.getItem("token");

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/admin/delete-category`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          data: {
            categoryId: categoryId,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted category from the state
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== categoryId)
          );
          console.log(response)
          toast.success(response.data.message);
        } else {
          console.error("Failed to delete category");
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.category}</td>
              <td>
                <button className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
