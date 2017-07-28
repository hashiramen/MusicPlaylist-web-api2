import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST_SONGS, RECEIVE_SONGS, REQUEST_ADD_SONG, RECEIVE_SONG, REQUEST_REMOVE_SONG, COMPLETED_SONG_REMOVAL, FAILED_SONG, FAILED_SONGS, FAILED_SONG_REMOVAL } from '../actions/types'

//watcher
//worker


export function* watchFetchingSongs(){
    yield takeEvery(REQUEST_SONGS, fetchSongsAsync)
}

export function* fetchSongsAsync(action){
    try 
    {
        const response = yield call(axios.get, `http://music.tanomu.dk/api/playlists/${action.payload}`)
        const { data } = response
        yield put({type:RECEIVE_SONGS, pending: false, data, index: action.index})
        yield call(() => action.callback())
    } 
    catch (e) 
    {
        yield put({type: FAILED_SONGS, pending: false, error: e})
    }
}



export function* watchAddingNewSong(){
    yield takeEvery(REQUEST_ADD_SONG, addNewSongAsync)
}

export function* addNewSongAsync(action){
    try {
        const response = yield call(axios.post, "http://music.tanomu.dk/api/songs/", action.payload)
        const { data} = response
        yield put({type: RECEIVE_SONG, pending: false, data : response})
        yield call(() => action.callback())
        yield call(() => action.resetForm())
    } 
    catch (e) 
    {   
        yield put({type: FAILED_SONG, pending: false, error: e})
    }
}



export function* watchRemovingSong(){
    yield takeEvery(REQUEST_REMOVE_SONG, removeSongAsync)
}

export function* removeSongAsync(action){
    const config = {
        url: 'http://music.tanomu.dk/api/songs/',
        method: 'delete',
        data: {...action.payload}
    }

    try 
    {
        yield axios({...config})
        yield put({type: COMPLETED_SONG_REMOVAL, pending: false, index: action.index, playlistId: action.payload.playlistId})
    } 
    catch (e) 
    {
        yield put({type: FAILED_SONG_REMOVAL, pending: false, error: e})
    }
}