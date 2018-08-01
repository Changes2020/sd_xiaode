import { echartXformatXtitle, fontSizeAuto, tooltipFormate } from '../../utils/echartsUtils';

export function lineChart(nextProps) {
  if (nextProps) {
    return dataHandle(nextProps);
  }
}
function dataHandle(nextProps) {
  // 数据处理方法
  const companyCreditObj = nextProps.companyAvgDataObj; // 集团排名数据
  const { firstMeanObj } = nextProps; // 排名第一数据
  const dataBase = nextProps.data;
  const chartData = nextProps.data.data;
  const groupData = []; // 所属均值
  const companyGroup = []; // 集团均值
  const firstMean = []; // 集团第一
  const dateArr = []; // 时间数组;
  if (chartData.length !== companyCreditObj.data.length) {
    console.warn('折现数据异常');
  }
  chartData.forEach((item, index) => {
    companyGroup.push(companyCreditObj.data[index].val);
    firstMean.push(firstMeanObj.data[index].val);
    groupData.push(item.val);
    dateArr.push(item.date);
  });
  return setChartsOps({
    title: echartXformatXtitle(nextProps.paramsObj),
    dateArr,
    companyGroup, // 集团数据
    firstMean, // 均分第一名
    firstGroupName: firstMeanObj.title,
    group: groupData, // 个人均分
    groupName: dataBase.title, // 展示小组名称
  });
}
function setChartsOps(optionsXobj) {
  // 绘制图标方法
  return {
    title: {
      text: optionsXobj.title || '',
      top: 0,
      left: -fontSizeAuto(10),
      textStyle: {
        fontWeight: 400,
        fontSize: fontSizeAuto(26),
        color: '#444348',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.6)',
      formatter: tooltipFormate,
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#DADADA',
        },
        label: {
          show: true,
        },
      },
      textStyle: {
        fontSize: fontSizeAuto(16),
        color: '#FFFFFF',
      },
    },
    color: ['#3389FF', '#FED15A', '#52C9C2'],
    legend: [
      {
        // 设置图例
        left: fontSizeAuto(160),
        top: fontSizeAuto(50),
        data: [
          {
            name: '集团均分',
            icon: 'circle',
          },
          {
            name: `均分第一名: ${optionsXobj.firstGroupName}`,
            icon: 'circle',
          },
        ],
        itemGap: 5, // 图例之间的距离
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#999999',
          fontSize: fontSizeAuto(18),
        },
      },
    ],
    grid: {
      // 设置网格
      containLabel: true,
      top: fontSizeAuto(115),
      right: fontSizeAuto(30),
      bottom: fontSizeAuto(50),
      left: 0,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DADADA',
        },
      },
      axisLabel: {
        fontSize: fontSizeAuto(16),
        color: '#8C8C8C',
      },
      data: optionsXobj.dateArr,
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        fontSize: fontSizeAuto(16),
        color: '#8C8C8C',
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
      // 正式数据
      {
        name: '集团均分',
        type: 'line',
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(10), // 拐点大小
        // 拐点
        itemStyle: {
          color: '#3389FF',
        },
        // 线段
        lineStyle: {
          type: 'dashed',
          color: '#3389FF',
          width: 1,
        },
        z: 2,
        data: optionsXobj.companyGroup,
      },
      {
        name: `均分第一名: ${optionsXobj.firstGroupName}`,
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(10), // 拐点大小
        // 拐点
        itemStyle: {
          color: '#FED15A',
        },
        // 线段
        type: 'line',
        lineStyle: {
          color: '#FED15A',
          type: 'solid', // 实线
          width: 1,
        },
        z: 1,
        data: optionsXobj.firstMean,
      },
      {
        name: `${optionsXobj.groupName}`,
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(10), // 拐点大小
        // 拐点
        itemStyle: {
          color: '#52C9C2',
        },
        // 线段
        type: 'line',
        lineStyle: {
          color: '#52C9C2',
          type: 'solid', // 实线
          width: 1,
        },
        z: 3,
        data: optionsXobj.group,
        tooltip: {
          backgroundColor: 'red',
        },
      },
    ],
  };
}
