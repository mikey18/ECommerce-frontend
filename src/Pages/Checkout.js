import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CryptoJS from "crypto-js"
import mastercard from "../icons/mastercard.png"
import visa from "../icons/visa.png"


const DIV = styled.div`
    margin: auto;
    width: 98%;
    text-align: center;
    margin-top: 30px;

    .header{
        margin: auto;
        font-size: 19px;
        margin-bottom: 40px;
        font-weight: bold;
    }
    .items{
        display: flex;
        margin: auto;
        border: 1px solid #cfcfcf;
        justify-content: space-between;
        max-width: 600px;
        height: 150px;
        align-items: center;
        border-radius: 15px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 10px;
    }
    .image{
        background-color: #cfcfcf;
        border-radius: 20px;
        height: 130px;
        width: 130px;
        transition: 0.2s linear;
    }
    .details{
        align-items: center;
        border: 1px solid #cfcfcf;
        border-radius: 15px;
        width: 70%;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .total-buy{
        display: flex;
        margin: auto;
        font-size: 20px;
        margin-top: 10px;
        max-width: 595px;
        border: 1px solid #cfcfcf;
        border-radius: 5px 22px 22px 5px;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin-bottom: 100px;
    }
    .total{
        font-size: 17px;
        font-weight: bold;
        margin-left: 10px;
    }
    .buy{
        background-color: purple;
        padding: 12px;
        border-radius: 22px;
        color: white;
        font-size: 15px;
        cursor: pointer;
        font-weight: bold;
    }
    .buy:hover{
        background-color: #750075;
    }    
    .payment-methods{
        margin: auto;
        max-width: 300px;
        border-radius: 15px;  
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .3);
        padding: 20px;
        width: 80%;
        margin-bottom: 300px;
    }
    .payment-methods p{
        font-weight: bold;
        margin-bottom: 5px;
    }

    @media(max-width: 500px){
        .image{
            height: 100px;
            width: 100px;
        }
    }
`
const Checkout = () => {
    // const {checkout} = useContext(AppContext)
    const navigate = useNavigate()
    //decrypted items
    const decrypted_checkout_items = CryptoJS.AES.decrypt(localStorage.getItem("checkout_items"), process.env.REACT_APP_ENCRYPTION_KEY)
    const checkout_items = JSON.parse(decrypted_checkout_items.toString(CryptoJS.enc.Utf8))
    const amount = checkout_items.length

    //decrypted sum
    const decrypted_sum = CryptoJS.AES.decrypt(localStorage.getItem("sum"), process.env.REACT_APP_ENCRYPTION_KEY)
    const sum = JSON.parse(decrypted_sum.toString(CryptoJS.enc.Utf8))


    useEffect(() => {
        if(amount === false){
            navigate("/Cart")
        }
    })  

    return (  
        <DIV>
            <p className="header">Checkout ({amount})</p>
            {checkout_items.map((item) => (
                <div key = {item.id} className = "items">
                    <LazyLoadImage src= {`${process.env.REACT_APP_IMAGE_URL}${item.image}`} alt="one" className = "image" effect="blur"/>
                    <div className="details">
                        <p style={{"fontWeight":"bold"}}>{item.name}</p><br />
                        <p>Price: {item.price} x {item.quantity}</p>
                        <p style={{"fontSize":"13px"}}>Shipping: {item.shipping} x {item.quantity}</p>
                    </div> 
                </div>
            ))}
            <div className="total-buy">
                <p className="total">Total: ₦ {sum}</p>
                <div className="buy">
                    Purchase
                </div>
            </div>
            <div className="payment-methods">
                <p>Payment methods</p>
                <img src={mastercard} alt="mastercard" width='35px' style={{'marginRight':'20px'}}/>
                <img src={visa} alt="visa" width='45px'/>
            </div>
        </DIV>
    );
}
 
export default Checkout;