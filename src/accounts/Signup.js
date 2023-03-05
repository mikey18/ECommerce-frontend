import {useState, useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { Animate } from "react-simple-animate";
import ex from "../icons/ex.png"

const Signup = () => {
    const email_ref = useRef('')
    const firstname_ref = useRef('')
    const lastname_ref = useRef('')
    const password_ref = useRef('')
    const confirnpassword_ref = useRef('')

    const navigate = useNavigate();
    const[errormessage, setErrorMessage] = useState('')
    const[otperrormessage, setOtpErrorMessage] = useState('')
    const[otpshow, setOtpshow] = useState(false);
    const[email, setEmail] = useState("");
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[password, setPassword] = useState("");
    const[confirmpassword, setConfirmPassword] = useState("");
    const[loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('pppif') !== null){
            navigate('/accounts/UserPage')
        }
        // if(otpshow === false){
        //     email_ref.current.focus()
        // }
        // if(otpshow === true){
        //     otp_ref.current.focus()
        // }
    }) 
    const handleUpdateRefInState = () => {
        setEmail(email_ref.current.value)
        setFirstname(firstname_ref.current.value)
        setLastname(lastname_ref.current.value)
        setPassword(password_ref.current.value)
        setConfirmPassword(confirnpassword_ref.current.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(false)
        setLoading(true)

        if (password === confirmpassword){
            const response = await fetch(`${process.env.REACT_APP_API_URL}register/`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    firstname,
                    lastname,
                    password
                })
            })

            const content = await response.json()
            // console.log(content)

            setLoading(false)

            if(content.status === 200){
                localStorage.setItem('eid', content.token)
                setOtpshow(true)
            }
            if(content.data.email){
                setErrorMessage('User with this email already exists')
            }
        }
        else{
            setErrorMessage("Password dosen't match")
            setLoading(false)
        }      
    }

    const otpemail = localStorage.getItem('eid')
    const otp_ref = useRef('')
    const[otp, setOtp] = useState("");

    const handleUpdateOtpRefInState = () => {
        setOtp(otp_ref.current.value)
    }
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setOtpErrorMessage(false)
        setLoading(true)

        const response = await fetch(`${process.env.REACT_APP_API_URL}verify/`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                otpemail,
                otp
            })
        })
        const content = await response.json()
        
        // console.log(content)
        if (content.status === 200){
            localStorage.removeItem('eid')
            navigate('/accounts/login')
        }
        if (content.status === 400){
            setOtpErrorMessage("Invalid otp")
            setLoading(false)
        }
    }

    if (otpshow === false){
        return (  
            <div className='form'>
                <p id = "header">Create account</p>
    
                <form onSubmit = {handleSubmit} id = "form-2">
                    
                    <label className = "label">Email</label>
                    <input className = "form-input" ref = {email_ref} type="email" name = "email" placeholder = "Email" autoComplete = "on" required/>
    
                    <label className = "label">Firstname</label>
                    <input className = "form-input" ref = {firstname_ref} type="text" name = "firstname" placeholder = "Firstname" autoComplete = "on" required/>
    
                    <label className = "label">Lastname</label>
                    <input className = "form-input" ref = {lastname_ref} type="text" name = "lastname" placeholder = "Lastname" autoComplete = "on" required/>
    
                    <label className = "label">Password</label>
                    <input className = "form-input" ref = {password_ref} type="password" name = "password" placeholder = "Password"  minLength = '6' autoComplete = "new-password" required/>
    
                    <label className = "label">Confirm Password</label>
                    <input className = "form-input" ref = {confirnpassword_ref} type="password" name = "password2" placeholder = "Confirm Password"  minLength = '6' autoComplete = "new-password" required/>  

                    {errormessage && <div className = "error">
                        <img src = {ex} alt = "alt" width = "13" height = "13" style={{"pointerEvents":"none"}}/><p>{errormessage}.</p>
                    </div>}

                    {loading === false && <button className = "button" type = "submit" onClick = {handleUpdateRefInState}>Sign Up</button>}
                    {loading === true && <button className = "button-loading" disabled><Bounce color="#000000" speed = "1.2" size = "13"/></button>}
                    
                    <div style={{"display":"flex", "marginTop":"25px", "justifyContent":"center"}}>
                        <p>Already have an account?</p><br />
                        <Link to = "/accounts/login" style={{"color":"purple", "textDecoration":"none"}}><p style={{"color":"purple", "marginLeft": "5px"}}>Sign In</p></Link>
                    </div>
                </form>
            </div>       
        );
    }
    else{
        return (  
            <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
                <div className = "form">
                    <p id = "header">Verify Account</p>
                    <form onSubmit = {handleOtpSubmit} id = "form-2">
                        <label className = "label">Otp</label>
                        <input className = "form-input" ref = {otp_ref} type="text" name = "otp" placeholder = "Otp" required/>

                        {otperrormessage && <div className = "error">
                            <img src = {ex} alt = "alt" width = "13" height = "13" style={{"pointerEvents":"none"}}/><p>{otperrormessage}.</p>
                        </div>}
                        {loading === false && <button className = "button" type = "submit" onClick = {handleUpdateOtpRefInState}>Verify</button>}
                        {loading === true && <button className = "button-loading" disabled><Bounce color="#000000" speed = "1.2" size = "13"/></button>}
                    </form>
                </div>
            </Animate>

        );
    }
}
 
export default Signup;