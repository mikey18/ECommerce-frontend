import {useState, useEffect, useRef, useContext} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import ex from "../icons/ex.png"
import { AppContext } from '../App';

const Login = () => {
    const {checkout, setCheckout} = useContext(AppContext)
    const email_ref = useRef('')
    const password_ref = useRef('')
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false)
    const[errormessage, setErrorMessage] = useState('')
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem('pppif') !== null){
            navigate('/accounts/Profile')
        }
        // else{
        //     email_ref.current.focus()
        // }
    }) 

    const handleUpdateRefInState = () => {
        setEmail(email_ref.current.value)
        setPassword(password_ref.current.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(false)
        setLoading(true)

        const response = await fetch(`${process.env.REACT_APP_API_URL}login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        const content = await response.json()
        
        // console.log(content)
        if(content.status === 200 && checkout === true){
            localStorage.setItem("pppif", content.jwt)
            setLoading(false)
            setCheckout(false)
            navigate('/Checkout')
        }
        if(content.status === 200 && checkout === false){
            localStorage.setItem("pppif", content.jwt)
            setLoading(false)
            navigate('/')
        }
        if(content.message){
            setLoading(false)
            setErrorMessage(content.message)
        }
    }

    return (  
        <div className = "form">
            <p id = "header">Hey, sign in to your account</p>
            <form onSubmit = {handleSubmit} id = "form-2">
                <label className = "label">Email</label>
                <input className = "form-input" ref = {email_ref} type="email" name = "email" placeholder = "Email" autoComplete = "on" required/>

                <div style={{'display': 'flex', 
                             'justifyContent': 'space-between'}}>
                    <label className = "label">Password</label>
                    <p style={{'fontSize':'12px', 'color':'purple',
                               'cursor':'pointer', 'fontWeight':'bold',
                               'marginTop':'5px'}}>Forgot Password?</p>
                </div>
               
                <input className = "form-input" ref = {password_ref} type="password" name = "password" placeholder = "Password" autoComplete = "current-password" required/>
                {errormessage && <div className = "error">
                    <img src = {ex} alt = "alt" width = "13" height = "13" style={{"pointerEvents":"none"}}/><p>{errormessage}.</p>
                </div>}

                {loading === false && <button className = "button" type = "submit" onClick = {handleUpdateRefInState}>Log In</button>}
                {loading === true && <button className = "button-loading" disabled><Bounce color="white" speed = "1.2" size = "13"/></button>}

                <div style={{"display":"flex", "marginTop":"25px", "justifyContent":"center"}}>
                    <p>Don't have an account?</p><br />
                    <Link to = "/accounts/signup" style={{"color":"purple", "textDecoration":"none"}}><p style={{"color":"purple", "marginLeft": "5px"}}>Register</p></Link>
                </div>
            </form>
        </div>
    );
}
export default Login;