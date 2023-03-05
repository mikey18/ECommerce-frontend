import styled from 'styled-components'

const DIVERROR = styled.div`
    margin: auto;
    text-align: center;
    margin-top: 150px;

    .outer{
        margin: auto;
        background-color: white;
        max-width: 100px;
        margin-top: 30px;
        border-radius: 30px;
        padding: 2px;
        cursor: pointer;
        background-image: linear-gradient(153deg,rgb(215,37,176), lightblue);
    }
    .outer:hover{
        background-color: purple;
        color: white;
    }
    .inner{
        background-color: white;
        padding: 10px;
        border-radius: 30px;
        color: purple;
    }
`
const Error = () => {
    return (  
        <DIVERROR>                
            <p style={{'fontWeight': 'bold'}}><span style = {{'fontSize':'20px'}}>O</span>ops, something went wrong.</p>
            <div className = 'outer' onClick={() => window.location.reload()}>
                <div className = 'inner'>
                    Try again
                </div>
            </div>
        </DIVERROR>
    );
}
 
export default Error;