import React from "react"
import styled from 'styled-components'
import search from '../icons/search.png'
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import backbutton from "../icons/back-button.png";
import { useNavigate } from 'react-router-dom';


const DIV = styled.div`
    margin: auto;
    width: 90%;

    .back-search{
        margin: auto;
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        width: 100%;
        justify-content: center;
        max-width: 500px;
    }
    .search-div{
        display: flex;
        align-items: center;
        max-width: 400px;
        width: 100%;
        margin-left: 20px;
    }
    .search{
        margin: auto;
        width: 90%;   
        margin-top: 15px;
        margin-bottom: 15px;
        height: 22px;
        border-radius: 20px;
        border: 1px solid #e0e0e0;
        padding: 18px;   
        font-size: 15px;
        display: flex;
        background-color: #f8f7f7;
    }
    .search:focus{
        outline: none !important;
        border-color: purple;
        transition: 0.2s;
    }
    .search-suggestion{
        position: absolute;
        background-color: rgba(255, 255, 255, 0.765);
        backdrop-filter: blur(15px);        
        max-width: 400px;
        margin-top: 400px;
        z-index: 1;
        border-radius: 15px;
        width: 90%;   
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .1);
    }
    .search-suggestion p{
        padding: 8px 15px 8px 15px;   
        border-radius: 15px;
        cursor: pointer;
        transition: 0.08s;
        font-weight: bold;
        font-size: 15px;
    }
    .search-suggestion p:hover{
        color: purple;
        margin-left: 5px;
        margin-right: 5px;
    }
    .search-button{
        background-color: purple;
        width: 30px;
        height: 30px;
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

const MiniSearch = ({ isActive, accountdiv }) => {
    const navigate = useNavigate();
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
           <div className = "back-search">
                    <div onClick = {() => navigate(-1)} style = {{'cursor':'pointer', 'display':'flex'}}><img id = "img" src = {backbutton} alt= "back" width = "27" style = {{'pointerEvents':'none'}}/></div>
                    <div className = 'search-div'>
                        <input className = "search" type='search' placeholder='Search products or stores' onChange = {(e) => setSearchValue(e.target.value)}/>
                        <div className = "search-button" onClick = {searchClick}>
                            <img src = {search} width = '15' style = {{'marginTop':'7px'}} alt="search"/>
                        </div>
                    </div>
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
            </div>
        </DIV>
    );
}
 
export default MiniSearch;