import * as types from '@/store/mutationTypes'
import {
    saveFavorite,
    saveUserInfo,
    deleteOne,
    saveHistory,
    clearHistory,
    clearUserInfo,
    savePlayList
    } from "@/plugins/utils"

export const setCurrentSong=function(ctx,data){
    ctx.commit(types.SET_CURRENTSONG,data)
}

export const setPlayingState=function(ctx,data){
    ctx.commit(types.SET_PLAYING_STATE,data)
}

export const setCurrentSongInfo=function(ctx,data){
    ctx.commit(types.SET_CURRENTSONG_INFO,data)
}

export const setPlayList=function(ctx,data){
    ctx.commit(types.SET_PLAYLIST,data)
}

export const setCurrentSongIndex=function(ctx,data){
    ctx.commit(types.SET_CURRENTSONG_INDEX,data)
}

export const setPlayMode=function(ctx,data){
    ctx.commit(types.SET_PLAY_MODE,data)
}

export const setFavoriteList=function(ctx,data){
    ctx.commit(types.SET_FAVORITE_LIST,saveFavorite(data))
}

export const deleteFavoriteSong=function(ctx,data){
    ctx.commit(types.SET_FAVORITE_LIST,deleteOne(data))
}

export const setType=function(ctx,data){
    ctx.commit(types.SET_TYPE,data)
}

export const setArea=function(ctx,data){
    ctx.commit(types.SET_AREA,data)
}

export const setPlayHistory=function(ctx,data){
    ctx.commit(types.SET_PLAY_HISTORY,saveHistory(data))
}

export const clearPlayHistory=function(ctx){
    ctx.commit(types.SET_PLAY_HISTORY,clearHistory())
}

export const setSearchRes=function(ctx,data){
    ctx.commit(types.SET_SEARCH_RES,data)
}

export const setSearchSong=function(ctx,data){
    ctx.commit(types.SET_SEARCH_SONG,data)
}

export const setUserInfo=function(ctx,data){
    ctx.commit(types.SET_USERINFO,saveUserInfo(data))
}

export const delUserInfo=function(ctx,data){
    ctx.commit(types.SET_USERINFO,clearUserInfo())
}

export const setUserPlayList=function(ctx,data){
    ctx.commit(types.SET_USER_PLAYLIST,savePlayList(data))
}