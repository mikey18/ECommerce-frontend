import { useRef } from "react";
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
    
    .scroll{
        overflow-x: auto;
        height: 70%;
    }
    .fast-contain{
        padding: 30px;
        border-radius: 20px;
        background-color: white;
        max-height: 580px;
        max-width: 500px;
        width: 90%;
        height: 90%;
    }
    .text-area{
        width: 100%;   
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        padding-top: 21px;
        padding-bottom: 21px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 15px;
        margin-bottom: 20px;
    }
    .text-area:focus{
        outline: none !important;
        border-color: purple;
        box-shadow: 0 0 2px purple;
    }
`
const DeliveryDetails = ({ showDeliveyDetails, setshowDeliveyDetails, 
                           setShippingAddress, setPhonenumber, setState }) => {
    
    const state_ref = useRef()
    const shipping_address_ref = useRef()
    const phonenumber_ref = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(state_ref.current.value)
        setShippingAddress(shipping_address_ref.current.value)
        setPhonenumber(phonenumber_ref.current.value)
        setshowDeliveyDetails(false)
    }

    if(showDeliveyDetails === true){
        return (  
            <DIV>
                <div className="fast-contain">
                    <div className = "container-cancel" onClick={() => setshowDeliveyDetails(false)}><Cancel /></div>
                    <p style = {{'fontSize':'18px', 'fontWeight':'bold', 'marginBottom':'50px'}}>Delivey details</p>
                    <div className="scroll">
                        <form className="formm" onSubmit={handleSubmit}>
                        <label className="label">State</label>
                            <input ref = {state_ref} className="form-input" required/>
                            <label className="label">Shipping Address</label>
                            <textarea ref = {shipping_address_ref} rows = "6" className="text-area" required/>
                            <label className="label">Phone Number</label>
                            <input ref = {phonenumber_ref} className="form-input" required/>
                            <button className="button" type="submit">Save</button>
                            <br /><br />
                        </form>
                    </div>
                </div>
            </DIV>
        );
    }
}
 
export default DeliveryDetails;