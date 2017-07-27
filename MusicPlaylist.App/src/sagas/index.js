import { watchCreateOrFetchTag } from './saga_tag'
import { watchAddingOfNewPlaylist } from './saga_playlist'
import { watchFetchingSongs, watchAddingNewSong, watchRemovingSong } from './saga_songs'
//3. root saga

//---- root ----
export default function* rootSaga() {
    yield [
        watchCreateOrFetchTag(),
        watchAddingOfNewPlaylist(),
        watchFetchingSongs(),
        watchAddingNewSong(),
        watchRemovingSong()
    ]
}