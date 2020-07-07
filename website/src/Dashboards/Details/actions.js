// @flow
import api from 'api';
import actionsTypes from './actionsTypes';
import config from 'config';
import {getDataFailedRequest} from 'utils';

export const fetch = (userName, id, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.FETCH});

    try {
        const request = await api.get(config.DASHBOARD_DETAILS(userName, id));

        dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            payload: request.data.dashboard,
        });

        if (onSuccess)
            onSuccess(request.data);
    } catch (e) {
        dispatch({
            type: actionsTypes.FETCH_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const create = (userName, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.CREATE});

    try {
        const request = await api.post(config.DASHBOARD_CREATE, {user: userName});

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
        const request = await api.post(config.DASHBOARD_UPDATE, params);

        dispatch({
            type: actionsTypes.UPDATE_SUCCESS,
            payload: params,
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

export const deleteDashboard = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.DELETE});

    try {
        await api.post(config.DASHBOARD_DELETE, params);

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

export const insertCard = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.CARDS_INSERT});

    try {
        const response = await api.post(config.DASHBOARD_CARDS_INSERT + '?attachments=true', params);
        const cards = response.data.dashboard.cards.filter(card => params.cards.find(i => i.stack === card.stack));

        dispatch({
            type: actionsTypes.CARDS_INSERT_SUCCESS,
            payload: cards,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        dispatch({
            type: actionsTypes.CARDS_INSERT_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};

export const updateCard = (params, onSuccess: Function) => async (dispatch: Function, getState: Function) => {
    const oldCards = getState().dashboards.details.data.cards;

    dispatch({type: actionsTypes.CARDS_UPDATE});

    try {
        await api.post(config.DASHBOARD_CARDS_UPDATE, params);

        dispatch({
            type: actionsTypes.CARDS_UPDATE_SUCCESS,
            payload: params,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        console.log(oldCards, getState());

        dispatch({
            type: actionsTypes.CARDS_UPDATE_FAIL,
            payload: {...getDataFailedRequest(e), cards: oldCards},
        });
    }
};

export const deleteCard = (params, onSuccess: Function) => async (dispatch: Function) => {
    dispatch({type: actionsTypes.CARDS_DELETE});

    try {
        await api.post(config.DASHBOARD_CARDS_DELETE, params);

        dispatch({
            type: actionsTypes.CARDS_DELETE_SUCCESS,
            payload: params.stack,
        });

        if (onSuccess)
            onSuccess();
    } catch (e) {
        dispatch({
            type: actionsTypes.CARDS_DELETE_FAIL,
            payload: getDataFailedRequest(e),
        });
    }
};
