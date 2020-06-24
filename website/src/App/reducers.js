import actionsTypes from './actionsTypes';

const initial = {
    search: '',
    searchPlaceholder: null,
    progressIsActive: null,
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

        case (actionsTypes.SET_SEARCH_PLACEHOLDER):
            return {
                ...state,
                searchPlaceholder: action.payload,
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


        case (actionsTypes.START_PROGRESS):
            return {
                ...state,
                progressIsActive: true,
                progress: null,
            };

        case (actionsTypes.SET_PROGRESS):
            return {
                ...state,
                progress: action.payload,
            };

        case (actionsTypes.COMPLETE_PROGRESS):
            return {
                ...state,
                progressIsActive: false,
                progress: null,
            };

        case (actionsTypes.RESET_PROGRESS):
            return {
                ...state,
                progressIsActive: null,
                progress: null,
            };

        default:
            break;
    }

    return state;
};
