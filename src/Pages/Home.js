import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import arrow from '../icons/arrow-right.png'
// import data from "../data/Products"
import { useEffect, useState, useContext } from 'react'
import Search from "../components/Search";
import Footer from "../components/Footer"; 
import HomeLoader from '../components/HomeLoader'
import { AppContext } from '../App'
import Error from '../components/Error'

const DIV = styled.div` 
    .main-wrapper{
        text-align: center;
        margin-top: 40px;
    }
    .header{
        margin: auto;
        display: flex;
        width: 88%;
        max-width: 1300px;
        justify-content: space-between;
        align-items: center;
    }
    .header p{
        font-size: 20px;
        font-weight: bold;
    }
    .header .view-more-div{
        display: flex;
        align-items: center;
        margin-top: 6px;
        cursor: pointer;
        padding: 8px;
    }
    .header .view-more{
        font-size: 12px;
        color: purple;
    }
    .wrapper{
        margin: auto;
        display: flex;
        max-height: 3000px;
        max-width: 1350px;
        width: 90%;
        overflow-x: auto;
        border-radius: 20px;
        margin-top: 10px;
        /* background-image: linear-gradient(252deg, rgb(215, 37, 176), black); */
    }
    .wrapper::-webkit-scrollbar{
        width: 0;
    }
    .item{
        height: 265px;
        background-color: #efeded;
        width: 150px;
        border-radius: 20px;
        margin-right: 6px;
        margin-left: 6px;
        cursor: pointer;
        text-decoration: none;
    }
    .item:hover p{
        transition: 0.2s;
        color: purple;
    }
    .item:hover span{
        transition: 0.2s;
        color: purple;
    }
    .image-holder{
        width: 150px;
        height: 150px;
    }
    .image{
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 20px;
        pointer-events: none;
    }
    .item-name{
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .item-prop{
        margin-top: 10px;
        width: 150px;
        padding: 10px;
    }
    .item-prop p{
        font-size: 14.5px;
    }
    .item-prop .price{
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 15px;
    }
    @media(max-width: 750px){
        .wrapper{
            width: 98%;
        }
    }
`

const Home = () => {
    const {isActive, accountdiv} = useContext(AppContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${process.env.REACT_APP_PRODUCT_URL}`, {
                    headers: {'Content-Type':'application/json'},
                })
                .catch(err => {
                    if(err.message){
                        setTimeout(() => {
                            setError(true)
                        }, 10000)
                    }
                })
                
                const content = await response.json();

                if (content.status === 200){
                    setProducts(content.data)
                    setLoading(false)
                }
            }
        )();   
    }, [setProducts])

    const Categories = (CategoryName, products) => {
        return (
            <div className='main-wrapper'>
                <div className= "header">
                    <p>{CategoryName}</p>
                    <div className = "view-more-div">
                        <p className = "view-more">View more</p>
                        <img src={arrow} width = "10px" alt= 'arrow' style = {{'marginTop':'1px'}}/>
                    </div>
                </div>

                <div className = "wrapper">
                    {products.map((product) => (
                        <Link to = {`/Item/${product.id}`} className = "item" key = {product.id}>
                            <div>
                                <div className='image-holder'>
                                    <LazyLoadImage src = {`${process.env.REACT_APP_IMAGE_URL}${product.image}`} className = "image" alt = "img" effect='blur'/> 
                                    {/* <LazyLoadImage src = {product.picture} className = "image" alt = "img" effect='blur'/>  */}
                                </div>
                                <div className = "item-prop">
                                    <p className='item-name'>{product.name}</p> 
                                    <p className = "price"><span style = {{'fontSize':'10px'}}>₦ </span>{product.price}</p>
                                    <p style = {{'marginBottom':'5px', 'color':'grey'}}>{product.sold} sold</p>
                                    {/* <p style = {{'fontSize':'14px'}}>Shipping: ₦ {product.shipping}</p> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
    if(error){
        return(
            <Error />
        )
    }
    if (loading === true){
        return(
            <div>                
                <Search isActive = {isActive} accountdiv = {accountdiv}/>
                <HomeLoader />
            </div>
        )
    }
    if (loading === false){
        return (  
            <DIV>
                <Search isActive = {isActive} accountdiv = {accountdiv}/>
                {Categories('Shoes', products)}
                {Categories('Electronics', products)}
                {Categories('Clothes', products)}
                <Footer />
            </DIV>
        );
    }      
}
 
export default Home;