import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'

//imported types
import { REQUEST_TAG, RECEIVE_TAG, FAILED_TAG } from '../actions/types'

//2. worker
//1. watcher

///watchers

export function* watchCreateOrFetchTag() {
    console.log('redux-saga is now watching for create or fetch of a tag')
    yield takeEvery(REQUEST_TAG, requestTagAsync)
}


//workers


export function* requestTagAsync(action) {
    console.log('action check: ', action)
    try {
        const response = yield call(axios.get, `http://localhost:51210/api/authenticators/${action.payload.tag}`)
        console.log('Api response: ', response)
        yield put({type: RECEIVE_TAG, pending : false, data: response.data})
        yield call(() => action.callback())
    } catch (e) { 
        console.log('e console log: ', e)
        try {
            const response = yield call(axios.post, `http://localhost:51210/api/authenticators/`, action.payload)
            yield put({type: RECEIVE_TAG, pending : false, data: response.data})
            yield call(() => action.callback())
        } catch (error) {
            console.log('error message from nested: ', {type: FAILED_TAG, pending: false, error: error.message })
        }
    }
}