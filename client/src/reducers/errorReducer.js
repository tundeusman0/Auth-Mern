import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialStates = {
    msg: {},
    status: null,
    id: null
};

export default (state = initialStates, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
};
