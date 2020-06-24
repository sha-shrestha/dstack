import actionsTypes from './actionsTypes';

const initial = {
    search: '',
    userData: null,
    userLoading: false,
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.SET_SEARCH_VALUE):
            return {
                ...state,
                search: action.payload,
            };

        case (actionsTypes.FETCH_USER):
            return {
                ...state,
                userLoading: true,
            };

        case (actionsTypes.FETCH_USER_SUCCESS):
            return {
                ...state,
                userData: action.payload,
                userLoading: false,
            };

        case (actionsTypes.USER_LOGIN_FAIL):
            return {
                ...state,
                userLoading: false,
            };


        case (actionsTypes.UPDATE_USER_TOKEN_SUCCESS):
            return {
                ...state,

                userData: {
                    ...state.userData,
                    token: action.payload,
                },
            };

        default:
            break;
    }

    return state;
};
