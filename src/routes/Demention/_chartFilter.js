import React from 'react';
import TrendChart from '../../components/Charts/Line';
import { fontSizeAuto } from '../../utils/echartsUtils';

export default class ChartFilter extends React.Component {
  // 通过dementionId遍历接口获得button的title
  dataHandle = datasource => {
    const titledata = !datasource ? [] : datasource;
    const result = [];
    titledata.map(item => {
      if (item.id === this.props.dementionId) {
        const titleitem = {
          nametitle: item.name,
          secondtitle: item.rawDataDes,
        };
        result.push(titleitem);
      }
      return null;
    });
    return result;
  };

  // 调用图表组件之前的数据处理
  chartDataFun = (datasource, chartData) => {
    const titleobj = this.dataHandle(datasource);
    const titleobjName =
      titleobj.length === 0 ? '' : !titleobj[0].nametitle ? '' : titleobj[0].nametitle;
    const tetleobjSecond =
      titleobj.length === 0 ? '' : !titleobj[0].secondtitle ? '' : titleobj[0].secondtitle;
    const nameTitle = `${titleobjName}趋势图`;
    const rawDataDes = tetleobjSecond;
    const xdata = [];
    const ydata = [];
    const dataList = !chartData ? [] : !chartData.data ? [] : chartData.data;
    dataList.map(item => {
      const xvalue = item.key;
      const value = item.val;
      xdata.push(xvalue);
      ydata.push(value);
      return null;
    });
    return {
      title: {
        text: nameTitle,
        subtext: rawDataDes,
        top: fontSizeAuto(38),
        left: fontSizeAuto(24),
        textStyle: {
          fontSize: fontSizeAuto(24),
          color: '#444348',
        },
        subtextStyle: {
          fontSize: fontSizeAuto(20),
          color: '#999',
        },
      },
      grid: {
        containLabel: true, // 此属性用于设置名字太长显示不全
        left: fontSizeAuto(25),
        top: fontSizeAuto(155),
        right: fontSizeAuto(40),
        bottom: fontSizeAuto(20),
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#dadada',
          },
        },
        axisLabel: {
          // x轴y轴字体样式
          fontSize: fontSizeAuto(16),
          color: '#999',
        },
        // splitNumber: 5, // 显示的行数
        data: xdata,
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitNumber: 4, // 显示的行数
        axisLabel: {
          // x轴y轴字体样式
          fontSize: fontSizeAuto(16),
          color: '#999',
        },
        splitLine: {
          // 分界线样式
          lineStyle: {
            width: 1,
            color: '#eee',
          },
        },
      },
      series: {
        name: '集团第一名均分',
        type: 'line',
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(10), // 拐点大小
        itemStyle: {
          // 拐点
          color: '#52C9C2',
        },
        lineStyle: {
          color: '#52C9C2',
          type: 'solid', // 实线
          width: 1,
        },
        data: ydata,
      },
    };
  };

  render() {
    const { buttonData = [], trendData = null,dementionId=1 } = this.props;
    const { data = null } = trendData;
    const dataNew={data,dementionId}
    return (
      <TrendChart
        dataSource={!buttonData ? [] : this.chartDataFun(buttonData, trendData)}
        data={dataNew}  // 通过该参数判断是否刷新图表组件
        width="7.1rem"
        height="6rem"
      />
    );
  }
}
