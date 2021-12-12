import * as types from '@/store/mutationTypes'
const matutaions = {
  [types.SET_CURRENTSONG](state,data){
    state.currentSong=data
  },
  [types.SET_PLAYING_STATE](state,data){
    state.playing=data
  },
  [types.SET_CURRENTSONG_INFO](state,data){
    state.currentSongInfo=data
  },
  [types.SET_PLAYLIST](state,data){
    state.playlist=data
  },
  [types.SET_CURRENTSONG_INDEX](state,data){
    state.currentSongIndex=data
  },
  [types.SET_PLAY_MODE](state,data){
    state.mode=data
  },
  [types.SET_FAVORITE_LIST](state,data){
    state.favoriteSongs=data
  },
  [types.SET_AREA](state,data){
    state.Area=data
  },
  [types.SET_TYPE](state,data){
    state.Type=data
  },
  [types.SET_PLAY_HISTORY](state,data){
    state.playHistory=data
  },
  [types.SET_SEARCH_RES](state,data){
    state.searchRes=data
  },
  [types.SET_SEARCH_SONG](state,data){
    state.searchSong=data
  },
  [types.SET_USERINFO](state,data){
    state.userInfo=data
  },
  [types.SET_USER_PLAYLIST](state,data){
    state.userPlayList=data
  }
}

export default matutaions