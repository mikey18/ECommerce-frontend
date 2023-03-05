import { BrowserRouter, Routes, Route,} from "react-router-dom";
import { useState, createContext, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Item from "./Pages/Item";
import About from "./Pages/About";
import SearchResults from "./Pages/SearchResults";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Checkout from "./Pages/Checkout";
import Profile from "./ProtectedPages/Profile";
import CryptoJS from "crypto-js";
import SellerForm from "./accounts/SellerForm";
import NotFound from "./Pages/NotFound";

// decrypted cart data
if(localStorage.getItem("cart") === null){
  var cartFromLocalStorage = []
}
else{
  var decrypted_cart = CryptoJS.AES.decrypt(localStorage.getItem("cart"), process.env.REACT_APP_ENCRYPTION_KEY)
  cartFromLocalStorage = JSON.parse(decrypted_cart.toString(CryptoJS.enc.Utf8))
}
export const AppContext = createContext()

function App() {
  //for navbar
  const [isActive, setIsActive] = useState(false)
  const [accountdiv, setAccountdiv] = useState(false)
  
  //CARTS STUFFS
  const [checkout, setCheckout] = useState(false)
  const [carts, setCarts] = useState(cartFromLocalStorage)
  const cartnum = carts.length    

  useEffect(() => {
    //ENCRYPTED Cart DATA
    const encrypted_cart = CryptoJS.AES.encrypt(JSON.stringify(carts), process.env.REACT_APP_ENCRYPTION_KEY)
    localStorage.setItem("cart", encrypted_cart)
  }, [carts])

  //closes dropdowns when clicked outside
  const closedropdown = () => {
    if(isActive === true){
      setIsActive(false)
    }
    if(accountdiv === true){
      setAccountdiv(false)
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value = {{cartnum, isActive, setIsActive, 
                                       accountdiv, setAccountdiv, carts, setCarts,
                                       checkout, setCheckout}}>
          <Navbar/>
          <div onClick={closedropdown}>
            <Routes>
              <Route path = "/" element = {<Home/>}/>
              <Route path = "/Cart" element = {<Cart/>}/>
              <Route path = "/Item/:id" element = {<Item/>}/>
              <Route path = "/About" element = {<About />}/>
              <Route path = "/Search" element = {<SearchResults/>}/>
              <Route path = "/accounts/Seller" element = {<SellerForm />}/>
              <Route path = "/accounts/Signup" element = {<Signup />}/>
              <Route path = "/accounts/Login" element = {<Login />}/>
              <Route path = "/Checkout" element = {<Checkout />}/>
              <Route path = "/accounts/Profile" element = {<Profile/>}/>
              <Route path = "*" element = {<NotFound />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
