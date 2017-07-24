import { takeEvery } from 'redux-saga'
import { put, call} from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST_ADD_PLAYLIST, RECEIVE_PLAYLIST } from '../actions/types'

//worker/
//watcher

export function* watchAddingOfNewPlaylist(){
    console.log('watching for new playlist')
    yield takeEvery(REQUEST_ADD_PLAYLIST, addNewPlaylistAsync)
}

export function* addNewPlaylistAsync(action){
    console.log('new play list async: ', action)
    try 
    {
        const response = yield call(axios.post, 'http://localhost:51210/api/playlists/', action.payload)
        console.log('new playlist response:', response)
        yield put({type: RECEIVE_PLAYLIST, pending: false, data: response.data})
        yield call(() => action.callback())
    } 
    catch (e) 
    {
        console.log('new playlist error: ', e)
    }
}