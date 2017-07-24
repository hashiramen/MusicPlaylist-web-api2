import { REQUEST_ADD_PLAYLIST } from './types'

export function addNewPlaylistAsync(values, callback) {
    return{
        type: REQUEST_ADD_PLAYLIST,
        pending: true,
        payload: values,
        callback
    }
}