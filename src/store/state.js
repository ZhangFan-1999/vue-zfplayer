import {loadFavorite,loadHistory,loadUserInfo,loadUserPlayList} from "@/plugins/utils"
const state = {
    playing:false,
    playlist:[],
    currentSong:{},
    currentSongIndex:0,
    mode:0,
    favoriteSongs:loadFavorite(),
    playHistory:loadHistory(),
    searchRes:[],
    searchSong:"0",
    userInfo:loadUserInfo(),
    userPlayList:loadUserPlayList()
  }

  export default state