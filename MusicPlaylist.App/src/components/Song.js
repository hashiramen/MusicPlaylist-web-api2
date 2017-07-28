import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import SongProgressBar from './SongProgressBar'

class Song extends Component {
    constructor(props){
        super(props)
        this.state ={
            progress: {
                maxDuration: 0,
                loadedSeconds: 0,
                playedSeconds: 0,
                volume : 0.3
            }
        }
        this.playNextSongInPlaylist = this.playNextSongInPlaylist.bind(this)
        this.handleProgress = this.handleProgress.bind(this)
        this.handleDuration = this.handleDuration.bind(this)
        this.handleCurrentDuration = this.handleCurrentDuration.bind(this)
        this.handleVolume = this.handleVolume.bind(this)
    }

    playNextSongInPlaylist(){
        this.props.playNext()
    }

    renderDetailFields(details){
        const { Author, Title } = details
        return(
            <div>
                <div className="song-tit"><p>{Author}</p><p> - </p><p>{Title}</p></div>
            </div>
        )
    }

    handleProgress(e){
        const { maxDuration, loadedSeconds, playedSeconds, played, loaded } = e
        const resultOfLoadedSecondsPercent = this.calculateLoadedPercent(loadedSeconds, this.state.progress.maxDuration)
        const resultOfPlayedSecondsPercent = this.calculatePlayedPercent(playedSeconds, this.state.progress.maxDuration)
        this.setState({
            progress:{
                ...this.state.progress,
                loadedSeconds: loadedSeconds,
                playedSeconds: playedSeconds,
                played,
                loaded
            }
        })
    }


    calculateLoadedPercent(loadedSeconds, maxDuration){
        return Math.round(Math.round(loadedSeconds * 100) / maxDuration)
    }

    calculatePlayedPercent(playedSeconds, maxDuration){
        return (playedSeconds * 100) / maxDuration
    }

    handleDuration(e){
        this.setState({
            progress:{
                ...this.state.progress,
                maxDuration: e
            }
        })
    }

    handleCurrentDuration(e){
        //to be added
    }

    handleVolume(e){
        this.setState({
            progress:{
                ...this.state.progress,
                volume: parseFloat(e.currentTarget.value)
            }
        })
    }

    renderFrameForYoutube(details){
        const { Url, Provider, Id } = details
        return (
            <div data-song-guid={Id}>
                <ReactPlayer url={Url} 
                    playing
                    onEnded={this.playNextSongInPlaylist}
                    onError={this.playNextSongInPlaylist}
                    onProgress={this.handleProgress}
                    progressFrequency={200}
                    onDuration={this.handleDuration}
                    volume={this.state.progress.volume}
                    width="100%"/>
                <SongProgressBar data={this.state.progress} songInfo={details} setVolume={(e) => this.handleVolume(e)}/>             
            </div>
        )
    }

    renderFrameForSoundCloud(details){
        const { Url, Provider, Id } = details

        return (
            <div data-song-guid={Id}>
                <ReactPlayer 
                    playing 
                    onEnded={this.playNextSongInPlaylist}
                    onError={this.playNextSongInPlaylist}
                    onProgress={this.handleProgress}
                    progressFrequency={200}
                    onDuration={this.handleDuration}
                    volume={this.state.progress.volume}
                    url={Url}
                    width="100%"/>
                <SongProgressBar data={this.state.progress} songInfo={details} setVolume={(e) => this.handleVolume(e)}/>               
            </div>
        )
    }

    emptyField() {
        return (
            <div ><h4 style={{color:'red', textAlign: 'center', paddingTop: '1em', width: '100%', display: 'block'}}>No song was chosen * _*</h4></div>
        )
    }

    handleRenderDependingOnTheProvider(){
        const soundcloud  = 'soundcloud'
        const youtube = 'youtube'

        if(this.props.details){
            const { details } = this.props
            switch(details.Provider){
                case youtube:
                    return this.renderFrameForYoutube(details)
                case soundcloud:
                    return this.renderFrameForSoundCloud(details)
            }
        }

        return this.emptyField()
    }

    render() {

        return (
            <div>
                {this.handleRenderDependingOnTheProvider()}
            </div>
        );
    }
}

export default Song;