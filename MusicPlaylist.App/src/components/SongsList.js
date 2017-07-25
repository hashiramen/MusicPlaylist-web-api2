import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

//actions
import {addNewSongAsync} from '../actions/action_songs'

class SongsList extends Component {
    constructor(props){
        super(props)

        this.state = {
            enabledNewSongForm: false
        }

        this.handleSongClick = this.handleSongClick.bind(this)
        this.handleAddingSong = this.handleAddingSong.bind(this)
    }


    handleSongClick(song, index){
        this.props.setSong(song, index)
    }

    handleAddingSong(values){
        console.log(this.props.current)
        const payload = {
            ...values,
            playlistId: this.props.current.Id
        }
        this.props.addNewSongAsync(payload)
    }

    fieldForAuthorAndTitle(field){
        console.log(field)
        return(
            <input type="text" {...field.input} placeholder={`Enter ${field.input.name}`} className="half-input"/>
        )
    }

    fieldForUrl(field){
        return(
            <div><input type="text" {...field.input} placeholder={`Song's <url></url>`} className="full-input"/></div>
        )
    }

    renderButtonForNewSong(){
        const { enabledNewSongForm} = this.state
        return(
            <div className={`new-song-button ${enabledNewSongForm ? 'hide-ns-button' : 'lulz'}`} onClick={() => this.setState({enabledNewSongForm: true})}>
                <div><span className="fa fa-music"></span></div>
                <div><span className="plus">+</span></div>
            </div>
        )        
    }

    renderFieldsForAddingNewSong(){
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.handleAddingSong)} className={`new-song-form`}>
                <Field name="author" component={this.fieldForAuthorAndTitle} />
                <Field name="title" component={this.fieldForAuthorAndTitle}/>
                <Field name="url" component={this.fieldForUrl} />
                <button type="submit" className="full-button dsbl-sel">submit</button>
                <span  className="full-button dsbl-sel" onClick={()=> this.setState({enabledNewSongForm: false})}>close</span>
            </form>       
        )
    }

    renderSongsFields(){
        const { Songs } = this.props.current
        let idOfActiveSong;
        if(this.props.activeSong){
            idOfActiveSong = this.props.activeSong.Id;
        }
        return Songs.map((s, index) => {
            return(
                <li key={s.Id} className={`songs-container ${s.Id === idOfActiveSong ? 'active-song': ''}`} onClick={() => this.handleSongClick(s, index)}>
                    <div className="songs-inner">
                        <div className="song-img-wrap">
                            <div className="song-img">
                                <img src={`/assets/${s.Provider}.png`} alt="" draggable="false"/>
                            </div>
                        </div>
                        <div className="song-details">
                            <div className="song-title"><p>{s.Title}</p></div>
                            <div className="song-author"><p>{s.Author}</p></div>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        const { current } = this.props
        const { enabledNewSongForm} = this.state
        if(typeof current == 'undefined'){
            return (
                <div>
                    <h4>You haven't chose any playlist yet</h4>
                </div>
            )
        }

        if(current.Songs.length <= 0){
            return (
                <div>
                    <h1 className="playlist-title">{current.Name}:</h1>
                    <h4>Your playlist is empty</h4>
                    <div className="new-song-button-container">
                        {this.renderButtonForNewSong()}
                    </div>
                    <div className={`new-song-container ${enabledNewSongForm ? 'show-ns-form' : ''}`}>
                        {this.renderFieldsForAddingNewSong()}
                    </div>
                </div>
            )
        }

        return (
            <div className="songs-wrap">
                <h1 className="playlist-title">{current.Name}:</h1>
                <ul>
                    {this.renderSongsFields()}
                </ul>
                <div className="new-song-button-container">
                    {this.renderButtonForNewSong()}
                </div>             
                <div className={`new-song-container ${enabledNewSongForm ? 'show-ns-form' : ''}`}>
                    {this.renderFieldsForAddingNewSong()}
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'AddNewSong'
})(connect(null, {addNewSongAsync})(SongsList));