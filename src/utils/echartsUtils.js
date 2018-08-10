import relativeXbottom from '../assets/relative_bottom.png';
import relativeXtop from '../assets/relative_top.png';
import relativeXright from '../assets/relative_right.png';

export function fontSizeAuto(fontSize = null) {
  // 根据root节点的宽度进行动态设置字体的样式
  const rootWidth = parseFloat(document.documentElement.style.fontSize);
  const nodeFontsize = rootWidth * parseFloat(fontSize) / 100;
  return Number(nodeFontsize.toFixed(2));
}
export function breakStr(value) {
  // 字符串换行
  if (value === null || value === undefined) {
    return '';
  } else {
    let ret = ''; // 拼接加\n返回的类目项
    const maxLength = 1; // 每项显示文字个数
    const valLength = value.length; // X轴类目项的文字个数
    const rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
    if (rowN > 1) {
      // 如果类目项的文字大于3,
      for (let i = 0; i < rowN; i += 1) {
        let temp = ''; // 每次截取的字符串
        const start = i * maxLength; // 开始截取的位置
        const end = start + maxLength; // 结束截取的位置
        // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
        temp = `${value.substring(start, end)}\n`;
        ret += temp; // 凭借最终的字符串
      }
      return ret;
    } else {
      return value;
    }
  }
}
// formater定义的方法,,竖状圆柱处理label方法
export function circerXformaterXshu(chain = null) {
  const relativeXshape = chain > 0 ? relativeXtop : chain === 0 ? relativeXright : relativeXbottom;
  const size = fontSizeAuto(12);
  const paddingRight = fontSizeAuto(7);
  return {
    formatter: val => {
      if (chain === null) {
        // 没有形成环比
        return `{LabelVal|${val.value}}`;
      } else {
        return `{LabelVal|${val.value}}{circle|}`;
      }
    },
    rich: {
      LabelVal: {
        color: '#000',
        align: 'left',
        padding: [0, paddingRight, 0, 0],
        fontSize: fontSizeAuto(16),
      },
      circle: {
        width: size,
        height: size,
        backgroundColor: { image: relativeXshape },
      },
    },
  };
}
// formater定义的方法,,横状圆柱处理label方法
export function circerXformaterXheng(chain = null, rankNum) {
  const size = fontSizeAuto(13);
  const paddingRight = fontSizeAuto(8);
  const relativeXshape = chain > 0 ? relativeXtop : chain === 0 ? relativeXright : relativeXbottom;
  return {
    formatter: val => {
      if (chain === null) {
        // 没有形成环比
        return `{LabelVal|第${rankNum}名:${val.value}}`;
      } else {
        return `{LabelVal|第${rankNum}名:${val.value} }{circle|}`; //   待处理
      }
    },
    rich: {
      LabelVal: {
        color: '#000',
        align: 'left',
        padding: [0, paddingRight, 0, 0],
        fontSize: fontSizeAuto(16),
      },
      circle: {
        width: size,
        height: size,
        align: 'right',
        backgroundColor: { image: relativeXshape },
      },
    },
    // textStyle: {fontSize: fontSize}
  };
}
// 处理轴数据显示,换行
export function axisXnameXhaddle(color, aXisName) {
  return {
    formatter: () => {
      return `{circle|${breakStr(aXisName)}}`;
    },
    rich: {
      circle: {
        color,
        fontSize: fontSizeAuto(16),
      },
    },
  };
}
export function axisXnameXhaddleXnobreak(aXisName, fontSize, color) {
  return {
    formatter: () => {
      return `{circle|${aXisName}}`;
    },
    rich: {
      circle: {
        color,
        fontSize,
        align: 'right',
      },
    },
  };
}
export function tooltipFormate(params) {
  // x轴名称
  const { name } = params[0];
  let str = `${name}<br />`;
  for (let i = 0; i < params.length; i += 1) {
    // 图表title名称
    const { seriesName, value } = params[i];
    str += `<span style="display: inline-block;margin-top: 0.08rem"><a style="width:0.09rem;height: 0.09rem;margin-right:0.1rem;color:${
      params[i].color
    }">●</a>${seriesName}:${' '}${value || 0}</span><br />`;
  }
  return str;
}
// 该方法处理数据name显示不全的问题,默认显示一隔数据
export function isMiddleValue(min, max, val) {
  // 传入的是一个已经升序拍好的数组
  const multNum = 2; // 倍数
  let barHeight = 0;
  const totalLength =
    min >= 0 ? max : min < 0 && max > 0 ? max - min : min < 0 && max <= 0 ? -min : 0; // 总长度
  const maddleGaid = totalLength / 5;
  if (min >= 0 && max >= 0) {
    barHeight = -maddleGaid * multNum; // 最小值大于0,给他默认区域为负值,1.5倍间隔
  } else if (min < 0 && max > 0) {
    if (val > 0) {
      // 处于这个区间时,给一个默认值1.5倍区间值
      barHeight = val > maddleGaid * multNum ? val : maddleGaid * multNum;
    } else {
      barHeight = val < -(maddleGaid * multNum) ? val : -(maddleGaid * multNum);
    }
  } else if (min < 0 && max <= 0) {
    barHeight = maddleGaid * multNum; // 最大值小于等于0时,默认值为正的1.5倍区间
  }
  return barHeight;
}
export function echartXformatXtitle(paramsObj) {
  return `${{ 1: '学分均分', 2: '正面均分', 3: '负面均分' }[paramsObj.creditType]}-${
    {
      1: '学院',
      2: '家族',
      3: '小组',
    }[paramsObj.groupType]
  }(${
    {
      selfExam: '自考',
      barrier: '壁垒',
      incubator: '孵化器',
    }[paramsObj.familyName]
  })`;
}
