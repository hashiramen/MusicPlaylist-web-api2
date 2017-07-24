import { REQUEST_TAG, RECEIVE_TAG, REQUEST_ADD_PLAYLIST, RECEIVE_PLAYLIST, REQUEST_SONGS, RECEIVE_SONGS, RECEIVE_SONG } from '../actions/types'

//initial state
const initial = {
    pending: false
}

export function fetchTag(state = initial, action) {
    switch(action.type) {
        case REQUEST_TAG:
            console.log('request tag:', action.pending)
            return {pending: action.pending}
        case RECEIVE_TAG:
            console.log('im under receive tag, action:', action)
            return {pending: action.pending, ...action.data}
        case REQUEST_ADD_PLAYLIST:
            console.log('Requesting new playlist....', action.pending)
            return {...state, pending: action.pending}
        case RECEIVE_PLAYLIST:
            console.log('Receiving created playlist.!!!--', action.pending)
            return {...state, pending: action.pending, Playlists: [...state.Playlists, action.data]}
        case REQUEST_SONGS:
            return { ...state, pending: action.pending}
        case RECEIVE_SONGS:
            console.log('old state', state)
            const newState = {...state, pending: action.pending}
            const playlists = newState.Playlists = state.Playlists.slice()
            let single = playlists[action.index] = {...playlists[action.index]}
            single.Songs = action.data.Songs
            console.log('new state', newState)
            return newState
        case RECEIVE_SONG:
            console.log('receiving new song data....', state)
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
            console.log(nowa)
            return nowa;
    }

    return state
}