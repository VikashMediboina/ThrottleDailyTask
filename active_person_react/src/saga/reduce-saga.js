import { put, takeEvery } from "redux-saga/effects"
import { getUserActiveData } from "../action/index.js"
import { POST_USER_ACTIVE_DATA } from "../constant"

function* postUserActionData(action) {
    console.log("dd")
    try {
        const response = yield fetch("/personsData").then(res => res.json())
        yield put(getUserActiveData({ data: response }))
    }
    catch{
        yield put(getUserActiveData({ data: "error occured" }))
    }
}

export default function* sagas() {
    yield takeEvery(POST_USER_ACTIVE_DATA, postUserActionData)
}