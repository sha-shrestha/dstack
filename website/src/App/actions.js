// @flow
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';

export const setSearch = (value: string) => async (dispatch: Function) => {
    dispatch({
        type: actionsTypes.SET_SEARCH_VALUE,
        payload: value,
    });
};

export const setSearchPlaceholder = (placeholder: string) => async (dispatch: Function) => {
    dispatch({
        type: actionsTypes.SET_SEARCH_PLACEHOLDER,
        payload: placeholder,
    });
};

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
        localStorage.removeItem('token');
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

    localStorage.removeItem('token');

    if (onSuccess)
        onSuccess();
};


export const startAppProgress = () => async (dispatch: Function) => {
    dispatch({type: actionsTypes.START_PROGRESS});
};

export const setAppProgress = (progress: ?number) => async (dispatch: Function) => {
    dispatch({
        type: actionsTypes.SET_PROGRESS,
        payload: progress,
    });
};

export const completeAppProgress = () => async (dispatch: Function) => {
    dispatch({type: actionsTypes.COMPLETE_PROGRESS});
};

export const resetAppProgress = () => async (dispatch: Function) => {
    dispatch({type: actionsTypes.RESET_PROGRESS});
};
