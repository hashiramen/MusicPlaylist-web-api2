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


export function addNewSongAsync(payload){
    return {
        type: REQUEST_ADD_SONG,
        pending: true,
        payload
    }
}


export function removeSongAsync(payload){
    return {
        type: REQUEST_REMOVE_SONG,
        pending: true,
        payload
    }
}