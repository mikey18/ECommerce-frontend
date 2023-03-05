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


const Messages = ({ showMessages, setshowMessages }) => {
    if(showMessages === true){
        return (  
            <div className="blur-effect">
                <DIV>
                    <div className="fast-container">
                        <div className = "container-cancel" onClick={() => setshowMessages(false)}><Cancel /></div>
                        <p style = {{'fontSize':'18px', 'fontWeight':'bold'}}>Messages</p>
                    </div>
                </DIV>
            </div>
           
        );
    }
}
 
export default Messages;