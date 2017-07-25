import React, { Component } from 'react';

class SongProgressBar extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { Author, Title } = this.props.songInfo
        const { loadedSeconds, maxDuration, playedSeconds, loaded, played } = this.props.data
        const properMaxDurationFormat = (duration)=>{
            let format = ""
            let res = (duration/60)
            format += `${Math.floor(res).toFixed(0)}:`
            res = (res - Math.floor(res)).toFixed(2)
            res = (res * 60).toFixed(0)

            if(res < 10){
                res = `0${res}`
            }
            format += res
            return format
        }
        return (
            <div className="song-player-container">
                <div className="song-player-inner">
                    <div className="song-player-control">
                        
                    </div>
                    <div className="song-player-bar">
                        <div className="song-player-info">
                            <p>{Author} - {Title}</p>
                        </div>
                        <div className="song-player-progress">
                            <div className="song-player-played">
                                <p>{properMaxDurationFormat(playedSeconds)}</p>
                            </div>
                            <div className="song-player-progress-bar" onClick={this.handleBarClick}>
                                <div className="song-player-progress-loaded" style={{width: `${loaded*100}%`}}></div>
                                <div className="song-player-already-played" style={{width: `${played*100}%`}} ></div>
                            </div>
                            <div className="song-player-max">
                                <p>{properMaxDurationFormat(maxDuration)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongProgressBar;