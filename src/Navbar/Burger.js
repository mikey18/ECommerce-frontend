import styled from 'styled-components';
import Cancel from './Cancel';

const DIV = styled.div`
    display: none;
    width: 18px;
    height: 18px;
    border: 1px solid white;
    
    .burger{
        display: flex;
        height: 1.3px;
        width: 18px;
        margin-bottom: 5px;
        background-color: black;
        border-radius: 20px;
    }
    @media (max-width: 800px){
        display: block;   
    }
`

const Burger = ({isActive}) => {
    if (isActive){
        return (  
            <Cancel />
        );
    }
    else{
        return (  
            <DIV>
                <div className = "burger"></div>
                <div className = "burger"></div>
                <div className = "burger"></div>
            </DIV>
        );
    }
   
}
 
export default Burger;