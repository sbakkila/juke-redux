import React from 'react';
import store from '../store';
import {setLyrics} from '../action-creators/lyrics.js'
import axios from 'axios';
import Lyrics from '../components/lyrics.js';
import fetchLyrics from '../action-creators/lyrics.js'

export default class LyricsContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setArtist(artist){
    this.setState({ artistQuery: artist });
  }

  setSong(song){
    this.setState({ songQuery: song });
  }

  handleSubmit() {
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
   this.unsubscribe();
 }

  render(){
    return (
      <Lyrics
        text={this.state.lyrics.text}
        setArtist={this.setArtist}
        setSong={this.setSong}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />

    );
  }
}
