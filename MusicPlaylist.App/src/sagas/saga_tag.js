import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'

//imported types
import { REQUEST_TAG, RECEIVE_TAG, FAILED_TAG } from '../actions/types'

//2. worker
//1. watcher

///watchers

export function* watchCreateOrFetchTag() {
    yield takeEvery(REQUEST_TAG, requestTagAsync)
}


//workers


export function* requestTagAsync(action) {
    try {
        const response = yield call(axios.get, `http://music.tanomu.dk/api/authenticators/${action.payload.tag}`)
        yield put({type: RECEIVE_TAG, pending : false, data: response.data})
        yield call(() => action.callback())
    } catch (e) { 
        try {
            const response = yield call(axios.post, `http://music.tanomu.dk/api/authenticators/`, action.payload)
            yield put({type: RECEIVE_TAG, pending : false, data: response.data})
            yield call(() => action.callback())
        } catch (error) {
            yield put({type: FAILED_TAG, pending: false, error: e})
        }
    }
}