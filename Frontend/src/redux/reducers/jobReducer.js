import { JOB_LOAD_FAIL, JOB_LOAD_RESET, JOB_LOAD_SUCCESS, JOB_LOAD_REQUEST, JOB_LOAD_SINGLE_REQUEST, JOB_LOAD_SINGLE_SUCCESS, JOB_LOAD_SINGLE_FAIL, JOB_LOAD_SINGLE_RESET, REGISTER_JOB_REQUEST, REGISTER_JOB_SUCCESS, REGISTER_JOB_FAIL, REGISTER_JOB_RESET, DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, DELETE_JOB_FAIL, DELETE_JOB_RESET, EDIT_JOB_REQUEST, EDIT_JOB_SUCCESS, EDIT_JOB_FAIL, EDIT_JOB_RESET, ALL_JOB_LOAD_REQUEST, ALL_JOB_LOAD_SUCCESS, ALL_JOB_LOAD_FAIL, ALL_JOB_LOAD_RESET } from "../constants/jobConstants"


export const loadJobReducer = (state={jobs:[]}, action) => {
    switch(action.type){
        case JOB_LOAD_REQUEST:
            return {loading : true}
        case JOB_LOAD_SUCCESS:
            return {
                loading :false,
                success: action.payload.success,
                pages:action.payload.pages,
                count:action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                jobs: action.payload.jobs
            }

        case JOB_LOAD_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case JOB_LOAD_RESET:
            return {}
        
        default:
            return state;
    }
}


export const loadAllJobReducer = (state={jobs:[]}, action) => {
    switch(action.type){
        case ALL_JOB_LOAD_REQUEST:
            return {loading : true}
        case ALL_JOB_LOAD_SUCCESS:
            return {
                loading :false,
                jobs: action.payload.jobs
            }

        case ALL_JOB_LOAD_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case ALL_JOB_LOAD_RESET:
            return {}
        
        default:
            return state;
    }
}
// single job reducer

export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case JOB_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case JOB_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleJob: action.payload.job,

            }
        case JOB_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case JOB_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}

export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_JOB_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}
        default:
            return state;
    }
}

// delete job by id
//delete product by id
export const deleteJobReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_JOB_REQUEST:
            return { loading: true }
        case DELETE_JOB_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_JOB_RESET:
            return {}
        default:
            return state;
    }
}


export const updateJobReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_JOB_REQUEST:
            return { loading: true }
        case EDIT_JOB_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                job: action.payload.job
            }
        case EDIT_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_JOB_RESET:
            return {}
        default:
            return state;
    }
}