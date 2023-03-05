import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useEffect, useState, useContext } from 'react';
import MiniSearch from '../components/MiniSearch';
import ItemLoader from '../components/ItemLoader';
import { AppContext } from '../App';
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import Footer from "../components/Footer"; 


const DIV = styled.div`
    margin: auto;
    margin-top: 15px;

    .media{
        margin: auto;
        background-color: #cfcfcf;
        border-radius: 30px;
        margin-bottom: 25px;
        max-width: 500px;
        max-height: 500px;
        aspect-ratio: 1/1;
        width: 90%;
        height: 90%;
    }
    .image{
        width: 100%;
        height: 100%;
        border-radius: 30px;
        pointer-events: none;
        aspect-ratio: 1/1;
    }
    .price{
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        margin-bottom: 20px;
    }
    .name{
        /* font-size: 20px; */
        text-align: center;
        margin-bottom: 20px;
    }
    .no-message{
        margin: auto;
        text-align: center;
        margin-Top: 20px;
        border-radius: 20px;
        max-width: 150px;
        height: 26px;
        color: green;
    }
    .added{
        margin: auto;
        text-align: center;
        margin-Top: 20px;
        border-radius: 20px;
        max-width: 150px;
        padding: 5px;
        font-size: 13px;
        color: green;
        background-color: #caffca;
    }
    .add-minus{
        display: flex;
        height: 28px;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }
    .minus{
        display: flex;
        width: 28px;
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
        width: 28px;
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
    .buy-add{
        margin: auto;
        display: flex;
        justify-content: space-between;
        max-width: 215px;
        margin-top: 10px;
        margin-bottom: 50px;
    }
    .purchase{
        padding: 15px;
        background-color: purple;
        border-radius: 30px;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
    .purchase:hover{
        background-color: #750075;
    }
    .description{
        margin: auto;
        border: 1px solid #cfcfcf;
        max-width: 1000px;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 10px;
        width: 95%;
    }
    .description #head{
        font-weight: bold;
        font-size: 17px;
        margin-bottom: 10px;
    }
    .visit-contact{
        display: flex;
    }
    .se{
        padding: 8px;
        background-image: linear-gradient(153deg,rgb(215,37,176),lightblue);
        color: white;
        font-size: 13px;
        border-radius: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .description #body{
        text-align: justify;
    }
`

const Item = () => {
    const { carts, setCarts, isActive, accountdiv, setCheckout} = useContext(AppContext)
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)


    const increase = () => {
        if(quantity < 100){
            setQuantity(quantity => quantity+=1)
        }
    }
    const decrease = () => {
        if(quantity > 1){
            setQuantity(quantity => quantity-=1)
        }
    }
    const newCart = {
                        "id": products.id, 
                        "image": products.image,
                        "name": products.name, 
                        "price": products.price, 
                        "shipping": products.shipping,
                        "quantity": quantity
                    }
    const message_timeout = () => {
        setTimeout(() => {
            setMessage('')
        }, 2200)
    } 
    const handleupdateCart = () => {
        if(carts.some(cart => cart.id === newCart.id)){
            setMessage('Already added to Cart')
            message_timeout()
        }
        else{
            setCarts([...carts, newCart])
            setMessage('Added to Cart')
            message_timeout()
        }
    }
    const Buynow = () => {  
        var buynow = [newCart]
        var buynow_sum = buynow.reduce((accum, { price, quantity, shipping}) => (
                            accum + (price * quantity) + (shipping * quantity)
                        ), 0)
        const encrypted_checkout = CryptoJS.AES.encrypt(JSON.stringify(buynow), process.env.REACT_APP_ENCRYPTION_KEY)
        const encrypted_sum = CryptoJS.AES.encrypt(JSON.stringify(buynow_sum), process.env.REACT_APP_ENCRYPTION_KEY)
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
    useEffect(() => {
        (
            async () => {

                const response = await fetch(`${process.env.REACT_APP_PRODUCT_URL}?id=${params.id}`, {
                    headers: {"Content-Type":"application/json"}
                })
                .catch(err => {
                    if(err.message){
                        setTimeout(() => {
                            setError(true)
                        }, 10000)
                    }
                })

                const content = await response.json()
                
                if(content.status === 200){
                    setProducts(content.data)
                    setLoading(false)
                }
            }
        )();
    }, [setProducts, params.id])

    if(error){
        return(
            <Error />
        )
    }
    if (loading === true){
        return(
            <div>
                <DIV>   
                    <MiniSearch />
                </DIV>
                <ItemLoader />           
            </div>  
        )
    }
    else{
        return (  
            <DIV>
                <MiniSearch isActive = {isActive} accountdiv = {accountdiv}/>
                <div>
                    <div className = "media">
                        <LazyLoadImage src = {`${process.env.REACT_APP_IMAGE_URL}${products.image}`} className = "image" alt = "img" effect='blur'/> 
                    </div>
                    <p className = "price">₦ {products.price}</p>
                    <p className = "name">{products.name}</p>
                    <p style={{"textAlign":"center", "fontSize":"13px"}}>Shipping: ₦ {products.shipping}</p>
                    <p style={{"textAlign":"center", 'marginTop':'15px', 'color':'grey', 'fontSize':'11px'}}>Quantity</p>
    
                    <div className = "add-minus">
                        <div className="minus" onClick = {decrease}>
                            -
                        </div>
                        <p className = "num">{quantity}</p>
                        <div className="add" onClick = {increase}>
                            +
                        </div>
                    </div>
                    {!message && <div className = "no-message">{message}</div>}
                    {message && <div className = "added">{message}</div>}
                    <div className = "buy-add">
                        <div className="purchase" onClick = {handleupdateCart}>
                            Add to Cart
                        </div>
                        <div className="purchase" onClick = {Buynow}>
                            Buy Now
                        </div>
                    </div>
                    <div className='description'>
                        <p id = "head">My Store</p>
                        <div className='visit-contact'>
                            <div className='se'>Visit Store</div>
                            <div className='se'>Contact</div>
                        </div>
                    </div>
                    <div className='description'>
                        <p id = "head">Delivery</p>
                        <p id = "body">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        </p>
                    </div>
                    <div className='description'>
                        <p id = "head">Description</p>
                        <p id = "body">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                    </div>
                    <div className='description'>
                        <p id = "head">Reviews</p>
                        <p id = "body">
                        </p>
                    </div>
                </div>    
                <Footer />      
            </DIV>
        );
    }
}
 
export default Item;