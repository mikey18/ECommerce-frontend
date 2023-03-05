import React, {useContext} from "react"
import styled from 'styled-components'
import MiniSearch from "../components/MiniSearch";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AppContext } from "../App";
import one from "../images/88.jpg"
import store from "../images/store.png"


const DIV = styled.div`
    .stores{
        display: flex;
        max-width: 1000px;
        margin: auto;
        overflow-x: auto;
        width: 96%;
        align-items: center;
        margin-top: -15px;
    }
    .stores::-webkit-scrollbar{
        width: 0%;
    }
    .cover-store{
        text-align: center;
        margin-right: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
    .cover-store p{
        font-size: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 60px;
        width: 100%;
        margin-left: 7px;
    }
    .store{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 75px;
        height: 75px;
        border-radius: 40px;
        border: 1px solid purple;
        /* background-image: linear-gradient(153deg,rgb(215,37,176), lightblue); */
        margin-bottom: 5px;
    }
    .store-image{
        width: 95%;
        height: 95%;
        border-radius: 40px;
    }
    .seemore{
        color: purple;
        margin-right: 30px;
        margin-left: 10px;
        cursor: pointer;
    }
    .info2{
        /* display: flex; */
        margin: auto;
        width: 95%;
        height: 400px;
        border-radius: 3px;
        max-width: 1300px;
    }
    .sear{
        display: grid;
        margin: auto;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        width: 98%;
        max-width: 1300px;
        margin-top: 20px;
    }
    .item{
        height: 350px;
        background-color: #efeded;
        border-radius: 20px;
        margin-bottom: 10px;
        margin-right: 5px;        
        cursor: pointer;
        text-decoration: none;
        margin-left: 5px;
    }
    .image-holder{
        width: 100%;
        height: 50%;
    }
    .image{
        width: 100%;
        border-radius: 20px;
        pointer-events: none;
    }
    .item-prop{
        margin-top: 40px;
        width: 100%;
        text-align: center;
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
    .item:hover{
        box-shadow: 0 0px 6px 0 #cbc3e3;
    }
    @media(max-width: 1262px){
        .sear{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
    }
    @media(max-width: 1110px){
        .sear{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }
    @media(max-width: 890px){
        .sear{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
    @media(max-width: 660px){
        .sear{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media(max-width: 450px){
        .sear{
            grid-template-columns: 1fr 1fr;
        }
    }
    @media(max-width: 280px){
        .item{
            height: 250px;
        }
    }
`

const SearchResults = () => {
    const {isActive, accountdiv} = useContext(AppContext)
    return (  
        <DIV>
            <MiniSearch isActive = {isActive} accountdiv = {accountdiv}/>
           
            <div className="stores">
                {
                    [...Array(15)].map((e, i) => 
                        <div className="cover-store" key={i}>
                            <div className="store">
                                <LazyLoadImage src = {store} className = "store-image" alt = "store"/>
                            </div>
                            <p>crucifxx</p>
                        </div>
                    )
                }
                {/* <div className = "seemore">more</div> */}
            </div>
            <div className="sear">
                {
                    [...Array(30)].map((e, i) => 
                        <div className="item" key={i}>
                            <div className='image-holder'>
                                <LazyLoadImage src = {one} className = "image" alt = "img"/> 
                            </div>
                            <div className = "item-prop">
                                <p>Glove class world</p> 
                                <p className = "price"><span style = {{'fontSize':'10px'}}>₦ </span>1000.<span style = {{'fontSize':'10px'}}>05</span></p>
                                <p style = {{'marginBottom':'5px', 'color':'grey'}}>9 sold</p>
                                <p>Shipping: ₦ 1000</p>
                            </div>
                        </div>
                    )
                } 
            </div>
        </DIV>
    );
}
 
export default SearchResults;