import { CREATE_JOB_TYPE_FAIL,CREATE_JOB_TYPE_REQUEST,CREATE_JOB_TYPE_SUCCESS,DELETE_JOB_TYPE_FAIL,DELETE_JOB_TYPE_REQUEST,DELETE_JOB_TYPE_SUCCESS,JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeConstant";
import { toast } from 'react-toastify';
import axios from 'axios';

export const jobTypeLoadAction = ()=> async(dispatch)=>{
    dispatch({type : JOB_TYPE_LOAD_REQUEST});
    try {
        const {data} = await axios.get(`/api/type/jobs`);
         console.log("data->");
        console.log(data);
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload : error.response.data.error
        })
    }

}

export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

export const deleteJobTypeAction = (type_id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_TYPE_REQUEST });
    try {
        const { data } = await axios.delete(`/api/type/delete/${type_id}`);
        dispatch({
            type: DELETE_JOB_TYPE_SUCCESS,
            payload: data
        });
        toast.success("Job Type deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}