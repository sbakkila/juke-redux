import {SET_LYRICS} from '../constants.js'

export const setLyrics = function (text){
  return {
     type: SET_LYRICS,
     lyric: text
  };
};
