import React, { useState } from 'react'

import styles from './style.module.css'
import { FaSearch } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'

export default function SearchBar(){
    
    const [searchText, setSearchText] = useState("")
    
    const handleSearchChange=(event)=>{
        setSearchText(event.target.value)
    }

    const clearSearchContents=()=>{
        setSearchText("")
    }

    return (
        <div className={styles.main}>
            <div className={styles.searchBarContainer}>
                <input 
                    className={styles.searchBarInput}
                    value={searchText}
                    onChange={handleSearchChange}
                    >
                </input>
                <div className={styles.iconContainer}>
                    <div 
                        className={searchText.length>0? styles.clearIconContainerEN: styles.clearIconContainerNA}
                        onClick={clearSearchContents}>
                        <ImCancelCircle />
                    </div>
                    <div className={styles.searchIconContainer}>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}