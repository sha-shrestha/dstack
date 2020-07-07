import {clone} from 'lodash-es';
import actionsTypes from './actionsTypes';

const initial = {
    creating: false,
    updating: false,
    loading: false,
    errors: {},
    requestStatus: null,
};

export default (state = initial, action) => {
    switch (action.type) {
        case (actionsTypes.CREATE):
            return {
                ...state,
                creating: true,
            };

        case (actionsTypes.CREATE_SUCCESS):
            return {
                ...state,
                creating: false,
            };

        case (actionsTypes.CREATE_FAIL):
            return {
                ...state,
                creating: false,
            };

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

        case (actionsTypes.UPDATE):
            return {
                ...state,
                updating: true,
            };

        case (actionsTypes.UPDATE_SUCCESS):
            return {
                ...state,
                updating: false,

                data: {
                    ...state.data,
                    ...action.payload,
                },
            };

        case (actionsTypes.UPDATE_FAIL):
            return {
                ...state,
                updating: false,
            };

        case (actionsTypes.DELETE):
            return {
                ...state,
                deleting: true,
            };

        case (actionsTypes.DELETE_SUCCESS):
            return {
                ...state,
                deleting: false,
                data: null,
            };

        case (actionsTypes.DELETE_FAIL):
            return {
                ...state,
                deleting: false,
            };

        case (actionsTypes.CARDS_INSERT):
            return {...state};

        case (actionsTypes.CARDS_INSERT_SUCCESS):
            const {data} = state;

            return {
                ...state,
                data: {
                    ...data,

                    cards: [
                        ...data.cards,
                        ...action.payload,
                    ],
                },
            };

        case (actionsTypes.CARDS_INSERT_FAIL):
            return {...state};

        case (actionsTypes.CARDS_DELETE):
            return {...state};

        case (actionsTypes.CARDS_DELETE_SUCCESS):
            return {
                ...state,
                data: {
                    ...state.data,
                    cards: state.data.cards.filter(i => i.stack !== action.payload),
                },
            };

        case (actionsTypes.CARDS_DELETE_FAIL):
            return {...state};


        case (actionsTypes.CARDS_UPDATE):
            return {...state};

        case (actionsTypes.CARDS_UPDATE_SUCCESS):
            if (typeof action.payload.index === 'number') {
                const cards = clone(state.data.cards);
                const editCard = cards.find(c => c.stack === action.payload.stack);
                const oldIndex = editCard.index;
                const delta = action.payload.index - oldIndex;
                const direction = delta / Math.abs(delta);

                editCard.index = action.payload.index;

                let i = oldIndex + direction;

                while (i !== action.payload.index + direction) {
                    cards[i].index = cards[i].index - direction;
                    i += direction;
                }

                cards.sort((a, b) => a.index - b.index);

                return {
                    ...state,
                    data: {
                        ...state.data,
                        cards,
                    },
                };
            }

            return {...state};

        case (actionsTypes.CARDS_UPDATE_FAIL):
            return {
                ...state,
                data: {
                    ...state.data,
                    cards: action.payload.cards,
                },
            };

        case (actionsTypes.UPDATE_PERMISSIONS):
            return {
                ...state,

                data: {
                    ...state.data,
                    permissions: action.payload,
                },
            };

        default:
            break;
    }

    return state;
};
