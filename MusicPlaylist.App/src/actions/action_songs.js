import { REQUEST_SONGS, REQUEST_ADD_SONG, REQUEST_REMOVE_SONG } from './types'


export function requestSongsAsync(guid, index, callback){
    return {
        type: REQUEST_SONGS,
        pending: true,
        payload: guid,
        index,
        callback
    }
}


export function addNewSongAsync(payload, callback, resetForm){
    return {
        type: REQUEST_ADD_SONG,
        pending: true,
        payload,
        callback,
        resetForm
    }
}


export function removeSongAsync(payload, index){
    return {
        type: REQUEST_REMOVE_SONG,
        pending: true,
        payload,
        index
    }
}