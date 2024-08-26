import axios from 'axios';
import {toast} from "react-toastify";
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, USER_APPLY_JOB_FAIL, USER_APPLY_JOB_REQUEST, USER_APPLY_JOB_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SINGLE_FAIL, USER_LOAD_SINGLE_REQUEST, USER_LOAD_SINGLE_SUCCESS, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstant';

export const userSignInAction = (user)=> async(dispatch)=>{
    dispatch({type : USER_SIGNIN_REQUEST});
    try {
        const {data} = await axios.post(`/api/signin`,user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload:data
        })
        toast.success("Logged-In Successfully!")
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload : error.response.data.error
        })
        toast.error(error.response.data.error)
    }

}

export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

export const userProfileAction = ()=> async(dispatch)=>{
    dispatch({type : USER_LOAD_REQUEST});
    try {
        const {data} = await axios.get(`/api/MyProfile`);
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload : error.response.data.error
        })
        
    }

}

export const userLogoutAction = ()=>async(dispatch)=>{
    dispatch({type : USER_LOGOUT_REQUEST});
    try {
        const {data} = await axios.get(`/api/logout`);
        localStorage.removeItem('userInfo')
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload:data
        })
        toast.success("Logged-Out Successfully!")
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload : error.response.data.error
        })
        toast.error(error.response.data.error)
    }
}

export const userApplyJobAction = (job)=>async(dispatch)=>{
    dispatch({type : USER_APPLY_JOB_REQUEST});
    try {
        const {data} = await axios.post(`/api/user/jobhistory`,job);
        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload:data
        })
        toast.success("Applied Successfully for this job!")
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload : error.response.data.error
        })
        toast.error(error.response.data.error)
    }
}

// all user action

export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


export const editSingleUserAction = (userId, userUpdates) => async (dispatch) => {
    dispatch({ type: EDIT_USER_REQUEST });

    try {
        const { data } = await axios.put(`/api/user/edit/${userId}`, userUpdates);

        dispatch({
            type: EDIT_USER_SUCCESS,
            payload: data
        });

        toast.success("User updated successfully");

    } catch (error) {
        dispatch({
            type: EDIT_USER_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
        toast.error(error.response?.data?.error || "An error occurred");
    }
};

export const userLoadSingleAction = (userId) => async (dispatch) => {
    dispatch({ type: USER_LOAD_SINGLE_REQUEST });

    try {
        const { data } = await axios.get(`/api/user/${userId}`);

        dispatch({
            type: USER_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOAD_SINGLE_FAIL,
            payload: error.response?.data?.error || "An error occurred"
        });
    }
};

export const deleteSingleUserAction = (user_id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        const { data } = await axios.delete(`/api/user/delete/${user_id}`);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
        toast.success("User deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}