import styled from "styled-components";

const DIV = styled.div`
    display: flex;
    width: 100%;
    background-color: purple;
    border-radius: 20px 20px 0px 0px;
    margin-top: 200px;
    justify-content: center;
    bottom: 0px;


    .copyright{
        color: white;
        margin-top: 150px;
        bottom: 0;
        text-align: center;
        margin-bottom: 10px;
    }
`

const BottomBar = () => {
    return (
        <DIV>
            <p className = "copyright">Copyright &copy; 2022</p>
        </DIV>
    );
}
 
export default BottomBar;