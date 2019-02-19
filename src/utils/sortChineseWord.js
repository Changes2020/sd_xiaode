/* eslint-disable no-unused-expressions */
export function SortChanseData(data, key = 'name') {
  console.log('排序');
  const newArr = data.sort((a, b) => {
    if (a[key].localeCompare) {
      const num = a[key].localeCompare(b[key]);
      const aa = num > 0 ? 1 : num < 0 ? -1 : 0;
      return aa;
    } else {
      return b - a;
    }
  });
  let result = [];
  for (let i = 0; i < newArr.length; i += 1) {
    if (String(newArr[i][key]).length > 0) {
      result = newArr.slice(i);
      result = result.concat(newArr.slice(0, i));
      break;
    }
  }
  return result;
}
