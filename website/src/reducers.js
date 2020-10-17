import {combineReducers} from 'redux';
import appReducers from 'App/reducers';
import authReducers from 'Auth/reducers';
import stacksReducers from 'Stacks/reducers';
import dashboardsReducers from 'Dashboards/reducers';

export default combineReducers({
    app: appReducers,
    auth: authReducers,
    stacks: stacksReducers,
    dashboards: dashboardsReducers,
});
