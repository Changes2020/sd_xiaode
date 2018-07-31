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

export function flatten(jsonData = []) {
  // 将树形结构转换成扁平结构
  return jsonData.reduce((arr, { id, parentid, project, number, creditScore, unit, data = [] }) => {
    const newArr = arr || [];
    return newArr.concat([{ id, parentid, project, number, creditScore, unit }], flatten(data));
  }, []);
}

export function detailRelativeData(nowXdata = null, lastXData = null) {
  if (nowXdata === null) {
    return [];
  } else {
    const nowXplatXdata = flatten(nowXdata);
    const lastXplatXdata = flatten(lastXData);
    const handdleData = dealWithRelativeData(nowXplatXdata, lastXplatXdata, 'id', 'creditScore'); // 扁平化数据处理环比之后的结果
    traverseTree(nowXdata[0], handdleData);
    return nowXdata[0];
  }
}

export function traverseTree(data, chainData) {
  if (!data) {
    return;
  }
  traverseNode(data, chainData);
  if (data.data && data.data.length > 0) {
    for (let i = 0; i < data.data.length; i += 1) {
      traverseTree(data.data[i], chainData);
    }
  }
}

function traverseNode(n, chainData) {
  const node = n;
  for (let i = 0; i < chainData.length; i += 1) {
    if (chainData[i].id === node.id) {
      node.chain = chainData[i].chain;
      break;
    }
  }
}
