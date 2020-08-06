import {combineReducers} from 'redux';
import listReducer from './List/reducers';
import detailsReducer from './Details/reducers';

export default combineReducers({
    list: listReducer,
    details: detailsReducer,
});
