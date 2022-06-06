import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Search.css'

export default function Search() {

    return (
        <form className='search-root' >
            {/* html deafult form behavior is intended */}
            <input type="text" placeholder="Search & Shop"
                name="search" className="search-input"/>
            <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}



