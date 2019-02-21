/* eslint-disable no-unused-expressions */
// 此排序已做优化,应在拿到数据源后,调取排序接口,并增加拼音排序字段,在此进行业务排序
export function SortChanseData(data, key = 'pinyinSortNum') {
  const result = data.sort((a, b) => {
    return a[key] - b[key];
  });
  return result;
}
