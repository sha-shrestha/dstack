import React, {createContext, useReducer, useContext} from 'react';
import actionsTypes from './actionsTypes';

const initialState = {
    currentUser: {
        loading: false,
        data: null,
    },
    appProgress: {
        active: null,
        value: null,
    },
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionsTypes.FETCH_CURRENT_USER):
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: true,
                },
            };

        case (actionsTypes.FETCH_CURRENT_USER_SUCCESS):
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    data: action.payload,
                    loading: false,
                },
            };

        case (actionsTypes.FETCH_FAIL):
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                },
            };

        case (actionsTypes.START_PROGRESS):
            return {
                ...state,
                appProgress: {
                    ...state.appProgress,
                    active: true,
                    value: null,
                },
            };

        case (actionsTypes.SET_PROGRESS):
            return {
                ...state,
                appProgress: {
                    ...state.appProgress,
                    value: action.payload,
                },
            };

        case (actionsTypes.COMPLETE_PROGRESS):
            return {
                ...state,
                appProgress: {
                    ...state.appProgress,
                    active: false,
                    value: null,
                },
            };

        case (actionsTypes.RESET_PROGRESS):
            return {
                ...state,
                appProgress: {
                    ...state.appProgress,
                    active: null,
                    value: null,
                },
            };

        default:
            return state;
    }
};

export const StateContext = createContext();

export const AppStoreProvider = ({children, apiUrl}) => (
    <StateContext.Provider value={useReducer(reducer, {...initialState, apiUrl})}>
        {children}
    </StateContext.Provider>
);

export const useAppStore = () => useContext(StateContext);
