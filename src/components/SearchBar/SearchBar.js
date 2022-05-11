import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    
    const handleSearch=()=>{
        console.log("Searching...")
        fetchDataFromServer()

    }

    const fetchDataFromServer = async ()=>{
        const res = await axios.get('/search').then(response =>{
            console.log(response)
        })
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
                    <div 
                        className={styles.searchIconContainer}
                        onClick={handleSearch}>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}