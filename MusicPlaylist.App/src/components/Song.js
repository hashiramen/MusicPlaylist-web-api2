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
                playedSeconds: 0
            }
        }
        this.playNextSongInPlaylist = this.playNextSongInPlaylist.bind(this)
        this.handleProgress = this.handleProgress.bind(this)
        this.handleDuration = this.handleDuration.bind(this)
    }

    playNextSongInPlaylist(){
        console.log(this.props)
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
        const { maxDuration, loadedSeconds, playedSeconds } = e
        const resultOfLoadedSecondsPercent = this.calculateLoadedPercent(loadedSeconds, this.state.progress.maxDuration)
        const resultOfPlayedSecondsPercent = this.calculatePlayedPercent(playedSeconds, this.state.progress.maxDuration)
        this.setState({
            progress:{
                ...this.state.progress,
                loadedSeconds: !isNaN(resultOfLoadedSecondsPercent) ? resultOfLoadedSecondsPercent : this.state.progress.loadedSeconds,
                playedSeconds: !isNaN(resultOfPlayedSecondsPercent) ? resultOfPlayedSecondsPercent : this.state.progress.playedSeconds
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

    renderFrameForYoutube(details){
        const { Url, Provider, Id } = details
        return (
            <div data-song-guid={Id}>
                <ReactPlayer url={Url} 
                    playing
                    onEnded={this.playNextSongInPlaylist}
                    onError={this.playNextSongInPlaylist}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                    width="100%"
                    min-height="50px"
                    max-height="150px"/>
                {this.renderDetailFields(details)}
                <SongProgressBar data={this.state.progress} songInfo={details}/>             
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
                    onDuration={this.handleDuration}
                    url={"https://soundcloud.com/fadermedia/the-weekend-wicked-games"}
                    width="100%"
                    min-height="50px"
                    max-height="150px" />
                {this.renderDetailFields(details)}
                <SongProgressBar data={this.state.progress} songInfo={details}/>               
            </div>
        )
    }

    emptyField() {
        return (
            <div>No song was chosen * _*</div>
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