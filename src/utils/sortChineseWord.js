export function SortChanseData(data, key = 'name') {
  const newArr = data.sort((a, b) => {
    const num = a[key].localeCompare(b[key]);
    const aa = num > 0 ? 1 : num < 0 ? -1 : 0;
    return aa;
  });
  return newArr;
}
