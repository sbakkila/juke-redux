import React from 'react';
import store from '../store';
import {setLyrics} from '../action-creators/lyrics.js'
import axios from 'axios';
import Lyrics from '../components/lyrics.js';

export default class LyricsContainer extends React.Component {
  constructor(props){
    super(props);

    this.state =     this.state = Object.assign({
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

  handleSubmit(){
    event.preventDefault();

    if (this.state.artistQuery && this.state.songQuery) {

      const artist = this.state.artistQuery;
      const song = this.state.songQuery;

      axios.get(`/api/lyrics/${artist}/${song}`)
      .then(response => {
        console.log(response.data);
        const setLyricsAction = setLyrics(response.data.lyric);
        store.dispatch(setLyricsAction);
      });

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
        text={this.state.text}
        setArtist={this.setArtist}
        setSong={this.setSong}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />

    );
  }
}
