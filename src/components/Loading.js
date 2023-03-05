import styled from 'styled-components'
import "react-activity/dist/library.css";
import { Dots } from "react-activity";

const LOADINGDIV = styled.div`
    margin: auto;
    text-align: center;

    .bounce{
        margin-top: 180px;
        margin-bottom: 500px;
    }
`
const Loading = () => {
    return (  
        <LOADINGDIV>
            <Dots speed = "1.8" className="bounce"/>
        </LOADINGDIV>
    );
}
 
export default Loading;