import styled from "styled-components";

const DIV = styled.div`
    p{
        text-align: center;
        margin-top: 250px;
        font-weight: bold;
        font-size: 20px;
    }
    
`

const NotFound = () => {
    return (  
        <DIV>
            <p>404 NOT FOUND</p>
        </DIV>
    );
}
 
export default NotFound;