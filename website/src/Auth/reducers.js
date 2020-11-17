import {combineReducers} from 'redux';
import loginReducer from './Login/reducers';
import signUpReducer from './SignUp/reducers';
import forgetPasswordReducer from './ForgetPassword/reducers';
import setPasswordReducer from './SetPassword/reducers';
import confirmEmailReducer from './ConfirmEmail/reducers';

export default combineReducers({
    login: loginReducer,
    signUp: signUpReducer,
    forgetPassword: forgetPasswordReducer,
    setPassword: setPasswordReducer,
    confirmEmail: confirmEmailReducer,
});
