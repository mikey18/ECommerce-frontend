import { LazyLoadImage } from 'react-lazy-load-image-component'
import profile from "../images/profile.jpg"
import styled from 'styled-components';

const DIV = styled.div`
    margin: 0;
    text-align: center;

    .profile-picture{
        margin: auto;
        background-color: #cfcfcf;
        height: 80px;
        width: 80px;
        border-radius: 80px;
        margin-bottom: 30px;
    }
    .picture{
        width: 100%;
        border-radius: 80px;
        height: 100%;
        cursor: pointer;
    }
    .posts{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: auto;
        max-width: 800px;
        margin-top: 100px;
        width: 100%;
    }
    .post{
        margin-right: 15px;
        margin-left: 15px;
        margin-bottom: 15px;
        margin-top: 15px;
        aspect-ratio: 1/1;
        border: 1px solid grey;
    }

    @media(max-width: 600px){
        .post{
            margin: 0;
        }
    }
`

const SellerPage = () => {
    return (  
        <DIV>
            <div className="profile-picture">
                <LazyLoadImage src={profile} effect = "blur" className="picture" alt="profile"/>
            </div>
            <p style = {{'fontSize':'20px', 'fontWeight':'bold'}}>FIRST FUCKING SELLER</p>

            <div className='posts'>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                <div className='post'>
                </div>
                {/* <div className='post'>
                </div> */}
            </div>
        </DIV>
    );
}
 
export default SellerPage;