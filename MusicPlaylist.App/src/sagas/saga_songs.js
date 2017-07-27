import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST_SONGS, RECEIVE_SONGS, REQUEST_ADD_SONG, RECEIVE_SONG, REQUEST_REMOVE_SONG, COMPLETED_SONG_REMOVAL } from '../actions/types'

//watcher
//worker


export function* watchFetchingSongs(){
    console.log('is listening for fetching songs')
    yield takeEvery(REQUEST_SONGS, fetchSongsAsync)
}

export function* fetchSongsAsync(action){
    console.log('im in songs saga: ', action)
    try 
    {
        const response = yield call(axios.get, `http://localhost:51210/api/playlists/${action.payload}`)
        console.log('songs ---', response)
        const { data } = response
        yield put({type:RECEIVE_SONGS, pending: false, data, index: action.index})
        yield call(() => action.callback())
    } 
    catch (e) 
    {
        
    }
}

export function* watchAddingNewSong(){
    console.log('is watching new adding of song')
    yield takeEvery(REQUEST_ADD_SONG, addNewSongAsync)
}

export function* addNewSongAsync(action){
    console.log('adding new song: --', action)
    try {
        const response = yield call(axios.post, "http://localhost:51210/api/songs/", action.payload)
        const { data} = response
        console.log('are u even here?')
        console.log(data, response)
        yield put({type: RECEIVE_SONG, pending: false, data : response})
        console.log('or maybe here...')
    } 
    catch (e) 
    {
        console.log(e)
    }
}

export function* watchRemovingSong(){
    console.log(' is watching songs removal')
    yield takeEvery(REQUEST_REMOVE_SONG, removeSongAsync)
}

export function* removeSongAsync(action){
    console.log(JSON.stringify(action.payload))
    const config = {
        url: 'http://localhost:51210/api/songs/',
        method: 'delete',
        data: {...action.payload}
    }
    console.log(config)
    try 
    {
        yield axios({...config})
        yield put({type: COMPLETED_SONG_REMOVAL, pending: true})
    } 
    catch (e) 
    {
        console.log('song removal error: ', e)   
    }
}