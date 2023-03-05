import Burger from "./Burger";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState, useContext } from "react";
import home from "../icons/home.png"
import cart from "../icons/shopping-cart.png"
import user from "../icons/user.png"
import login from "../icons/login.png"
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { AppContext } from "../App";

const DIV = styled.div`
    margin: auto;
    display: flex;
    padding-bottom: 14px;
    padding-top: 14px;
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: white;
    justify-content: space-between;
    align-items: center;

    .company-name{
        font-weight: bold;
        /* letter-spacing: 0.8px; */
        font-size: 23px;
        cursor: pointer;
        text-decoration: none;
        margin-left: 13%;
        transition: 0.1s linear;
    }
    .navbar-desktop{  
        display: flex;
        list-style: none;
        margin-right: 13%;
        transition: 0.3s linear;
    }
    .navlink{
        margin: auto;
        color: black;
        margin-left: 40px;
        text-decoration: none;
        cursor: pointer;
        font-size: 15px;
        transition: 0.1s;
    }
    .navlink:hover{
        color: purple;
    }
    .navlink.active{
        color: purple;
    }
    .buttons{
        color: purple;
        background-color: white;
        padding: 7px;
        border-radius: 20px;
        font-size: 12px;
        border: 1px solid purple;
        font-weight: bold;
        margin-right: -20px;
    }
    .buttons2{
        color: white;
        background-color: purple;
        padding: 7px;
        border-radius: 20px;
        font-size: 12px;
        border: 1px solid purple;
        font-weight: bold;
    }
    .navbar-mobile{
        display: none;
    }
    .dropdown{
        display: none;
    }
    .dropdown1{
        display: block;
        position: absolute; 
        top: 60px;
        background-color: rgba(255, 255, 255, 0.765);
        backdrop-filter: blur(5px);        
        padding: 50px 45px 35px;           
        right: 12.5%;
        border-radius: 10px;
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .1);
        transform: 0.5s ease-in-out;  
    }
    .dropdown1link{
            text-decoration: none;
            cursor: pointer;
        }
    .dropdown1link.active{
        font-weight: bold;
    }
    .cart{
        display: flex;
        pointer-events: none;
    }
    .cart .cart-amount{
        display: flex;
        margin-left: -5px;
        margin-top: -5px;
        justify-content: center;
        align-items: center;
        width: 14px;
        height: 14px;
        background-color: purple;
        border-radius: 20px;
        font-size: 8px;
        font-weight: bold;
        color: white;
        padding: 6px;
    }
    .logout{
        cursor: pointer; 
        display: flex; 
        border-radius: 20px;
        width: 80px; 
        height: 35px; 
        background-color: #af5a5a; 
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 800px){
        .navbar-desktop{
            display: none;
        }
        .company-name{
            margin-left: 5%;
        }
        .dropdown{
            display: block;
            position: absolute; 
            top: 60px;
            background-color: rgba(255, 255, 255, 0.765);
            backdrop-filter: blur(5px);        
            padding: 50px 45px 35px;           
            right: 6px;
            border-radius: 10px;
            box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .1);
        }
        .dropdownlink{
            text-decoration: none;
            cursor: pointer;
        }
        .dropdownlink.active{
            font-weight: bold;
        }
        .dropdownlink-div{
            cursor: pointer;
            display: flex;
            margin-bottom: 40px; 
            align-items: center;
        }
        .navbar-mobile{
            margin: auto;
            display: flex;
            margin-right: 4%;
            align-items: center;
            transition: 0.1s linear;
        }
        .dropdown1{
            display: none;
        }
    }
`

