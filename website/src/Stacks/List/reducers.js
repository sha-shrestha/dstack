import actionsTypes from './actionsTypes';

const initial = {
    loading: false,
    attachments: {},
    errors: {},
    requestStatus: null,
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.FETCH):
            return {
                ...state,
                loading: true,
                errors: {},
                requestStatus: null,
            };

        case (actionsTypes.FETCH_SUCCESS):
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: action.payload.error,
            };

        case (actionsTypes.FETCH_FAIL):
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                requestStatus: action.payload.requestStatus,
            };


        case (actionsTypes.FETCH_ATTACHMENT):
            return {
                ...state,
                attachments: {
                    ...state.attachments,
                    [action.meta.id]: {
                        ...state.attachments[action.meta.id],
                        loading: true,
                    },
                },
            };

        case (actionsTypes.FETCH_ATTACHMENT_SUCCESS):
            return {
                ...state,
                attachments: {
                    ...state.attachments,
                    [action.meta.id]: {
                        data: action.payload,
                        loading: false,
                    },
                },
            };

        case (actionsTypes.FETCH_ATTACHMENT_FAIL):
            return {
                ...state,

                attachments: {
                    ...state.attachments,
                    [action.meta.id]: {
                        error: action.payload.error,
                        loading: false,
                    },
                },
            };


        case (actionsTypes.DELETE_SUCCESS):
            const data = state.data.filter(i => i.name !== action.payload);

            return {
                ...state,
                loading: false,
                data,
            };

        case (actionsTypes.DELETE_FAIL):
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
};
