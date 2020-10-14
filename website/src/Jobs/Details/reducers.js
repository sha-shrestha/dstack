import actionsTypes from './actionsTypes';

const initial = {
    loading: false,
    errors: {},
    requestStatus: null,
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.FETCH):
            return {
                ...state,
                loading: true,
                error: null,
                requestStatus: null,
            };

        case (actionsTypes.FETCH_SUCCESS):
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case (actionsTypes.FETCH_FAIL):
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                requestStatus: action.payload.requestStatus,
            };

        case (actionsTypes.UPDATE_SUCCESS):
            return {
                ...state,

                data: {
                    ...state.data,
                    ...action.payload,
                },
            };

        case (actionsTypes.RUN):
            return {
                ...state,
                running: true,
            };

        case (actionsTypes.RUN_SUCCESS):
            return {
                ...state,
                running: false,

                data: {
                    ...state.data,
                    ...action.payload,
                },
            };

        case (actionsTypes.RUN_FAIL):
            return {
                ...state,
                running: false,
            };

        case (actionsTypes.STOP):
            return {
                ...state,
                stopping: true,
            };

        case (actionsTypes.STOP_SUCCESS):
            return {
                ...state,
                stopping: false,

                data: {
                    ...state.data,
                    ...action.payload,
                },
            };

        case (actionsTypes.STOP_FAIL):
            return {
                ...state,
                stopping: false,
            };

        default:
            break;
    }

    return state;
};
