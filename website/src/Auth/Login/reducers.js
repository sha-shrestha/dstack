import actionsTypes from './actionsTypes';

const initial = {
    loading: false,
    errors: {},
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.USER_LOGIN):
            return {
                ...state,
                loading: true,
                errors: {},
            };

        case (actionsTypes.USER_LOGIN_SUCCESS):
            return {
                ...state,
                loading: false,
            };

        case (actionsTypes.USER_LOGIN_FAIL):
            return {
                ...state,
                loading: false,
                errors: action.payload.errors,
            };

        default:
            break;
    }

    return state;
};
