import { REQUEST_TAG, 
    RECEIVE_TAG, 
    REQUEST_ADD_PLAYLIST, 
    RECEIVE_PLAYLIST, 
    REQUEST_SONGS, 
    RECEIVE_SONGS, 
    RECEIVE_SONG, 
    REQUEST_REMOVE_SONG,
    COMPLETED_SONG_REMOVAL,
    REQUEST_PLAYLIST_REMOVAL,
    COMPLETED_PLAYLIST_REMOVAL,
    FAILED_TAG,
    FAILED_SONG,
    FAILED_SONGS,
    FAILED_SONG_REMOVAL,
    FAILED_PLAYLIST,
    FAILED_PLAYLIST_REMOVAL } from '../actions/types'

//initial state
const initial = {
    pending: false
}

export function fetchTag(state = initial, action) {
    switch(action.type) {
        case REQUEST_TAG:
            return {pending: action.pending}
        case RECEIVE_TAG:
            return {pending: action.pending, ...action.data}
        case FAILED_TAG:
            return {...state, pending: action.pending}
        case REQUEST_ADD_PLAYLIST:
            return {...state, pending: action.pending}
        case REQUEST_PLAYLIST_REMOVAL:
            return {...state, pending: action.pending}
        case RECEIVE_PLAYLIST:
            return {...state, pending: action.pending, Playlists: [...state.Playlists, action.data]}
        case COMPLETED_PLAYLIST_REMOVAL:
            const newPlaylistState = { ...state, pending: action.pending, Playlists: [
                ...state.Playlists.slice(0, action.index),
                ...state.Playlists.slice(action.index + 1)
            ]}
            return newPlaylistState
        case FAILED_PLAYLIST:
            return {...state, pending: action.pending}
        case FAILED_PLAYLIST_REMOVAL:
            return {...state, pending: action.pending}
        case REQUEST_SONGS:
            return { ...state, pending: action.pending}
        case RECEIVE_SONGS:
            const newState = {...state, pending: action.pending}
            const playlists = newState.Playlists = state.Playlists.slice()
            let single = playlists[action.index] = {...playlists[action.index]}
            single.Songs = action.data.Songs
            return newState
        case FAILED_SONGS:
            return {...state, pending: action.pending}
        case RECEIVE_SONG:
            const nowa = { ...state, pending: action.data.pending, Playlists: state.Playlists.map(p => {
                let newPlaylist;
                if(p.Id === action.data.data.PlaylistId)
                {
                    newPlaylist = {
                            ...p,
                            Songs:[
                                ...p.Songs,
                                action.data.data
                            ]
                    }
                }

                return p.Id === action.data.data.PlaylistId ? newPlaylist : p
            })}

            return nowa;
        case FAILED_SONG:
            return {...state, pending: action.pending}
        case REQUEST_REMOVE_SONG:
            return {...state, pending: action.pending}
        case COMPLETED_SONG_REMOVAL:
            const removeSongFromNewState = { ...state, pending: action.pending, Playlists: state.Playlists.map(p => {
                let newPlaylist;
                if(p.Id === action.playlistId)
                {
                    newPlaylist = {
                        ...p,
                        Songs: [...p.Songs.slice(0, action.index),
                        ...p.Songs.slice(action.index + 1)]
                    }
                }

                return p.Id === action.playlistId ? newPlaylist : p
            })}

            return removeSongFromNewState
        case FAILED_SONG_REMOVAL:
            return {...state, pending: action.pending}
    }

    return state
}