import { useState, useContext, useEffect} from "react"
import styled from 'styled-components'
import CartItem from "../components/CartItem"
import { useNavigate } from "react-router-dom"
import backbutton from "../icons/back-button.png";
import { AppContext } from "../App"
import { Link } from "react-router-dom" 
import CryptoJS from "crypto-js"
// import BottomBar from "../components/BottomBar"

const DIV = styled.div`
    margin: auto;
    margin-top: 30px;
    
    .header{
        display: flex;
        margin: auto;
        font-size: 19px;
        max-width: 700px;
        margin-bottom: 40px;
        width: 85%;
        font-weight: bold;
        align-items: center;
    }
    .start-shopping{
        margin: auto;
        background-color: purple;
        padding: 14px;
        max-width: 200px;
        color: white;
        font-size: 15px;
        text-Align: center;
        border-radius: 30px;
        cursor: pointer;
        border: 1px solid purple;
        margin-bottom: 20px;
    }
    .start-shopping:hover{
        background-color: #750075;
    }
    .log-in{
        margin: auto;
        background-color: purple;
        padding: 15px;
        max-width: 200px;
        color: white;
        font-size: 18px;
        text-Align: center;
        border-radius: 30px;
        cursor: pointer;
    }
    .main{
        margin: auto;
        display: flex;
        box-shadow: 0 1px 5px 0px rgba(0, 0, 0, .1);
        width: 95%;
        height: 200px;
        border-radius: 20px;
        align-items: center;
        max-width: 700px;
        margin-bottom: 10px;
        transition: 0.2s linear;
    }
    .submain{
        display: flex;
        margin: auto;
        width: 97%;
        height: 90%;
        border-radius: 20px;
        justify-content: space-between;
        transition: 0.2s linear;
    }
    .image{
        background-color: #cfcfcf;
        border-radius: 20px;
        height: 180px;
        width: 180px;
        transition: 0.2s linear;
        position: relative;
    }
    .main-link{
        text-decoration: none;
        cursor: pointer;
    }
    .image2{
        background-color: #f8f8f8;
        border-radius: 20px;
        height: 180px;
        width: 70%;
        transition: 0.2s linear;
    }
    .select-delete{
        display: flex;
        margin-top: 8px;
        justify-content: space-between;
        margin-right: 10px;
        align-items: center;
        margin-bottom: 15px;
        transition: 0.2s linear;
    }
    .select{
        height: 15px;
        width: 15px;
        background-color: white;
        margin-left: 10px;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid #cfcfcf;
    }
    .select-true{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15px;
        width: 15px;
        border: 1px solid #cfcfcf;
        background-color: white;
        margin-left: 10px;
        border-radius: 10px;
        cursor: pointer;
    }
    .select-true:hover{
        border: 1px solid purple;
        transition: 0.1s;
    }
    .inner-purple{
        padding: 5px;
        background-color: purple;
        border-radius: 10px;
    }
    .texts{
        margin-bottom: 15px;
        transition: 0.2s linear;
    }
    .texts p{
        margin-left: 10px;
        transition: 0.2s linear;
    }
    .texts .first{
        margin-bottom: 20px;
        font-size: 13px;
        transition: 0.2s linear;
        width: 80%;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .texts .second{
        padding-bottom: 11px;
        transition: 0.2s linear;
    }
    .texts .third{
        font-size: 11px;
        color: grey;
        transition: 0.2s linear;
    }
    .add-minus{
        display: flex;
        justify-content: right;
        margin-right: 10px;
        height: 25px;
        margin-left: 150px;
        align-items: center;
    }
    .minus{
        display: flex;
        width: 25px;
        height: 100%;
        background-color: white;
        border: 1px solid purple;
        justify-content: center;
        border-radius: 20px;
        align-items: center;
        color: purple;
        font-size: 23px;
        cursor: pointer;
    }
    .add{
        display: flex;
        width: 25px;
        height: 100%;
        background-color: white;
        border: 1px solid purple;
        justify-content: center;
        border-radius: 20px;
        color: white;
        align-items: center;
        color: purple;
        font-size: 20px;
        cursor: pointer;
    }
    .add-minus .num{
        width: 30px;
        text-align: center;
        font-size: 14px;
    }
    .add::selection{
       background-color: transparent;
    }
    .minus::selection{
       background-color: transparent;
    }
    /* .checkout{
        margin: auto;
        display: flex;
        justify-content: space-around;
        margin-bottom: 500px;
        max-width: 400px;
        width: 100%;
    } */
    .checkout{
        margin: auto;
        display: flex;
        justify-content: space-around;
        bottom: 0;
        position: fixed;
        background-color: rgba(255, 255, 255, 0.765);
        backdrop-filter: blur(30px);        
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .3);
        max-width: 800px;
        width: 100%;
        left: 50vw;
        transform: translate(-50%);
    }
    .total-button{
        max-width: 200px;
        padding: 15px;
        border-radius: 30px;
        color: black;
        font-weight: bold;
        text-align: center;
        width: 40%;
        box-shadow: 0 1px 2px 0px purple;
    }
    .checkout-button{
        max-width: 200px;
        padding: 15px;
        background-color: purple;
        border-radius: 30px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        width: 50%;
        box-shadow: 0 2px 5px 0px grey;
    }
    .checkout-button:hover{
        background-color: #750075;
    }
    .disabled-checkout-button{
        max-width: 200px;
        padding: 15px;
        background-color: purple;
        opacity: 0.5;
        border-radius: 30px;
        color: white;
        font-weight: bold;
        cursor: not-allowed;
        text-align: center;
        width: 50%;
        box-shadow: 0 2px 5px 0px grey;
    }
    @media (max-width: 500px){
        .checkout{
            padding-top: 13px;
            padding-bottom: 13px;
            max-width: none;
        }
    }
    @media (max-width: 590px){
        .main{
            height: 145px;
        }
        .image{
            height: 100px;
            width: 100px;
            margin-top: 10px;
        }   
        .image2{
            height: 130px;
            width: 72%;
        }   
        .select-delete{
            margin-bottom: 5px;
        }
        .texts{
            margin-bottom: -5px;
        }
        .texts .second{
            font-size: 14px;
        }
    }
    @media (max-width: 385px){
        .main{
            height: 122px;
        }
        .image{
            height: 90px;
            width: 90px;
        }   
        .image2{
            height: 110px;
            width: 70%;
        }   
        .select-delete{
            margin-bottom: 5px;
        }
        .texts{
            margin-bottom: 0;
        }
        .texts .first{
            margin-bottom: -1px;
        }
        .texts .second{
            margin-bottom: -5px;
        }
    }
    @media (max-width: 285px){
        .main{
            height: 111px;
        }
        .image{
            height: 80px;
            width: 80px;
        }   
        .image2{
            height: 100px;
            width: 68%;
        }   
        .select-delete{
            margin-bottom: 5px;
        }
        .add-minus{
            height: 15px;
        }
        .texts{
            margin-bottom: 0;
        }
        .texts .first{
            margin-bottom: -1px;
        }
        .texts .second{
            margin-bottom: -12px;
        }
        .add{
            margin-right: 15px;
        }
    }
`                       
const Cart = () => {
    const {carts, setCarts, cartnum, setCheckout} = useContext(AppContext)
    const navigate = useNavigate();
    const[priceArray, setPriceArray] = useState([])
    const[sum, setSum] = useState(0)
    const selected_items = priceArray.length

    useEffect(() => {
        setSum(priceArray.reduce((accum, { price, quantity, shipping}) => (
            accum + (price * quantity) + (shipping * quantity)
        ), 0))
    }, [priceArray, setSum])

    const Checkout = () => {
        const encrypted_checkout = CryptoJS.AES.encrypt(JSON.stringify(priceArray), process.env.REACT_APP_ENCRYPTION_KEY)
        const encrypted_sum = CryptoJS.AES.encrypt(JSON.stringify(sum), process.env.REACT_APP_ENCRYPTION_KEY)
        localStorage.setItem("checkout_items", encrypted_checkout)
        localStorage.setItem("sum", encrypted_sum)
        
        if (localStorage.getItem('pppif') !== null){
            setCheckout(true)
            navigate('/Checkout')
        }
        else{
            setCheckout(true)
            navigate('/accounts/login')
        }
    }

    const header = () => {
        return(
            <div className = "header">
                <div onClick = {() => navigate(-1)} style = {{'cursor':'pointer', 'display':'flex'}}>
                    <img id = "img" src = {backbutton} alt= "back" width = "25" style = {{'pointerEvents':'none', 'marginRight': '10px'}}/>
                </div>
                {cartnum !== 0 && <p>Shopping Cart ({cartnum})</p>}
                {cartnum === 0 && <p>Shopping Cart</p>}

                {/* <div style = {{'display':'flex', 'alignItems':'center'}}>
                    <p style = {{'fontSize':'15px'}}>Select all</p>
                    {selectAll === false && <div className = "select" onClick = {handleSelectAll}/>}
                    {selectAll === true && 
                        <div className = "select-true" onClick = {handleSelectAll}>
                            <div className = "inner-purple"/>             
                        </div>}
                </div> */}
            </div>
        )   
    } 
    if(cartnum === 0){
        return(
            <DIV>
                {header()}
                <p className = "header" style = {{'justifyContent':'center', 
                                                  'marginTop':'100px', 
                                                  'color':'purple'}}>Your Cart is empty</p>
                <Link to='/' style={{"textDecoration":'none'}}><div className="start-shopping">Start Shopping</div></Link>
                {/* <Link to='/accounts/Login' style={{"textDecoration":'none'}}><div className="log-in">Log In</div></Link> */}
            </DIV>
        )
    }
    if(cartnum !== 0){
        return (  
            <DIV>
                {header()}
                <div style = {{'marginBottom':'80px'}}>
                    {[...carts].reverse().map((cart) => (
                        <CartItem key = {cart.id} cart={cart} carts={carts} setCarts = {setCarts} 
                                priceArray = {priceArray} setPriceArray = {setPriceArray} setSum = {setSum}/>
                    ))}
                </div>
                <br /><br /><br />
                <div className = "checkout">
                    <div className = "total-button">₦ {sum}</div>
                    {selected_items === 0 && <div className = "disabled-checkout-button" disabled>Checkout</div>}
                    {selected_items !== 0 && <div className = "checkout-button" onClick = {Checkout}>Checkout ({selected_items})</div>}
                </div>
            </DIV>
        );
    }
}
 
export default Cart;