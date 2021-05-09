import { Link } from 'react-router-dom';
import styled,{keyframes} from 'styled-components';
const img =process.env.PUBLIC_URL+"/Splat.png";
const href="/src/App.tsx";
const rainbow = keyframes`
    0%{color:red;}
    17%{color:orange;}
    34%{color:yellow;}
    51%{color:green;}
    68%{color:blue;}
    84%{color:indigo;}
    100%{color:violet;}
    `;
const Error = styled.p`
    margin: 0px;
    font-size: 100px;
    @media screen and (max-width: 450px){
        margin-top: 40%;
        font-size: 60px;
    }
    `;
const Message = styled.p`
    margin: 0px;
    height:20px;
    font-size:20px;
    @media screen and (max-width: 450px){
        font-size:15px;
    }
    `;
const Splat = styled.img.attrs({src:`${img}`})`
    width: 676.8px;
    height: 558.4px;
    z-index: -1;
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-45%);
    @media screen and (max-width: 450px){
        width: 338.4px;
        height: 279.2px;
        transform:translate(-50%,-50%);
    }
`;
const Center = styled.div`
    font-weight: bold;
    text-align: center;
    animation: ${rainbow} 3s linear infinite;
    text-shadow: 4px 4px 8px #000000;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-20%);
    @media screen and (max-width: 450px){
        transform:translate(-50%,-80%);
    }
    width:100%;
    `;
const StyledLink = styled.a.attrs({href:`${href}`})`
    text-decoration: none;
    margin:0px;
    &:link{
        color:aliceblue;
    }
    &:visited{
        color:aliceblue;
    }
    &:active{
        color:aliceblue;
    }
    &:hover{

        color:white;
        text-decoration: underline;
    }
`;
const PageNotFound = () => {
    return (
        <div>
            <Splat></Splat>
            <Center>
                <Error>Error 404</Error>
                <Message>Page not found. <StyledLink> Go to the main page</StyledLink></Message>
            </Center>
        </div>
        )
    }

export default PageNotFound;