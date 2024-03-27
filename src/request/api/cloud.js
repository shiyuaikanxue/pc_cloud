import service from "..";
// 获取轮播图
export function getBanner() {
  return service({
    method: "post",
    url: `/banner?type=0`,
  });
}
// 获取歌单分类
export function getMusicListCategory() {
  return service({
    method: "post",
    url: `/playlist/catlist`,
  });
}

// 获取热门歌单分类
export function getMusicListHot() {
  return service({
    method: "post",
    url: `/playlist/hot`,
  });
}

// 获取推荐歌单
export function getPersonalized(num) {
  return service({
    method: "post",
    url: `/personalized?limit=${num}`,
  });
}

// 获取歌单歌曲
export function getAllSongs(id) {
  return service({
    method: "post",
    url: `/playlist/track/all?id=${id}&limit=30&offset=1`,
  });
}


// 获取分类歌单
export function getListsBest(tag) {
  return service({
    method: "post",
    url: `/top/playlist/highquality?limit=30&cat=${tag}`,
  });
}
export function getLists(tag) {
  return service({
    method: "post",
    url: `/top/playlist?limit=30&cat=${tag}`,
  });
}