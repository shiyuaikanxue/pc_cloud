import service from "..";
// 获取歌单详情
export function getMusicDetail(id) {
  return service({
    method: "post",
    url: `/song/detail?ids=${id}`,
  });
}

// 获取歌曲歌词
export function getMusicLyric(id) {
  return service({
    method: "post",
    url: `/lyric?id=${id}`,
  });
}