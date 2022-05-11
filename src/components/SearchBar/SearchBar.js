import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './style.module.css'
import { FaSearch } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'

export default function SearchBar(){
    
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const handleSearchChange=(event)=>{
        setSearchText(event.target.value)
    }

    const clearSearchContents=()=>{
        setSearchText("")
    }
    
    const handleSearch=()=>{
        if(searchText.length!=0){
            fetchDataFromServer()
        }

    }

    const fetchDataFromServer = async ()=>{

        const payload = {data: searchText}

        const res = await axios.get('/search', {headers: payload}).then(response =>{
            setSearchResult(response.data.data)
        })
    }

    const renderSearchResult=searchResult.map((r,index)=>{
        return (
            <div 
                key={index}
                className={styles.names}>
                {r}
            </div>
        )
    })

    return (
        <>
            <div className={styles.title}>
                <h2>Enter a name that begins with A</h2>
                <p>This search bar returns a list of top 10 most similar search result</p>
            </div>
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
            <div className={styles.resultContainer}>
                {renderSearchResult}
            </div>
        </>
    )
}