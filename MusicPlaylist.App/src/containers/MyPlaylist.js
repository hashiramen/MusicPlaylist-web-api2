import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'

import SongsList from '../components/SongsList'
import Song from '../components/Song'

//hoc
import require_playlist from '../hoc/require_playlist'

import { addNewPlaylistAsync, removePlaylistAsync} from '../actions/action_playlist'
import { requestSongsAsync } from '../actions/action_songs'

class MyPlaylist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addNewPlaylist: false,
            current: null,
            song: null,
            cinemaMode: false
        }

        this.handleNewPlaylistState = this.handleNewPlaylistState.bind(this)
        this.submitNewPlaylist = this.submitNewPlaylist.bind(this)
        this.requestSongsForPlaylist = this.requestSongsForPlaylist.bind(this)
        this.handleStateForChosenSong = this.handleStateForChosenSong.bind(this)
        this.playNextSong = this.playNextSong.bind(this)
        this.handlePlaylistRemove = this.handlePlaylistRemove.bind(this)
    }

    playNextSong(){
        const { song, current } = this.state
        const currentPlaylist = this.props.authenticator.Playlists.filter(p => {
            return p.Id === song.PlaylistId
        })

        if(currentPlaylist[0].Songs.length > song.index){
            const index = song.index + 1
            this.setState({
                song: { ...currentPlaylist[0].Songs[index], index: index}
            })
        }
    }

    handleNewPlaylistState(){
        this.setState({
            addNewPlaylist : !this.state.addNewPlaylist
        })
    }

    handlePlaylistRemove(id, index){
        const payload = {
            id,
            authenticatorId: this.props.authenticator.Id
        }

        this.props.removePlaylistAsync(payload, index, () => console.log('call back for playlist removal'))
    }

    handleStateForChosenSong(song, index){
        this.setState({
            song: {...song, index: index}
        })
    }

    submitNewPlaylist(values) {
        const payload = {
            Id : this.props.authenticator.Id,
            ...values
        }
        this.props.addNewPlaylistAsync(payload, 
            () => this.setState({addNewPlaylist: false}),
            () => this.props.dispatch(reset('AddNewPlaylist'))
        )
    }

    requestSongsForPlaylist(guid, index) {
        if(guid !== this.state.current){
            this.props.requestSongsAsync(guid, index, () => this.setState({current: guid}))
        }
    }

    


    nameFieldForNewPlaylist(field){
        return (
            <div><input type="text" autoFocus {...field.input}/></div>
        )
    }
    renderNewPlaylistField(){
        const { handleSubmit } = this.props
        if(!this.state.addNewPlaylist){
            return(
                <div className="mypl-add-playlist" onClick={this.handleNewPlaylistState}>
                        <div className="mypl-add-icon"><span className="fa fa-file-o"></span></div>
                        <div className="mypl-add-text"><p>new playlist</p></div>
                </div>
            )
        }
        
        return (
            <form className="mypl-add-playlist mypl-with-input" onSubmit={handleSubmit(this.submitNewPlaylist)}>
                <Field name="Name" component={this.nameFieldForNewPlaylist} onBlur={this.handleNewPlaylistState}/>
                <button hidden type="submit"></button>
            </form>
        )
    }

    renderPlaylists(){
        const {Playlists} = this.props.authenticator
        return Playlists.map((pl,i) => {
            return (
                <li key={i} 
                    data-guid={pl.Id}
                    data-index={i} 
                    className={this.state.current === pl.Id ? "mypl-active": ""}>
                    <div onClick={() => this.requestSongsForPlaylist(pl.Id, i)} className="mypl-relative-container">
                        <p className="mypl-song-count">{pl.Songs != null ? pl.Songs.length > 0 ? `${pl.Songs.length } songs` : 'empty' : ''}</p>
                        <p>{pl.Name}</p>
                    </div>
                    <button className="playlist-remove-btn" onClick={() => this.handlePlaylistRemove(pl.Id, i)}><span className="fa fa-trash-o"></span></button>
                </li>
            )
        })
    }

    render() {
        if(typeof this.props.authenticator.Id == 'undefined'){
            return <div>something goes wrong</div>
        }
        const {Playlists, pending} = this.props.authenticator
        const { cinemaMode } = this.state
        const current = Playlists.filter((p, i) => p.Id === this.state.current)
        let songs;
        if(typeof current[0] !== 'undefined' && current.length === 1){
            songs = current[0]
        }

        const spinner = () => {
            return(
                <i className="fa fa-cog fa-spin"></i>
            )
        }

        const checkIfAnySongIsActive = () => {
            return !this.state.song ? 'no-song' : ''
        }


        return (
            <div className="mypl-wrap">
                <div className="mypl-container">
                    <div className={`mypl-left ${cinemaMode ? 'cinema-mode-hide' : ''} ${checkIfAnySongIsActive()}`}>
                        <Link to="/" className="mypl-close-btn dsbl-sel"><span className="fa fa-power-off"></span></Link>
                        <button className="cinema-mode-button" 
                                onClick={!cinemaMode ? () => this.setState({cinemaMode: true}) : () => this.setState({cinemaMode: false})}>
                                    Cinema mode
                            <span className={`${!cinemaMode ? "fa fa-arrows-alt" : "fa fa-times"}`}></span>
                        </button>
                        {this.renderNewPlaylistField()}
                        <span className="mypl-spinner">{pending ? spinner() : ''}</span>
                        <div className="mypl-list">
                            <ul>
                                {this.renderPlaylists()}
                            </ul>
                        </div>
                    </div>
                    <div className={`mypl-middle ${cinemaMode ? 'cinema-mode-hide' : ''} ${checkIfAnySongIsActive()}`}>
                        <SongsList current={songs} setSong={this.handleStateForChosenSong} activeSong={this.state.song}/>
                    </div>
                    <div className={`mypl-right ${cinemaMode ? 'cinema-mode-open' : ''} ${!this.state.song ? 'no-song-hide' : ''}`}>
                        <Song details={this.state.song} playNext={this.playNextSong}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticator: state.authenticator
    }
}

export default require_playlist(reduxForm({
    form: 'AddNewPlaylist'
})(connect(mapStateToProps, {addNewPlaylistAsync, requestSongsAsync, removePlaylistAsync })(MyPlaylist)));