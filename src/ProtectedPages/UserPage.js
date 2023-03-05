import { useState } from "react";
import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import profile from "../images/store.png"
import arrowdown from "../icons/arrow-down.png"
import arrowup from "../icons/arrow-up.png"
import DeliveryDetails from "./DeliveryDetails";
import Orders from "./Orders";
import Messages from "./Messages";

const DIV = styled.div`
    margin: 0;
    text-align: center;

    .profile-picture{
        margin: auto;
        background-color: #cfcfcf;
        height: 80px;
        width: 80px;
        border-radius: 80px;
        margin-bottom: 30px;
    }
    .picture{
        width: 100%;
        border-radius: 80px;
        height: 100%;
        cursor: pointer;
    }
    .nav{
        margin: auto;
        display: flex;
        width: 90%;
        max-width: 500px;
        margin-top: 30px;
        justify-content: space-between;
        margin-bottom: 60px;
    }
    .nav-2{
        margin: auto;
        display: flex;
        width: 90%;
        max-width: 500px;
        margin-top: 30px;
        border: 1px solid purple;
        border-radius: 10px;
        padding: 20px;
        cursor: pointer;
        justify-content: space-between;
    }
    .o-w-t{
        padding: 12px;
        background-color: grey;
        color: white;
        font-size: 12px;
        border-radius: 15px;
        cursor: pointer;
    }
    .img{
        width: 15px;
        height: 15px;
    }
    .deliverydropdown{
        margin: auto;
        border: 1px solid #bab9ba;
        max-width: 500px;
        border-radius: 10px;
        padding: 10px;
        width: 90%;
        /* margin-top: 5px; */
    }
    .deliverydropdown p{
        margin: auto;
        width: 90%;
        text-align: left;
        margin-top: 10px;
    }
    .head{
        font-weight: bold;
        text-align: left;
        color: black;
    }
    #edit{
        text-align: right;
        color: purple;
        cursor: pointer;
        margin-bottom: 10px;
    }
`

const UserPage = ({name}) => {
    const [showMessages, setshowMessages] = useState(false);
    const [showOrders, setshowOrders] = useState(false);
    const [showDeliveyDetailsdrop, setshowDeliveyDetailsdrop] = useState(false)
    const [showDeliveyDetails, setshowDeliveyDetails] = useState(false);
    const [state, setState] = useState('')
    const [shipping_address, setShippingAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')


    // COMPONENTS
    const deliverydropdown = () => {
        return(
            <div className="deliverydropdown">
                 <p className="head">State</p>
                <p style={{'color':'grey'}}>{state}</p>
                <p className="head">Shipping Address</p>
                <p style={{'color':'grey'}}>{shipping_address}</p>
                <p className="head">Phone Number</p>
                <p style={{'color':'grey'}}>{phonenumber}</p>
                <p id = "edit" onClick={() => setshowDeliveyDetails(true)}>Edit</p>
            </div>
        )
    }
    // COMPONENTS

   
    return (  
        <DIV>  
            <div className="profile-picture">
                <LazyLoadImage src={profile} effect = "blur" className="picture" alt="profile"/>
            </div>
            <p style = {{"color":"purple",'fontSize':'20px', 'fontWeight':'bold'}}>Hi, {name}</p>

            <div className="nav">
                <div className="o-w-t" onClick={() => setshowMessages(true)}>Message</div>
                <div className="o-w-t">Wishlist</div>
                <div className="o-w-t" onClick={() => setshowOrders(true)}>Orders</div>
                <div className="o-w-t">Tracking</div>
            </div>

            {/* DELIVEY DETAILS */}
            <div className="nav-2"  onClick = {() => setshowDeliveyDetailsdrop(!showDeliveyDetailsdrop)}>
                <p style = {{"color":"black", 'fontWeight':'bold'}}>Delivery details</p>
                {showDeliveyDetailsdrop === false && <img src = {arrowdown} alt = "arrow" className="img"/>}
                {showDeliveyDetailsdrop === true && <img src = {arrowup} alt = "arrow" className="img"/>}                    
            </div>
            {showDeliveyDetailsdrop === true && deliverydropdown()}     
            {/* DELIVEY DETAILS */}
            
            <div className="nav-2">
                <p style = {{"color":"black", 'fontWeight':'bold'}}>Help Center</p>
            </div>

            
            {/* COMPONENTS */}
            <Messages showMessages = {showMessages} setshowMessages = {setshowMessages}/>
            <Orders showOrders = {showOrders} setshowOrders = {setshowOrders}/>
            <DeliveryDetails 
                showDeliveyDetails = {showDeliveyDetails} 
                setshowDeliveyDetails = {setshowDeliveyDetails}
                setShippingAddress = {setShippingAddress}
                setPhonenumber = {setPhonenumber}
                setState = {setState}
            />
        </DIV>
    );
}
 
export default UserPage;
