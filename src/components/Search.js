import React from "react"
import styled from 'styled-components'
import search from '../icons/search.png'
import { useState } from "react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const DIV = styled.div`
    .search-div{
        margin: auto;
        max-width: 460px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;   
    }
    .search{
        background-color: #f8f7f7;
        margin-top: 15px;
        margin-bottom: 15px;
        width: 90%;
        height: 25px;
        border-radius: 20px;
        border: 1px solid #e0e0e0;
        padding: 20px;   
        font-size: 15px;
    }
    .search-suggestion{
        position: absolute;
        background-color: rgba(255, 255, 255, 0.765);
        backdrop-filter: blur(15px);        
        max-width: 460px;
        margin-top: 400px;
        z-index: 1;
        border-radius: 15px;
        width: 90%;   
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .1);
        text-align: left;
    }
    .search-suggestion p{
        padding: 8px 15px 8px 15px;   
        border-radius: 15px;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        transition: 0.08s;
    }
    .search-suggestion p:hover{
        color: purple;
        margin-left: 5px;
        margin-right: 5px;
    }
    .search:focus{
        outline: none !important;
        border-color: purple;
        transition: 0.2s;
    }
    .search-button{
        background-color: purple;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        cursor: pointer;
        text-align: center;
        align-items: center;
    }
    .search-button:hover{
        background-color: #750075;
    }
    .search-link{
        text-decoration: none;
    }
`

const Search = ({ isActive, accountdiv }) => {
    const navigate = useNavigate()
    const[showSearch, setShowSearch] = useState(false)
    const[searchvalue, setSearchValue] = useState('')

    useEffect(() => {
        if(searchvalue !== ''){
            setShowSearch(true)
        }
        else{
            setShowSearch(false)
        }
    }, [searchvalue])

    useEffect(() => {
        if(isActive === true){
            setShowSearch(false)
        }
        if(accountdiv === true){
            setShowSearch(false)
        }
    }, [isActive, accountdiv])

    const searchClick = () => {
        setShowSearch(false)
        navigate("/search")
    }

    return (  
        <DIV>
            <div className = "search-div">
                <input className = "search" type='search' placeholder='Search products or stores' onChange = {(e) => setSearchValue(e.target.value)}/>
                {showSearch === true && 
                    <div className="search-suggestion">
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                        <Link to = '/search' className = "search-link"><p onClick = {() => {setShowSearch(false)}}>{searchvalue}</p></Link>
                    </div>}
                <div className = "search-button" onClick = {searchClick}>
                    <img src = {search} width = '15' style = {{'marginTop':'8px'}} alt="search"/>
                </div>
            </div>
        </DIV>
    );
}
 
export default Search;