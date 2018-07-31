import React from 'react';
import echarts from 'echarts';
import styles from './index.less';

export default class Bar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //
  //   };
  // }
  componentDidMount() {
    setTimeout(() => {
      this.initChart();
      // this.drawChart();
    }, 100);
  }
  initChart = () => {
    const myChart = echarts.init(this.ID);
    console.log(myChart);
    // myChart[this.props.chartName] = echarts.init(document.getElementById(this.props.chartName));
    // clientWidth[this.props.chartName] = null;
    // fnResize[this.props.chartName] = this.resize.bind(this);
    // window.addEventListener("resize", fnResize[this.props.chartName]);
    // return myChart[this.props.chartName];
  };
  render() {
    const { width, height } = this.props;
    return <div style={{ width, height }} className={styles.chart} />;
  }
}
