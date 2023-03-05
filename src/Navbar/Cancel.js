import styled from 'styled-components';

const DIV = styled.div`
    width: 18px;
    height: 18px;
    border: 1px solid white;

    .x{
        display: flex;
        width: 18px;
        height: 1px;
        background-color: black;
        border-radius: 20px;
        margin-top: 5px;
        transform-origin: 5px;

        &:nth-child(1) {
            transform: rotate(45deg);
        }
        &:nth-child(2) {
            transform: rotate(-45deg);
        }
    }
`

const Cancel = () => {
    return (  
        <DIV>
            <div className = "x" />
            <div className = "x" />
        </DIV>
    );
}
 
export default Cancel;