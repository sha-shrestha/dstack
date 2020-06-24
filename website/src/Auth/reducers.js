import {combineReducers} from 'redux';
import loginReducer from './Login/reducers';
import confirmEmailReducer from './ConfirmEmail/reducers';

export default combineReducers({
    login: loginReducer,
    confirmEmail: confirmEmailReducer,
});
