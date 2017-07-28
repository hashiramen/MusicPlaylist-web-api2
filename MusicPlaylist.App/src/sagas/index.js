import { watchCreateOrFetchTag } from './saga_tag'
import { watchAddingOfNewPlaylist, watchRemovingOfThePlaylist } from './saga_playlist'
import { watchFetchingSongs, watchAddingNewSong, watchRemovingSong } from './saga_songs'
//3. root saga

//---- root ----
export default function* rootSaga() {
    yield [
        watchCreateOrFetchTag(),
        watchAddingOfNewPlaylist(),
        watchRemovingOfThePlaylist(),
        watchFetchingSongs(),
        watchAddingNewSong(),
        watchRemovingSong()
    ]
}