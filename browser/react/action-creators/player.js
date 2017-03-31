import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST, SET_PROGRESS} from '../constants.js'

// just a regular action
 toggle = function (text) {
  return {
    type: SET_LYRICS,
    lyric: text
  };
};

// needs an AJAX request
export const fetchLyrics = function (artist, song) {
  return function (dispatch, getState) {
    axios.get(`/api/lyrics/${artist}/${song}`)
      .then(res => {
        dispatch(setLyrics(res.data.lyric));
      });
  };
};
