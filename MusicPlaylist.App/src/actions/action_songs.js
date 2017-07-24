import { REQUEST_SONGS, REQUEST_ADD_SONG } from './types'


export function requestSongsAsync(guid, index, callback){
    return {
        type: REQUEST_SONGS,
        pending: true,
        payload: guid,
        index,
        callback
    }
}


export function addNewSongAsync(payload){
    return {
        type: REQUEST_ADD_SONG,
        pending: true,
        payload
    }
}