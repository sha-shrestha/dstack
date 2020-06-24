import actionsTypes from './actionsTypes';

const initial = {loading: false};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.CONFIRM):
            return {
                ...state,
                loading: true,
            };

        case (actionsTypes.CONFIRM_SUCCESS):
            return {
                ...state,
                loading: false,
            };

        case (actionsTypes.CONFIRM_FAIL):
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            break;
    }

    return state;
};
