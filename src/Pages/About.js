import React from "react"
import styled from 'styled-components'

const DIV = styled.div`
    margin-top: 10px;

    .info2{
        display: flex;
        background-color: #cfcfcf;
        width: 85%;
        height: 400px;
        border-radius: 3px;
    }
`

const About = () => {
    return (  
        <DIV>
            <div className = "info2">
                <p>About Page</p>
            </div>
        </DIV>
    );
}
 
export default About;