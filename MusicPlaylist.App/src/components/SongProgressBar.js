import React, { Component } from 'react';

class SongProgressBar extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { Author, Title } = this.props.songInfo
        const { loadedSeconds, maxDuration, playedSeconds, loaded, played, volume } = this.props.data
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
                    <div className="song-player-control">
                        <div className="volume-control">
                            <span className={`vol-icon fa ${volume > 0.5 ? 'fa-volume-up' : volume <= 0 ? 'fa-volume-off' : 'fa-volume-down'}`}></span>
                            <input type="range" min="0" max="1" step="0.01" className="slider" defaultValue={volume} onChange={(e) => this.props.setVolume(e)}/>                
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongProgressBar;