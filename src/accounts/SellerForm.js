import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const SellerForm = () => {
    const navigate = useNavigate()
    const email_ref = useRef('')
    const firstname_ref = useRef('')
    const lastname_ref = useRef('')

    const[email, setEmail] = useState("");
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");

    useEffect(() => {
        if (localStorage.getItem('pppif') === null){
            navigate('/accounts/Login')
        }
    }) 

    const handleUpdateRefInState = () => {
        setEmail(email_ref.current.value)
        setFirstname(firstname_ref.current.value)
        setLastname(lastname_ref.current.value)
    }

    return (  
        <div className='form'>
            <p id = "header">Become a Seller</p>

            {/* <form onSubmit = {handleSubmit} id = "form-2"> */}
            <form id = "form-2">
                <label className = "label">Email</label>
                <input className = "form-input" ref = {email_ref} type="email" name = "email" placeholder = "Email" autoComplete = "on" required/>

                <label className = "label">Firstname</label>
                <input className = "form-input" ref = {firstname_ref} type="text" name = "firstname" placeholder = "Firstname" autoComplete = "on" required/>

                <label className = "label">Lastname</label>
                <input className = "form-input" ref = {lastname_ref} type="text" name = "lastname" placeholder = "Lastname" autoComplete = "on" required/>

                {/* {errormessage && <div className = "error">
                    <img src = {ex} alt = "alt" width = "13" height = "13" style={{"pointerEvents":"none"}}/><p>{errormessage}.</p>
                </div>} */}

                <button className = "button" type = "submit" onClick = {handleUpdateRefInState}>Register</button>
                {/* {loading === true && <button className = "button-loading" disabled><Bounce color="#000000" speed = "1.2" size = "13"/></button>} */}
                
                <div style={{"display":"flex", "marginTop":"25px", "justifyContent":"center"}}>
                    <p>Already have an account?</p><br />
                    <Link to = "/accounts/login" style={{"color":"purple", "textDecoration":"none"}}><p style={{"color":"purple", "marginLeft": "5px"}}>Sign In</p></Link>
                </div>
            </form>
        </div>       
    );
}

export default SellerForm;