import {GET_PROJECT_NAMES}  from "../actions/types";
import {ADD_PROJECT} from "../actions/types";

const initialState ={
    project:[]
};

export default function(state =initialState,action){
    switch(action.type){
        case ADD_PROJECT:
            return {
                ...state,
                project:action.payload
            }
        case GET_PROJECT_NAMES:
            return {
                ...state,
                project:action.payload
            }
        default:
            return state
        
    }
}