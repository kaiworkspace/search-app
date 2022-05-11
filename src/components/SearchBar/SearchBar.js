import styles from './style.module.css'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar(){
    
    
    
    return (
        <div className={styles.main}>
            <div className={styles.searchBarContainer}>
                <input 
                    className={styles.searchBarInput}
                    >
                </input>
                <div className={styles.searchIconContainer}>
                    <FaSearch />
                </div>
            </div>
        </div>
    )
}