// @flow
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';
import {getDataFailedRequest} from 'utils';


export const fetchList = (userName, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.FETCH});

    try {
        const request = await api.get(config.DASHBOARD_LIST(userName));

        dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            payload: request.data.dashboards,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        dispatch({
            type: actionsTypes.FETCH_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};