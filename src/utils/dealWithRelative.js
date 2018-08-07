export function dealWithRelativeData(arrXnow, arrXlast, groupId, key = 'val', keyname = 'chain') {
  // 传入两个数组,需要做环比的值,当环比无数据时为字段增加值为null
  for (let i = 0, len = arrXnow.length; i < len; i += 1) {
    const item = arrXnow[i];
    if (arrXlast !== null && arrXlast !== undefined && Array.isArray(arrXlast)) {
      for (let j = 0; j < arrXlast.length; j += 1) {
        const obj = arrXlast[j];
        if (item[groupId] === obj[groupId] && item[key] !== null && obj[key] !== null) {
          const nowXval = parseFloat(item[key]);
          const lastXval = parseFloat(obj[key]);
          if (lastXval === 0) {
            item[keyname] = nowXval === 0 ? 0 : null;
          } else {
            const toFixedNowValue = parseFloat(nowXval.toFixed(2));
            const toFixedLastValue = parseFloat(lastXval.toFixed(2));
            item[keyname] =
              toFixedLastValue !== 0
                ? parseFloat(
                    (
                      (toFixedNowValue - toFixedLastValue) /
                      Math.abs(toFixedLastValue) *
                      100
                    ).toFixed(2)
                  )
                : null;
          }
          break;
        } else if (j === arrXlast.length - 1) {
          item[keyname] = null;
        }
      }
    } else {
      item[keyname] = null;
    }
  }
  return arrXnow;
}

export function flatten(data = [], oId = undefined) {
  let jsonData = [];
  if (!data) {
    jsonData = [];
  } else {
    jsonData = data;
  }

  // 将树形结构转换成扁平结构
  return jsonData.reduce(
    (arr, { id, parentId = undefined, project, num, score, unit, name, dimensions = [] }) => {
      const newArr = arr || [];
      const originId = oId === undefined ? id : oId;
      return newArr.concat(
        [{ id, parentId, project, num, score, unit, name, originId }],
        flatten(dimensions, originId)
      );
    },
    []
  );
}

export function detailRelativeData(nowXdata = null, lastXData = null) {
  if (nowXdata === null) {
    return [];
  } else {
    const nowXplatXdata = flatten(nowXdata);
    const lastXplatXdata = flatten(lastXData);
    const handdleData = detailRelative(nowXplatXdata, lastXplatXdata, 'score'); // 扁平化数据处理环比之后的结果
    traverseTree({ dimensions: nowXdata }, handdleData);
    return nowXdata;
  }
}

export function traverseTree(data, chainData, originId) {
  if (!data) {
    return;
  }
  traverseNode(data, chainData, originId);
  if (data.dimensions && data.dimensions.length > 0) {
    for (let i = 0; i < data.dimensions.length; i += 1) {
      const newOriginId = originId === undefined ? data.dimensions[i].id : originId;
      traverseTree(data.dimensions[i], chainData, newOriginId);
    }
  }
}

function traverseNode(n, chainData, originId) {
  const node = n;
  const handleObj = chainData.find(
    item => item.id === node.id && item.parentId === node.parentId && item.originId === originId
  );
  node.chain = handleObj ? handleObj.chain : null;
}
function detailRelative(arrXnow, arrXlast, key = 'val', keyname = 'chain') {
  // 用于详情页面环比
  // 传入两个数组,需要做环比的值,当环比无数据时为字段增加值为null
  for (let i = 0, len = arrXnow.length; i < len; i += 1) {
    const item = arrXnow[i];
    if (arrXlast !== null && arrXlast !== undefined && Array.isArray(arrXlast)) {
      for (let j = 0; j < arrXlast.length; j += 1) {
        const obj = arrXlast[j];
        if (
          item.id === obj.id &&
          item.parentId === obj.parentId &&
          item.originId === obj.originId &&
          item[key] !== null &&
          obj[key] !== null
        ) {
          const nowXval = parseFloat(item[key]);
          const lastXval = parseFloat(obj[key]);
          if (lastXval === 0) {
            item[keyname] = nowXval === 0 ? 0 : null;
          } else {
            const toFixedNowValue = parseFloat(nowXval.toFixed(2));
            const toFixedLastValue = parseFloat(lastXval.toFixed(2));
            item[keyname] =
              toFixedLastValue !== 0
                ? parseFloat(
                    (
                      (toFixedNowValue - toFixedLastValue) /
                      Math.abs(toFixedLastValue) *
                      100
                    ).toFixed(2)
                  )
                : null;
          }
          break;
        } else if (j === arrXlast.length - 1) {
          item[keyname] = null;
        }
      }
    } else {
      item[keyname] = null;
    }
  }
  return arrXnow;
}
