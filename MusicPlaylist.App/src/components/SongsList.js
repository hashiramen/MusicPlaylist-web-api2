import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

//actions
import {addNewSongAsync} from '../actions/action_songs'

class SongsList extends Component {
    constructor(props){
        super(props)

        this.handleSongClick = this.handleSongClick.bind(this)
        this.handleAddingSong = this.handleAddingSong.bind(this)
    }

    componentDidMount() {
        
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
            <div><input type="text" {...field.input} placeholder={`Enter ${field.input.name}`}/></div>
        )
    }

    fieldForUrl(field){
        return(
            <div><input type="text" {...field.input} placeholder={`Song's <url></url>`}/></div>
        )
    }

    renderFieldsForAddingNewSong(){
        const { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleAddingSong)}>
                    <Field name="author" component={this.fieldForAuthorAndTitle}/>
                    <Field name="title" component={this.fieldForAuthorAndTitle}/>
                    <Field name="url" component={this.fieldForUrl} />
                    <button type="submit">Add</button>
                </form>
            </div>
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
                    {this.renderFieldsForAddingNewSong()}
                </div>
            )
        }

        return (
            <div className="songs-wrap">
                <h1 className="playlist-title">{current.Name}:</h1>
                <ul>
                    {this.renderSongsFields()}
                </ul>
                {this.renderFieldsForAddingNewSong()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'AddNewSong'
})(connect(null, {addNewSongAsync})(SongsList));