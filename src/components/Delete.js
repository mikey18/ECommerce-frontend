import styled from "styled-components";

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

    .popup-inner{
        margin: auto;
        width: 90%;
        background: rgba(0,0,0,0.6);
        border-radius: 11px;
        text-align: center;
        max-width: 342px;
    }
    .question{
        padding: 30px;
        color: white;
        font-size: 15px;
    }
    .yes-no{
        display: flex;
        justify-content: space-around;
    }
    .y{
        width: 50%;
        text-align: center;
        cursor: pointer;
        border-right: 1px solid #636363;
        border-top: 1px solid #636363;
        padding: 15px;
        color: red;
        font-weight: bold;
        font-size: 15px;
    }
    .n{
        width: 50%;
        text-align: center;
        cursor: pointer;
        border-top: 1px solid #636363;
        padding: 15px;
        color: white;
        font-size: 15px;
    }
`

const Delete = ({ popup, handleDelete, cart_id, setPopup }) => {
    if(popup === true){
        return (  
            <DIV className = "popup">
                <div className = "popup-inner">
                    <div className = "question">
                        Are you sure you want to remove this item?
                    </div>
                    <div className = "yes-no">
                        <div className = "y" onClick = {() => handleDelete(cart_id)}>
                            Remove
                        </div>
                        <div className = "n" onClick = {() => setPopup(false)}>
                            Cancel
                        </div>
                    </div>
                </div>
            </DIV>
        )
    }
}
 
export default Delete;