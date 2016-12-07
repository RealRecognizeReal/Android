import { combineReducers } from 'redux';
import {
    SEARCH_WITH_STRING,
    SEARCH_WITH_FORMULA_IMAGE
} from '../actions';

function result(state = [], action) {
    switch(action.type) {
        case SEARCH_WITH_STRING:
        case SEARCH_WITH_FORMULA_IMAGE:
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