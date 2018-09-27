import Dict from '../../utils/typeDict';
import { getItem } from '../../utils/localStorage';
import { arrayNoReapeat } from '../../utils/arrayNoReapeat';
import {
  circerXformaterXheng,
  axisXnameXhaddleXnobreak,
  echartXformatXtitle,
  fontSizeAuto,
} from '../../utils/echartsUtils';

export function longitudinalChart(nextProps, paramsObj, isShowAll = false) {
  if (nextProps && nextProps.data) {
    return dataHandle(nextProps, paramsObj, isShowAll);
  }
}
function dataHandle(nextProps, paramsObj, isShowAll = false) {
  // 数据处理方法
  // 只有直属学院或家族或小组才会做相关处理
  const labelSHowData = []; // 处理数据过小展示不全的问题
  let chartData = checkoutRank(nextProps, paramsObj, isShowAll);
  chartData = chartData.sort((a, b) => {
    // 对用户数据进行排序
    return a.rank - b.rank;
  });
  const min = chartData[chartData.length - 1].val; // 最小值
  const max = chartData[0].val; // 最大值
  const areaXdata = []; // 用于处理柱状图延伸区域
  const optionsXdata = [];
  const gridOps = {
    // 设置网格
    left: min >= 0 ? fontSizeAuto(180) : fontSizeAuto(10),
    top: fontSizeAuto(115),
    right: max <= 0 ? fontSizeAuto(220) : fontSizeAuto(40),
    bottom: fontSizeAuto(120),
  };

  chartData.forEach(item => {
    const opsXobj = {
      value: item.val,
      label: {
        show: true,
        color: '#333333',
        // position: item.val > 0 ? 'insideRight' : 'insideLeft',
        position: isValuePosition(min, max, item.val),
        ...circerXformaterXheng(item.chain, item.rank, fontSizeAuto(16)), // 根据需求传入颜色    indexde 值需要处理
      },
      itemStyle: {
        color: item.isXiangguan ? '#FDBF41' : '#52C9C2',
        barBorderRadius: item.val > 0 ? [0, 2, 2, 0] : [2, 0, 0, 2], // 处理数据正副职圆角的问题
      },
    };
    optionsXdata.unshift(opsXobj); // 添加设置echarts参数
    if (min >= 0 || max <= 0) {
      // 全为正值或全为负值时的处理
      labelSHowData.unshift(item.val);
    } else {
      // 当值是一正一副时居中显示
      const maxLen = max >= -min ? max : -min;
      labelSHowData.unshift(item.val > 0 ? maxLen : -maxLen);
    }
    areaXdata.unshift({
      value: item.val === 0 ? 0 : item.val < 0 ? min : max,
      label: {
        show: true,
        position: item.val >= 0 ? 'left' : 'right',
        ...axisXnameXhaddleXnobreak(
          item.name,
          fontSizeAuto(18),
          item.isXiangguan ? '#FDBF41' : '#999999'
        ),
      },
    });
  });
  return setChartsOps({
    labelSHowData,
    gridOps,
    areaXdata,
    seriesData: optionsXdata,
    title: echartXformatXtitle(paramsObj),
    junfen: nextProps.companyScore || String(nextProps.companyScore),
  });
}
function checkoutRank(nextProps, paramsObj, isAll = false) {
  // 处理检查是否添加相关数据及为高亮处理数据
  const userInfo = getItem('userInfo').value || {};
  // const allOrgMap = getItem('allOrgMap').value || {};
  const { data } = nextProps; // 需要处理的数据
  const { groupId } = userInfo;
  const userGroupType = userInfo.groupType === 'class' ? 'group' : userInfo.groupType; // college,family,group,boss,admin
  const selectedGroupType = paramsObj.groupType; // 1学院2家族3小组
  const filterSelfArr = [];
  // const sortArr=data.sort((a,b)=>(a.rank-b.rank));      //按照降序排列
  data.forEach(item => {
    const newUserType = Object.keys(Dict.groupTypeDict).find(
      list => Dict.groupTypeDict[list] === userGroupType
    );
    if (newUserType === selectedGroupType && groupId === item.groupId) {
      filterSelfArr.push(item);
    }
  });
  if (!isAll) {
    const top10Arr = data.slice(0, 10); // 取前十名;
    const lastObj = data.slice(-1);
    return arrayNoReapeat([...top10Arr, ...filterSelfArr, ...lastObj]);
  } else {
    return data;
  }
}
function setChartsOps(optionsXobj) {
  // 绘制图标方法
  const areaXdata = optionsXobj.areaXdata || [];
  const labelSHowData = optionsXobj.labelSHowData || [];
  const seriesData = optionsXobj.seriesData || [];
  const categoryXdata = optionsXobj.categoryXdata || [];
  const gridOps = optionsXobj.gridOps || {};
  return {
    tooltip: {
      trigger: 'axis',
      position: 'right',
    },
    title: {
      top: 0,
      left: -fontSizeAuto(10),
      text: optionsXobj.title || '',
      textStyle: {
        fontWeight: 400,
        color: '#444348',
        fontSize: fontSizeAuto(26),
      },
    },
    color: '#4A90E2', // 设置图例远点颜色,可跟数组
    legend: {
      left: fontSizeAuto(279),
      top: fontSizeAuto(50),
      selectedMode: false, // 禁止点击图例
      itemWidth: 7,
      itemHeight: 7,
      data: [
        {
          name: `集团均分 ${optionsXobj.junfen || ''}`,
          icon: 'circle',
          textStyle: {
            color: '#999999',
            fontSize: fontSizeAuto(18),
          },
        },
      ],
    },
    grid: {
      containLabel: true, // 此属性用于设置名字太长显示不全
      ...gridOps,
    },
    xAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        z: 2,
        axisLabel: {
          color: '#8C8C8C',
          fontSize: fontSizeAuto(16),
        },
        axisLine: {
          show: false,
        },
        splitNumber: 5,
        splitLine: {
          lineStyle: {
            width: 1,
            color: '#EEEEEE',
          },
        },
        data: categoryXdata,
      },
    ],
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#8C8C8C',
        fontSize: '16px',
      },
    },
    series: [
      {
        name: `集团均分 ${optionsXobj.junfen}`, // 动态获取
        type: 'bar',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        barGap: '40%',
        z: 4,
        markLine: {
          // 设置集团均分值
          silent: true, // 鼠标不触发
          symbol: '',
          label: {
            // 标记线的显示
            show: false,
          },
          data: [{ xAxis: optionsXobj.junfen, name: '平均值' }],
          lineStyle: {
            color: '#4A90E2',
          },
        },
        tooltip: {
          show: false,
        },
        barWidth: fontSizeAuto(20),
        data: seriesData,
      },
      {
        type: 'bar',
        barGap: '-100%',
        tooltip: {
          show: false,
        },
        itemStyle: {
          normal: {
            show: true,
            color: 'rgba(255,255,255,0)',
          },
        },
        silent: true, // 阻止掉事件
        barWidth: fontSizeAuto(20),
        data: areaXdata,
      },
      {
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          show: true,
          color: 'rgba(255,255,255,0)',
        },
        tooltip: {
          show: false,
        },
        silent: true, // 阻止掉事件
        barWidth: fontSizeAuto(20),
        data: labelSHowData,
      },
    ],
  };
}
function isValuePosition(min, max, val) {
  // 传入的是一个已经升序拍好的数组
  const multNum = 2.2; // 倍数
  let position = null;
  const totalLength =
    min >= 0 ? max : min < 0 && max > 0 ? max - min : min < 0 && max <= 0 ? -min : 0; // 总长度
  const maddleGaid = totalLength / 5;
  if (val > 0) {
    position = val >= maddleGaid * multNum ? 'insideRight' : 'right';
  } else if (val === 0) {
    position = 'right';
  } else {
    position = -val >= maddleGaid * multNum ? 'insideLeft' : 'left';
  }
  return position;
}
