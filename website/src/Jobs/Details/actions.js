// @flow
import axios from 'axios';
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';
import {getDataFailedRequest} from '@dstackai/dstack-react/dist/utils';

export const fetch = (userName, id, onSuccess: Function, onFail: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.FETCH});

    try {
        const request = await api.get(config.JOB_DETAILS(userName, id));

        dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            payload: request.data.job,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        if (onFail)
            onFail(e);

        if (axios.isCancel(e))
            dispatch({
                type: actionsTypes.FETCH_FAIL,
                payload: {},
            });
        else
            dispatch({
                type: actionsTypes.FETCH_FAIL,
                payload: getDataFailedRequest(e),
            });
    }
};

export const create = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.CREATE});

    try {
        const request = await api.post(config.JOB_CREATE, params);

        dispatch({type: actionsTypes.CREATE_SUCCESS});

        dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            payload: request.data.dashboard,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        dispatch({
            type: actionsTypes.CREATE_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const update = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.UPDATE});

    try {
        const request = await api.post(config.JOB_UPDATE, params);

        dispatch({
            type: actionsTypes.UPDATE_SUCCESS,
            payload: request.data.job,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        dispatch({
            type: actionsTypes.UPDATE_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const run = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.RUN});

    try {
        const request = await api.post(config.JOB_RUN, params);

        dispatch({
            type: actionsTypes.RUN_SUCCESS,
            payload: request.data.job,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        dispatch({
            type: actionsTypes.RUN_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const stop = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.STOP});

    try {
        const request = await api.post(config.JOB_STOP, params);

        dispatch({
            type: actionsTypes.STOP_SUCCESS,
            payload: request.data.job,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        dispatch({
            type: actionsTypes.STOP_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const remove = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.DELETE});

    try {
        await api.post(config.JOB_DELETE, params);

        dispatch({
            type: actionsTypes.DELETE_SUCCESS,
            payload: params,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        dispatch({
            type: actionsTypes.DELETE_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};
