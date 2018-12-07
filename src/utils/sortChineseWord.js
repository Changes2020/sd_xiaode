/* eslint-disable no-unused-expressions */
export function SortChanseData(data, key = 'name') {
  const newArr = data.sort((a, b) => {
    const num = a[key].localeCompare(b[key]);
    const aa = num > 0 ? 1 : num < 0 ? -1 : 0;
    return aa;
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
