import React, { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext()

export const useSearchContext= () =>useContext(SearchContext);

export const SearchProvider = ({children})=>{
    
    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchContext.Provider value={{searchResults, setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}