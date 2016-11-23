import { combineReducers } from 'redux';
import {
    SEARCH_WITH_STRING
} from '../actions';

function result(state = [], action) {
    switch(action.type) {
        case SEARCH_WITH_STRING:
            const {payload: result} = action;

            if( result === undefined ) return state;

            let newState = result.slice();

            return newState;
    }

    return state;
}

export default combineReducers({
    result
});