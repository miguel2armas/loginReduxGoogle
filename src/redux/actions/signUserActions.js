import { ActionTypes } from "../constants/action-types";

export const signInUser = (userState) => {
    return {
        type: ActionTypes.SIGN_IN_USER,
        payload: userState,
    };
};
export const signOutUser = () => {
    return {
        type: ActionTypes.SIGN_OUT_USER,
        payload: null,
    };
};