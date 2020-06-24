import actionsTypes from './actionsTypes';
import detailsActionsTypes from 'Dashboards/Details/actionsTypes';

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

        case (detailsActionsTypes.DELETE_SUCCESS):
            if (state.data)
                return {
                    ...state,
                    data: state.data.filter(i => i.id !== action.payload.id),
                };
            else return {...state};

        default:
            break;
    }

    return state;
};
