import {combineReducers} from 'redux';
import listReducers from './List/reducers';
import detailsReducers from './Details/reducers';


export default combineReducers({
    list: listReducers,
    details: detailsReducers,
});
