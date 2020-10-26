import {combineReducers} from 'redux';
import appReducers from 'App/reducers';
import authReducers from 'Auth/reducers';
import stacksReducers from 'Stacks/reducers';

export default combineReducers({
    app: appReducers,
    auth: authReducers,
    stacks: stacksReducers,
});
