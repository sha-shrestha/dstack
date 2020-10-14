// @flow
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';
import {getDataFailedRequest} from '@dstackai/dstack-react/dist/utils';


export const fetchList = (userName, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.FETCH});

    try {
        const request = await api.get(config.JOB_LIST(userName));

        dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            payload: request.data.jobs,
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