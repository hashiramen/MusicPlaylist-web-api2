import { REQUEST_ADD_PLAYLIST, REQUEST_PLAYLIST_REMOVAL } from './types'

export function addNewPlaylistAsync(values, callback, resetForm) {
    return{
        type: REQUEST_ADD_PLAYLIST,
        pending: true,
        payload: values,
        callback,
        resetForm
    }
}

export function removePlaylistAsync(payload, index, callback){
    return {
        type: REQUEST_PLAYLIST_REMOVAL,
        pending: true,
        payload,
        index,
        callback
    }
}