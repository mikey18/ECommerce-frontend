import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import backbutton from "../icons/back-button.png";
import UserPage from "./UserPage";
import SellerPage from "./SellerPage"

const DIV = styled.div`
    margin: 0;

    .header{
        display: flex;
        margin: auto;
        font-size: 19px;
        max-width: 700px;
        margin-bottom: 40px;
        width: 85%;
        font-weight: bold;
        margin-top: 30px;
        align-items: center;
    }
`

const Profile = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [authenticated, setAuthenticated] = useState();
    const [userType, setuserType] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (localStorage.getItem('pppif') === null){
            navigate('/accounts/Login')
        }
        else{
            (
                async () => {
                    const response = await fetch (`${process.env.REACT_APP_API_URL}user/`, {
                        headers: {'Content-Type':'application/json'},
                        credentials: 'include',
                    })
    
                    const content = await response.json()

                    // console.log(content)
                    if(content.detail === 'Unauthenticated'){
                        localStorage.removeItem("pppif")
                        setLoading(false)
                        setAuthenticated(false)    
                        navigate('/accounts/Login')
                    }
                    else if(content.detail === 'Token Expired'){
                        localStorage.removeItem("pppif")
                        setLoading(false)
                        setAuthenticated(false)           
                        navigate('/accounts/Login')
                    }
                    else{
                        localStorage.setItem("pppif", content.jwt)
                        setLoading(false)
                        setAuthenticated(true)
                        setuserType(content.user_type)
                        setName(content.data.firstname)
                    }            
                }
            )();
        }
    });

    // COMPONENTS
    const header = () => {
        return(
            <div className = "header">
                <div onClick = {() => navigate("/")} style = {{'cursor':'pointer', 'display':'flex'}}>
                    <img id = "img" src = {backbutton} alt= "back" width = "25" style = {{'pointerEvents':'none', 'marginRight': '10px'}}/>
                </div>
                <p>Profile</p>
            </div>
        )   
    } 
    // COMPONENTS

    if(loading) {
        return (
            <DIV>
                {header()}
                <Loading />
            </DIV>
        )
    }

    if(authenticated){
        //USERPAGE
        if(userType === 'user'){
            return (  
                <DIV>  
                    {header()}
                    <UserPage name = {name}/>
                </DIV>
            );
        }
        //SELLER PROFILE PAGE FOR SELLER 
        if(userType === 'seller'){
            return (  
                <DIV>  
                    {header()}
                    <SellerPage />
                </DIV>
            );
        }
    }
  
}
 
export default Profile;