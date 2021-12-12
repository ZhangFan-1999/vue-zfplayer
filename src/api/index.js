import axios from "axios"
// 获取轮播图数据
export function getBanners() {
	return axios.get("/banner?type=0")
}
// 获取推荐歌曲
export function getRecommendSongs() {
	return axios.get("/personalized/newsong?limit=5")
}
// 获取音乐url
export function getSongUrl(id) {
	return axios.get(`/song/url?id=${id}`)
}
// 获取音乐详细信息
export function getSongInfo(item) {
	return axios.get(`/song/detail?ids=${item.id}`)
}
// 获取推荐歌单
export function getSongList() {
	return axios.get(`/personalized?limit=6`)
}
//获取歌单详情
export function getListInfo(id) {
	return axios.get(`/playlist/detail?id=${id}`)
}
// 获取歌单评论
export function getListComments(id) {
	return axios.get(`/comment/playlist?id=${id}`)
}
// 获取全部歌手
export function getSingers() {
	return axios.get(`/artist/list?type=-1&area=-1&limit=100`)
}
// 筛选歌手
export function getSingersByValue(type, area) {
	return axios.get(`/artist/list?type=${type}&area=${area}&limit=100`)
}
// 根据id获取歌手的布冯单曲和个人信息
export function getSingerInfo(id) {
	return axios.get(`/artists?id=${id}`)
}
// 获取歌手(歌手id)mv
export function getMv(num, id) {
	return axios.get(`/artist/mv?id=${id}&limit=${num}`)
}
// 获取mv地址
export function getVideo(id) {
	return axios.get(`/mv/url?id=${id}&r=1080`)
}
// 获取mv评论
export function getmvComments(id) {
	return axios.get(`/comment/mv?id=${id}`)
}
// 获取歌曲评论
export function getSongComments(id) {
	return axios.get(`/comment/music?id=${id}&limit=30`)
}
// 获取歌词
export function getLyric(id) {
	return axios.get(`/lyric?id=${id}`)
}
// 获取热搜
export function getSearchRes(value) {
	return axios.get(`/search?keywords= ${value}`)
}
// 获取歌去详细信息
export function getSongDes(id) {
	return axios.get(`/song/detail?ids=${id}`)
}
// 获取榜单信息
export function getTopList() {
	return axios.get('/toplist')
}
//获取用户信息
export function getUserInfo(uid) {
	return axios.get(`/user/detail?uid=${uid}`)
}
// 获取用户歌单
export function getUserPlayList(uid) {
	return axios.get(`/user/playlist?uid=${uid}`)
}
