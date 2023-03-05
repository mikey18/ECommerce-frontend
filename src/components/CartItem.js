import del from "../icons/delete.png"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from "react-router-dom"
import Delete from "./Delete"
import { useState} from "react"
import CryptoJS from "crypto-js"

const CartItem = ({carts, setCarts, cart, priceArray, setPriceArray}) => {
    const[select, setSelect] = useState(false)
    const[popup, setPopup] = useState(false)
    const[amount, setAmount] = useState(cart.quantity)

    const increase = () => {
        if(cart.quantity < 100){
            cart.quantity++
            const encrypted_cart = CryptoJS.AES.encrypt(JSON.stringify(carts), process.env.REACT_APP_ENCRYPTION_KEY)
            localStorage.setItem("cart", encrypted_cart)
            setAmount(cart.quantity)

            // eslint-disable-next-line
            priceArray.map((price) => {
                if (price.id === cart.id){
                    price.quantity++
                    setPriceArray([...priceArray])
                }
            });
        }
    }
    const decrease = () => {
        if(cart.quantity > 1){
            cart.quantity--
            const encrypted_cart = CryptoJS.AES.encrypt(JSON.stringify(carts), process.env.REACT_APP_ENCRYPTION_KEY)
            localStorage.setItem("cart", encrypted_cart)
            setAmount(cart.quantity)

            // eslint-disable-next-line
            priceArray.map((price) => {
                if (price.id === cart.id){
                    price.quantity--
                    setPriceArray([...priceArray])
                }
            });
            
        }
    }
    const handleSelect = () => {
        setSelect(!select)

        const id_price = {
            "id": cart.id,
            "image": cart.image,
            "name": cart.name,
            "price": cart.price,
            "shipping": cart.shipping,
            "quantity": cart.quantity
        }

        if(!select === true){
            setPriceArray([...priceArray, id_price])
        }
        else{
            setPriceArray(price => price.filter((priceArray) => priceArray.id !== id_price.id))
        }
    }
    const handleDelete = (cart_id) => {
        setCarts(cart => cart.filter((carts) => carts.id !== cart_id))
        setPriceArray(price => price.filter((priceArray) => priceArray.id !== cart_id))
        setPopup(false)
    }
    const handlePopUp = () => {
        setPopup(true)
    }

    return ( 
        <div className = "main">
            <div className = "submain">
                {/* <Link to = {`/Item/${cart.id}`} className = "main-link"> */}
                <Link to = {`/Item/${cart.id}/${cart.name}/${cart.price}/${cart.sold}/${cart.shipping}`} className = "main-link">
                    <LazyLoadImage src= {`${process.env.REACT_APP_IMAGE_URL}${cart.image}`} alt="one" className = "image" effect="blur"/>
                </Link>
                <div className = "image2">
                    <div className = "select-delete">                     
                        <div className = "select-true" onClick = {() => handleSelect()}>
                            {select === true && <div className = "inner-purple"/> }            
                        </div>
                        <div style = {{'cursor':'pointer'}} onClick = {handlePopUp}>
                            <img src={del} alt="delete" width = "17px" style = {{'pointerEvents':'none'}}/>
                        </div> 
                    </div>
                    <div className = "texts">
                        {/* <Link to = {`/Item/${cart.id}`} className = "main-link"> */}
                        <Link to = {`/Item/${cart.id}/${cart.name}/${cart.price}/${cart.sold}/${cart.shipping}`} className = "main-link">

                            <p className = "first">{cart.name}</p>
                            <p className = "second">₦ {cart.price}</p>
                            <p className = "third">Shipping: ₦ {cart.shipping}</p>
                        </Link>
                    </div>
                    <div className = "add-minus">
                        <div className="minus" onClick = {decrease}>
                            -
                        </div>
                        <p className = "num">{amount}</p>
                        <div className="add" onClick = {increase}>
                            +
                        </div>
                    </div>
                </div>
            </div>
            <Delete popup = {popup} handleDelete = {handleDelete} cart_id = {cart.id} cart_price = {cart.price} setPopup = {setPopup}/>
        </div>
    );
}
 
export default CartItem;