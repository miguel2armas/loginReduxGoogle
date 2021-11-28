import { ActionTypes } from "../constants/action-types.js";

export const initialState = {
                stateLogIn:false,
                googleId:"",
                name:"",
                email:"",
                imageUrl:"",
                tokenId:""
            };
let stateUser
if(localStorage.getItem("tokenId") === null || localStorage.getItem("tokenId") === "null" || localStorage.getItem("tokenId") === ""){
    stateUser =  initialState;
}else{
    stateUser =  {
        stateLogIn:true,
        googleId:"",
        name:"",
        email:"",
        imageUrl:"",
        tokenId:localStorage.getItem("tokenId")
    }
}


export const UserReducer = (state = stateUser, { type, payload }) => {
    switch (type) {
        case ActionTypes.SIGN_IN_USER:
            localStorage.setItem("tokenId", payload.tokenId);
            payload = {...payload, stateLogIn: true}
            return payload;
        case ActionTypes.SIGN_OUT_USER:
            localStorage.setItem("tokenId", null);
            return initialState;
        default:
            return state;
    }
};