const Navbar = () => {
    const {cartnum, isActive, setIsActive, accountdiv, setAccountdiv} = useContext(AppContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState()
   

    // eslint-disable-next-line
    useEffect(() => {
        if(localStorage.getItem("pppif") !== null){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        }
    })
    const handleLogout = async () => {
        setLoading(true)
        const response = await fetch (`${process.env.REACT_APP_API_URL}logout/`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        const content = await response.json()
        
        if(content.status === 200){
            localStorage.removeItem('pppif')
            setIsActive(!isActive)
            setAccountdiv(!accountdiv)
            setLoading(false)
            navigate('/')
        }            
    }
    const handleClick = () => {
        setIsActive(!isActive)
    }
    const handleClick2 = () => {
        if(isActive === true){
            setIsActive(false)
        }
    }
    const handleaccountdivClick = () => {
        setAccountdiv(!accountdiv)
    }
    const handleaccountdivClick2 = () => {
        if(accountdiv === true){
            setAccountdiv(false)
        }
    }

    return (  
        <DIV>
            {/* company name */}
            <Link className = "company-name" to = "/"><p style = {{"color":"purple"}}>E - Com</p></Link>
            
            {/* navbar-desktop */}
            <div className = "navbar-desktop">
                <NavLink to = "/" className = "navlink" onClick = {handleaccountdivClick2}>Home</NavLink>
                {/* <NavLink to = "/About" className = "navlink" onClick = {handleaccountdivClick2}>About</NavLink> */}
                {isAuthenticated === false && <NavLink to = "/accounts/Login" className = "navlink"><div className = "buttons">Sign In</div></NavLink>}
                {isAuthenticated === false && <NavLink to = "/accounts/Signup" className = "navlink"><div className = "buttons2">Register</div></NavLink>}
                {/* {isAuthenticated === false && <NavLink to = "/accounts/Profile" className = "navlink"><img src={user} alt="user" width= "22px" style = {{'pointerEvents':'none'}}/></NavLink>} */}

                {isAuthenticated === true && <div onClick={handleaccountdivClick} className = "navlink"><img src={user} alt="user" width= "17px" style = {{'pointerEvents':'none', 'marginTop':'3px'}}/></div>}
               
                {cartnum === 0 && <Link to = "/cart" className = "navlink" onClick={handleaccountdivClick2}><img src={cart} alt="cart" width= "20px" style = {{'pointerEvents':'none'}}/></Link>}
                {cartnum !== 0 && <Link to = "/cart" className = "navlink" onClick={handleaccountdivClick2}>
                    <div className = "cart">
                        <img src={cart} alt="cart" width= "20px" style = {{'pointerEvents':'none'}}/>
                        <div className = "cart-amount">{cartnum}</div>
                    </div>
                </Link>}
            </div>

            {/* navbar-mobile */}
            <div className="navbar-mobile">
                {isAuthenticated === true && <Link to = "/accounts/Profile" className = "navlink" style = {{'marginRight':'40px'}} onClick = {handleClick2}>
                    <img src={user} alt="user" width= "17px" style = {{'pointerEvents':'none', 'marginTop':'2px'}}/>
                </Link>}
                {cartnum === 0 && 
                    <Link to = "/cart" style = {{'marginRight':'40px'}} onClick = {handleClick2}>
                        <img src={cart} alt="cart" width= "20px" style = {{'pointerEvents':'none'}}/>
                    </Link>}

                {cartnum !== 0 && 
                    <Link to = "/cart" style = {{'marginRight':'40px', 'textDecoration':'none'}} onClick = {handleClick2}>
                        <div className = "cart">
                            <img src={cart} alt="cart" width= "20px"/>
                            <div className = "cart-amount">{cartnum}</div>
                        </div>
                    </Link>}
                <div onClick = {handleClick} style = {{"cursor":"pointer"}}>
                    <Burger isActive = {isActive}/>
                </div>
            </div>

            {/* account-dropdown */}
            {accountdiv === true && isAuthenticated === true && (
                <div className = "dropdown1">
                    <NavLink className = "dropdown1link" to = "/accounts/Profile" onClick = {handleaccountdivClick}><p style = {{'marginBottom':'40px'}}>Profile</p></NavLink>
                    <NavLink to = "/accounts/Seller" className = "dropdown1link" onClick = {handleaccountdivClick2}><p style = {{'marginBottom':'40px'}}>Sell</p></NavLink>

                    {loading === false && <div className = "logout" onClick = {handleLogout}>
                                            <p style = {{'color':'white', 'fontSize':'14px'}}>Log out</p>
                    </div>}
                    {loading === true && <div className = "logout">
                        <Spinner color="white" speed = "1.2" size = "10"/>
                    </div>}
                </div>
            )}

            {/* burger-dropdown */}
            {isActive === true && (
                <div className = "dropdown">
                     {isAuthenticated === false && (
                        <>
                            <NavLink className = "dropdownlink" to = "/" onClick = {handleClick}>
                                <div className = "dropdownlink-div">
                                    <p style = {{"marginRight":'7px'}}>Home</p>
                                    <img src={home} alt="home" width = "17px" height = "18px" style = {{'pointerEvents':'none'}}/>
                                </div>
                            </NavLink>
                            <NavLink className = "dropdownlink" to = "/accounts/login" onClick = {handleClick}>
                                <div className = "dropdownlink-div">
                                    <p style = {{"marginRight":'7px'}}>Sign In</p>
                                    <img src={login} alt="login" width = "17px" height = "18px" style = {{'pointerEvents':'none'}}/>
                                </div>
                            </NavLink>
                            <NavLink className = "dropdownlink" to = "/accounts/signup" onClick = {handleClick}><p style = {{'marginBottom':'40px'}}>Register</p></NavLink>
                        </>
                    )}
                    {isAuthenticated === true && (
                        <>
                            <NavLink className = "dropdownlink" to = "/" onClick = {handleClick}>
                                <div style = {{"cursor":"pointer","display":"flex", 'marginBottom':'40px'}}>
                                    <p style = {{"marginRight":'7px'}}>Home</p>
                                    <img src={home} alt="home" width = "17px" height = "18px" style = {{'pointerEvents':'none'}}/>
                                </div></NavLink>
                            <NavLink className = "dropdownlink" to = '/accounts/Seller' onClick = {handleClick}><p style = {{'marginBottom':'25px'}}>Sell</p></NavLink><br />
                            {loading === false && <div className = 'logout' onClick = {handleLogout}>
                                <p style = {{'color':'white', 'fontSize':'14px'}}>Log out</p>
                            </div>}
                            {loading === true && <div className = 'logout'>
                                <Spinner color="white" speed = "1.2" size = "10"/>
                            </div>}
                        </>
                    )}
                </div>
            )}
        </DIV>
    );
}
 
export default Navbar;