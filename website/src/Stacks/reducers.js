import {combineReducers} from 'redux';
import listReducer from './List/reducers';
import detailsReducer from './Details/reducers';
import attachmentsReducer from './components/Attachment/reducers';

export default combineReducers({
    list: listReducer,
    details: detailsReducer,
    attachments: attachmentsReducer,
});
