import styled from "styled-components";


const DIV = styled.div`
    .card {
        margin: auto;
        max-width: 500px;
        height: 500px;
        width: 90%;
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 0.9s shine linear infinite; 
        border-radius: 30px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .card2{
        margin: auto;
        width: 300px;
        height: 50px;
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 0.7s shine linear infinite; 
        border-radius: 30px;
        margin-bottom: 20px;
    }
    @keyframes shine {
        to {
            background-position-x: -200%;
        }
    }
   
`
const ItemLoader = () => {
    return (  
        <DIV>
            <div className="card">
            </div>
            <div className="card2">
            </div>
            <div className="card2">
            </div>
        </DIV>
    );
}
 
export default ItemLoader;