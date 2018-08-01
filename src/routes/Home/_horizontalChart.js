import {
  circerXformaterXshu,
  axisXnameXhaddle,
  echartXformatXtitle,
  fontSizeAuto,
} from '../../utils/echartsUtils';

export function horizontalChart(nextProps, paramsObj) {
  if (nextProps && nextProps.data) {
    return dataHandle(nextProps, paramsObj);
  }
}
function dataHandle(nextProps, paramsObj) {
  // 数值数组的处理方法
  let chartData = nextProps.data;
  const areaXdata = []; // 用于处理柱状图延伸区域
  const optionsXdata = [];
  const labelSHowData = [];
  chartData = chartData.sort((a, b) => {
    // 对用户数据进行排序
    return a.rank - b.rank;
  });
  const min = chartData[chartData.length - 1].val; // 最大值
  const max = chartData[0].val; // 最小值
  const gridOps = {
    // 设置网格
    left: 0,
    top: max <= 0 ? fontSizeAuto(245) : fontSizeAuto(115),
    right: fontSizeAuto(40),
    bottom: min >= 0 ? fontSizeAuto(180) : fontSizeAuto(50),
  };
  chartData.forEach(item => {
    const opsXobj = {
      value: item.val,
      label: {
        show: true,
        color: '#333333',
        position: item.val > 0 ? 'top' : item.val === 0 ? 'insideBottom' : 'bottom',
        ...circerXformaterXshu(item.chain), // 根据需求传入颜色
      },
      itemStyle: {
        color: item.isXiangguan ? '#FDBF41' : '#52C9C2',
        barBorderRadius: item.val > 0 ? [2, 2, 0, 0] : [0, 0, 2, 2], // 处理数据正副职圆角的问题
      },
    };
    optionsXdata.push(opsXobj); // 添加设置echarts参数
    if (min >= 0 || max <= 0) {
      // 全为正值或全为负值时的处理
      labelSHowData.push(item.val);
    } else {
      const maxLen = max >= -min ? max : -min;
      labelSHowData.unshift(item.val > 0 ? maxLen : -maxLen);
    }

    areaXdata.push({
      value: item.val === 0 ? 0 : item.val < 0 ? min : max,
      label: {
        show: true,
        position: item.val >= 0 ? 'bottom' : 'top',
        offset: item.val >= 0 ? [0, 0] : [0, 8],
        rotate: -20,
        ...axisXnameXhaddle(item.isXiangguan ? '#FDBF41' : '#999999', item.name),
      },
    });
  });
  return setChartsOps({
    gridOps,
    labelSHowData,
    areaXdata,
    seriesData: optionsXdata, // 数据值
    title: echartXformatXtitle(paramsObj),
    companyScore: nextProps.companyScore || String(nextProps.companyScore),
  });
}
function setChartsOps(optionsXobj) {
  // 绘制图标方法
  const seriesData = optionsXobj.seriesData || [];
  const areaXdata = optionsXobj.areaXdata || [];
  const categoryXdata = optionsXobj.categoryXdata || [];
  const labelSHowData = optionsXobj.labelSHowData || [];
  const gridOps = optionsXobj.gridOps || {};
  return {
    tooltip: {
      trigger: 'axis',
      position: 'right',
    },
    title: {
      top: 0,
      left: -fontSizeAuto(10),
      text: optionsXobj.title,
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
          // name: `集团均分 ${optionsXobj.companyScore}`,
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
    splitNumber: 5,
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
        },
        z: 2,
        axisLabel: {
          interval: 0,
          color: '#999999',
          fontSize: fontSizeAuto(12),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#DADADA',
          },
        },
        data: categoryXdata,
      },
    ],
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#8C8C8C',
        fontSize: '16px',
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        // 分割线
        show: true,
        lineStyle: {
          color: '#EEEEEE',
          width: 1,
        },
      },
    },
    series: [
      {
        name: `集团均分 ${optionsXobj.companyScore}`, // 动态获取
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
          data: [{ yAxis: optionsXobj.companyScore, name: '平均值' }],
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
        itemStyle: {
          opacity: 0,
          normal: {
            show: true,
            color: 'rgba(255,255,255,0)',
          },
        },
        tooltip: {
          show: false,
        },
        silent: true, // 阻止掉事件
        barWidth: fontSizeAuto(20),
        data: areaXdata,
      },
      {
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          normal: {
            show: true,
            color: 'rgba(255,255,255,0)',
          },
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
