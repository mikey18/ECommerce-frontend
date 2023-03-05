import styled from "styled-components";


const DIV = styled.div`
    .wrapper{
        display: flex;
        margin: auto;
        max-height: 3000px;
        max-width: 1350px;
        width: 90%;
        overflow-x: auto;
        border-radius: 20px;
        margin-top: 85px;
    }
    .wrapper::-webkit-scrollbar{
        width: 0;
    }
    @media(max-width: 750px){
        .wrapper{
            width: 98%;
        }
    }
    .item{
        height: 265px;
        padding: 75px;
        border-radius: 20px;
        margin-right: 6px;
        margin-left: 6px;
        cursor: pointer;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 50%, #ececec);
        /* animation: 0.7s shine linear infinite; */
        /* background-size: 200% 100%; */
    }   
    /* @keyframes shine {
        to {
            background-position-x: -200%;
        }
    } */
`
const HomeLoader = () => {
    return (  
        <DIV>
            {
                [...Array(4)].map((e, i) =>  
                    <div className="wrapper" key={i}>
                        {
                            [...Array(10)].map((e, i) =>  
                                <div className="item" key={i}/>
                            )
                        }
                    </div>)
            }
        </DIV>
    );
}
 
export default HomeLoader;