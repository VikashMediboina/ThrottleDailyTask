import { GET_USER_ACTIVE_DATA } from "../constant"

const intialState = {
    data: {}
}

const reducerS = (state, action) => {
    state = intialState
    switch (action.type) {
        case GET_USER_ACTIVE_DATA:
            return ({
                ...state,
                data: action.data
            })
        default:
            return state;
    }
}

export default reducerS
