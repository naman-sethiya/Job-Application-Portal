import { createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools} from '@redux-devtools/extension';
import { deleteJobReducer, loadAllJobReducer, loadJobReducer, loadJobSingleReducer, registerAjobReducer, updateJobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, deleteJobTypeReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';
import { allUserReducer, deleteUserReducer, loadUserSingleReducer, updateUserReducer, userApplyJobReducer, userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';

//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    loadAllJobs: loadAllJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer,
    updateJob: updateJobReducer,
    deleteJobType: deleteJobTypeReducer,
    updateUser: updateUserReducer,
    singleUser: loadUserSingleReducer,
    deleteUser: deleteUserReducer
})

//initial state
let initialState = {
    signIn : {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;