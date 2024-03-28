<template>
  <div class="musicList">
    <Header :info="info"></Header>
    <Section
      :trackCount="info.trackCount"
      :commentCount="info.commentCount"
      :subscribedCount="info.subscribedCount"
      :songList="songList"
    ></Section>
  </div>
</template>
<script>
import {
  getMusicDetail,
  getMusicListAllSongs,
} from "@/request/api/musicList.js";
import Header from "@/components/musicList/Header.vue";
import Section from "@/components/musicList/Section.vue";
export default {
  data() {
    return {
      id: "",
      info: {
        coverImgUrl: "",
        createTime: 0,
        name: "",
        description: "",
        commentCount: 0,
        tags: [],
        playCount: 0,
        subscribedCount: 0,
        trackCount: 0,
        creator: {
          userId: "",
          avatarUrl: "",
          nickname: "",
        },
      },
      songList: [],
    };
  },
  components: {
    Header,
    Section,
  },
  computed: {},
  methods: {
    init() {
      this.getId();
      this.getMusicInfo();
    },
    getId() {
      this.id = this.$route.query.id;
    },
    getMusicInfo: async function () {
      const res1 = await getMusicDetail(this.id);
      this.info.coverImgUrl = res1.data.playlist.coverImgUrl; //歌单背景图片
      this.info.createTime = res1.data.playlist.createTime; //歌单创建时间
      this.info.description = res1.data.playlist.description; //歌单描述
      this.info.name = res1.data.playlist.name; //歌单名
      this.info.playCount = res1.data.playlist.playCount; //歌单名
      this.info.subscribedCount = res1.data.playlist.subscribedCount; //歌单收藏量
      this.info.commentCount = res1.data.playlist.commentCount; //歌单评论
      this.info.trackCount = res1.data.playlist.trackCount; //歌单歌曲数量
      this.info.tags = res1.data.playlist.tags; //歌单标签
      this.info.creator.avatarUrl = res1.data.playlist.creator.avatarUrl; //歌单作者头像
      this.info.creator.userId = res1.data.playlist.creator.userId; //歌单作者id
      this.info.creator.nickname = res1.data.playlist.creator.nickname; //歌单作者用户名
      const res2 = await getMusicListAllSongs(this.id, this.info.trackCount);
      this.songList = res2.data.songs.map((item) => {
        return {
          name: item.name, //歌曲名
          alia: item.alia, //描述
          dt: item.dt, //歌曲时长
          al: {
            id: item.al.id, //专辑id
            name: item.al.name, //专辑名
            picUrl: item.al.picUrl, //歌曲封面
          },
          ar: item.ar, //作者信息
        };
      });
      console.log(this.songList)
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped></style>
