import service from "..";
// 获取歌单详情
export function getMusicDetail(id) {
  return service({
    method: "post",
    url: `/playlist/detail?id=${id}`,
  });
}

// 获取歌单详情
export function getMusicListAllSongs(id, number) {
  return service({
    method: "post",
    url: `/playlist/track/all?id=${id}&limit=${number}`,
  });
}
