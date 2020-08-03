import actionsTypes from './actionsTypes';

const initial = {
    data: {},
    errors: {},
    requestStatus: null,
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.FETCH):
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.meta.frameId]: {
                        ...state.data[action.meta.frameId],

                        [action.meta.id]: {
                            ...(
                                state.data[action.meta.frameId]
                                    ? state.data[action.meta.frameId][action.meta.id]
                                    : {}
                            ),

                            loading: true,
                            requestStatus: null,
                            error: null,
                        },
                    },
                },
            };

        case (actionsTypes.FETCH_SUCCESS):
            return {
                ...state,
                data: {
                    ...state.data,

                    [action.meta.frameId]: {
                        ...state.data[action.meta.frameId],

                        [action.meta.id]: {
                            ...action.payload,
                            loading: false,
                        },
                    },
                },
            };

        case (actionsTypes.FETCH_FAIL):
            return {
                ...state,

                data: {
                    ...state.data,
                    [action.meta.frameId]: {
                        ...state.data[action.meta.frameId],

                        [action.meta.id]: {
                            error: action.payload.error,
                            requestStatus: action.payload.requestStatus,
                            loading: false,
                        },
                    },
                },
            };
        default:
            break;
    }

    return state;
};
