import React, { useState } from "react";
import styles from "../../Assets/Stylesheets/UI/Nav.module.css";
import axios from "axios";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router";

const SearchBar = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchResults } = useSearchContext();
  const navigation = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/search?searchQuery=${searchQuery}`
      );
      setSearchResults(response.data);
      navigation(`/productListings?searchQuery=${searchQuery}`);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Type to search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
