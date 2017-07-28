import { takeEvery } from 'redux-saga'
import { put, call} from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST_ADD_PLAYLIST, RECEIVE_PLAYLIST, REQUEST_PLAYLIST_REMOVAL, COMPLETED_PLAYLIST_REMOVAL, FAILED_PLAYLIST, FAILED_PLAYLIST_REMOVAL } from '../actions/types'

//worker/
//watcher

export function* watchAddingOfNewPlaylist(){
    yield takeEvery(REQUEST_ADD_PLAYLIST, addNewPlaylistAsync)
}

export function* addNewPlaylistAsync(action){
    try 
    {
        const response = yield call(axios.post, 'http://music.tanomu.dk/api/playlists/', action.payload)
        yield put({type: RECEIVE_PLAYLIST, pending: false, data: response.data})
        yield call(() => action.callback())
        yield call(() => action.resetForm())
    } 
    catch (e) 
    {
        yield put({type: FAILED_PLAYLIST, pending: false, error: e})
    }
}


export function* watchRemovingOfThePlaylist(){
    yield takeEvery(REQUEST_PLAYLIST_REMOVAL, removePlaylistAsync)
}

export function* removePlaylistAsync(action){
    const config = {
        url: "http://music.tanomu.dk/api/playlists/",
        method: "delete",
        data: { ...action.payload}
    }

    try 
    {
        yield axios({...config})
        yield put({type: COMPLETED_PLAYLIST_REMOVAL, pending: false, index: action.index})
    } 
    catch (e) 
    {
        yield put({type: FAILED_PLAYLIST_REMOVAL, pending: false, error: e})
    }
}