import React, { Component } from 'react';

class SongProgressBar extends Component {
    constructor(props){
        super(props)

    }

    calculateLoadedPercent(){
        console.log(this.props)
    }

    render() {
        const { Author, Title } = this.props.songInfo
        const { loadedSeconds, maxDuration, playedSeconds } = this.props.data
        console.log(loadedSeconds, '%')
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
                            </div>
                            <div className="song-player-progress-bar">
                                <div className="song-player-progress-loaded" style={{width: `${loadedSeconds}%`}}></div>
                                <div className="song-player-already-played" style={{width: `${playedSeconds}%`}}></div>
                            </div>
                            <div className="song-played-max">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongProgressBar;