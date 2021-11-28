import React, {useEffect} from "react";
import GoogleLogin, { GoogleLogout, useGoogleLogout } from "react-google-login";
import {useDispatch, useSelector} from "react-redux";
import {signInUser, signOutUser} from "../../redux/actions/signUserActions";

const axios = require('axios');
const Home = () => {
    let userState = useSelector((state)=>state.userState);
    const dispatch = useDispatch();
    const { signOut } = useGoogleLogout({})
    const responseGoogle = (e)=>{
        const userData={
        googleId:e.profileObj.googleId,
        name:e.profileObj.name,
        email:e.profileObj.email,
        imageUrl:e.profileObj.imageUrl,
        tokenId:e.tokenId
        }
        console.log(userData);
        dispatch(signInUser(userData));
    }
    const logout = () =>{
        signOut();
        dispatch(signOutUser());
    }
    const userVerify = async() =>{
        console.log(userState.tokenId);
        if(userState.tokenId&&userState.tokenId!==null&&userState.tokenId!=="null"){
            let res = null;
            try{
                res = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${userState.tokenId}`);
                const userData={
                    googleId: res.data.sub,
                    name: res.data.name,
                    email: res.data.email,
                    imageUrl: res.data.picture,
                    tokenId:userState.tokenId
                }
                console.log(userData);
                dispatch(signInUser(userData));
            }catch (err) {
                console.log(err.response.status);
                console.log(err.response.data);
                dispatch(signOutUser());
            }

        }
    }
    useEffect(() => {
        userVerify();
    }, [])
  return !userState.stateLogIn?
        <div className="p-5 container">
            <h3>login</h3>
            <GoogleLogin
                clientId="341846146220-8g6gupvq3en8g5q0n9u03kg3c5oe898r.apps.googleusercontent.com"
                buttonText="Login with Google"
                className="btn-google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
        </div>
        :
        <div className="p-5 container">
            <div><h3>home</h3>
                <div>googleId: {userState.googleId}</div>
                <div>name: {userState.name}</div>
                <div>email: {userState.email}</div>
                <div className="m-3"><img src={userState.imageUrl} alt="img"/></div>
            </div>
            <GoogleLogout
                clientId="341846146220-8g6gupvq3en8g5q0n9u03kg3c5oe898r.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            />
        </div>

}
export default Home