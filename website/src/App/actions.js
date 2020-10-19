// @flow
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';

export const fetchUser = (onSuccess: Function, onFail: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.FETCH_USER});

    try {
        const request = await api.get(config.USER_DATA_URL);

        dispatch({
            type: actionsTypes.FETCH_USER_SUCCESS,
            payload: request.data,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        localStorage.removeItem(config.TOKEN_STORAGE_KEY);
        dispatch({type: actionsTypes.FETCH_USER_FAIL});

        if (onFail)
            onFail();
    }
};

export const updateToken = (onSuccess: Function) => async (dispatch: Function, getState: Function) => {
    const {user} = getState().app.userData;

    if (!user)
        return;

    dispatch({type: actionsTypes.UPDATE_USER_TOKEN});

    try {
        const request = await api.post(config.UPDATE_TOKEN_URL, {user});

        dispatch({
            type: actionsTypes.UPDATE_USER_TOKEN_SUCCESS,
            payload: request.data.token,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        dispatch({type: actionsTypes.UPDATE_USER_TOKEN_FAIL});
    }
};


export const logOut = (onSuccess: Function) => async (dispatch: Function) => {
    dispatch({
        type: actionsTypes.FETCH_USER_SUCCESS,
        payload: null,
    });

    localStorage.removeItem(config.TOKEN_STORAGE_KEY);

    if (onSuccess)
        onSuccess();
};
