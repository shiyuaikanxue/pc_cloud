import { createStore } from "vuex";
import {getMusicLyric} from '@/request/api/music'
export default createStore({
  state: {
    viewStack: 0, //路由栈
    view: "cloud", //默认路由
    active: "select", //云音乐精选默认子路由
    playlist: [
      {
        //播放列表
        al: {
          id: 162775111,
          name: "吻得太逼真",
          pic: 109951168507667260,
          picUrl:
            "https://p2.music.126.net/RK5XphghvWjbt742dAZkkw==/109951168507667265.jpg",
          pic_str: "109951168507667265",
        },
        name: "吻得太逼真",
        id: 2034881346,
        commentCount: 3213,
        ar: [
          {
            id: 29588305,
            name: "刘大拿",
          },
          {
            id: 13112601,
            name: "Wiz_H张子豪",
          },
        ],
      },
    ],
    lyricList: {}, //歌词
    playlistIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页展示
    currentTime: 0, //当前时间
    duration: 0, //歌曲的时间
    isFooterMusic: true, //判断是否显示底部组件
    volume: 0.2, //系统音量
    mute: false, //是否静音
    isDetail: false, //是否打开详情页
  },
  getters: {},
  mutations: {
    switchView(state, value) {
      state.view = value;
    },
    ViewStackIncrease(state, value) {
      state.viewStack++;
    },
    ViewStacDecrease(state, value) {
      state.viewStack--;
    },
    updateActive(state, value) {
      state.active = value;
    },
    updateIsbtnShow(state, value) {
      //暂停播放
      state.isbtnShow = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateVolume: function (state, value) {
      state.volume = value;
    },
    updateMute: function (state, value) {
      state.mute = value;
    },
    updateIsDetail: function (state, value) {
      state.isDetail = value;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    increasePlaylist:function(state,value){
      state.playlist.push(...value)
    },
    updatePlaylist:function(state,value){
      state.playlist = value
    },
    updatePlaylistIndex:function(state,value){
      state.playlistIndex = value
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      context.commit("updateLyricList", res.data.lrc);
      console.log(this.state.lyricList)
    },
  },
  modules: {},
});
