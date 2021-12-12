import state from "./state"

export const currentSong = state => state.currentSong

export const currentSongInfo = state => {
  return state.playlist[state.currentSongIndex]||{}
}

export const currentSongIndex = state=> state.currentSongIndex

export const playing = state => state.playing

export const playList = state => state.playlist

export const mode = state => state.mode

export const favoriteSongs = state => state.favoriteSongs

export const favoriteSongIndex = state =>{
  var arr=state.favoriteSongs
  var index=0;
  var num=-1;
  for(var i=0;i<arr.length;i++){
    num++
    if(arr[i].id==state.currentSong.id){
      index=num
    }
  }
  return index
}

export const Type = state => state.Type

export const Area = state => state.Area

export  const playHistory = state => state.playHistory

export  const searchRes = state => state.searchRes

export  const searchSong = state => state.searchSong

export  const userInfo = state => state.userInfo

export  const userPlayList = state => state.userPlayList