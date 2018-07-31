export function arrayNoReapeat(arr) {
  const arrStr = arr.map(item => {
    return JSON.stringify(item);
  });
  return [...new Set(arrStr)].map(list => JSON.parse(list));
}
