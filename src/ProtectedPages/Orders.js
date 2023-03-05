import styled from "styled-components";
import Cancel from "../Navbar/Cancel";

const DIV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    backdrop-filter: blur(5px);  

`


const Orders = ({ showOrders, setshowOrders }) => {
    if(showOrders === true){
        return (  
            <DIV>
                <div className="fast-container">
                    <div className = "container-cancel" onClick={() => setshowOrders(false)}><Cancel /></div>
                    <p style = {{'fontSize':'18px', 'fontWeight':'bold'}}>Orders</p>
                </div>
            </DIV>
        );
    }
}
 
export default Orders;