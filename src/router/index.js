import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import musicHouse from '@/components/musicHouse/musicHouse'
import Favorite from '@/components/Favorite/Favorite'
import playHistory from '@/components/playHistory/playHistory'
import playingList from '@/components/playingList/playingList'
import Recommend from '@/components/musicHouse/Recommend/Recommend'
import PlayList from '@/components/musicHouse/PlayList/PlayList'
import Singer from '@/components/musicHouse/Singer/Singer'
import ListDes from '@/components/ListDes/ListDes'
import userList from '@/components/UserList/userPlayList'
import SingerDes from "@/components/SingerDes/SingerDes"
import Search from "@/components/Search/searchRes"
Vue.use(Router)



export default new Router({
	routes: [{
			path: '/',
			redirect: "/home"
		},
		{
			path: "/home",
			component: Home,
			redirect: "/musicHouse",
			children: [{
					path: "/musicHouse",
					component: musicHouse,
					redirect: "/musicHouse/recommend",
					children: [{
							path: "/musicHouse/recommend",
							component: Recommend
						},
						{
							path: "/musicHouse/playlist",
							component: PlayList,
						},
						{
							path: "/musicHouse/singer",
							component: Singer
						}
					]
				},
				{
					path: "/favorite",
					component: Favorite
				},
				{
					path: "/playHistory",
					component: playHistory
				},
				{
					path: "/playingList",
					component: playingList
				},
				{
					path: "/userList",
					component: userList
				},
				{
					name: "userListDes",
					path: "/userList/listdes/:id",
					component: ListDes
				},
				{
					name: "ListDes",
					path: "/musicHouse/listdes/:id",
					component: ListDes
				},
				{
					name: "SingerDes",
					path: "/musicHouse/singerdes/:id",
					component: SingerDes
				},
				{
					path: "/searchres",
					component: Search
				}
			]
		},
	]
})
