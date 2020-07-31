import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer from "../reducers/reduce-reducer"


import saga from '../saga/reduce-saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
export default store

// then run the saga
sagaMiddleware.run(saga)

