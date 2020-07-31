import { GET_USER_ACTIVE_DATA, POST_USER_ACTIVE_DATA } from "../constant"

export const postUserActiveData = (data) => ({
    type: POST_USER_ACTIVE_DATA,
    data
})

export const getUserActiveData = (data) => ({
    type: GET_USER_ACTIVE_DATA,
    data
})
