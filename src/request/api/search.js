import service from "..";
// 获取热搜列表
export function getSearchHot() {
  return service({
    method: "post",
    url: `/search/hot/detail`,
  });
}