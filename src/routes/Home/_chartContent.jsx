import React from 'react';
import ChartCotainer from '../../components/ChartCotainer';
import BarChart from '../../components/Charts/Bar';
import LineChart from '../../components/Charts/Line';
import { horizontalChart } from './_horizontalChart';
import { longitudinalChart } from './_longitudinalChart';
import { lineChart } from './_lineChart';

export default class ChartContent extends React.Component {
  toDetailPage = () => {
    if (this.props.toDetailPage) {
      this.props.toDetailPage();
    }
  };
  toAllRankPage = keyname => {
    if (this.props.toAllRankPage) {
      this.props.toAllRankPage(keyname);
    }
  };
  handleRankChart = () => {
    const { home, paramsObj } = this.props;
    const { rankDataObj } = home;
    const charts = [];
    Object.keys(rankDataObj).forEach(familyName => {
      if (rankDataObj[familyName] && rankDataObj[familyName].data) {
        const chartData = rankDataObj[familyName];
        if (chartData.data.length > 10) {
          // 使用横向柱状图
          const rankChartOps = longitudinalChart(chartData, { ...paramsObj, familyName });
          charts.push(this.rendRankChart(rankDataObj[familyName], rankChartOps, familyName, true));
        } else {
          // 使用纵向柱状图
          const rankChartOps = horizontalChart(chartData, { ...paramsObj, familyName });
          charts.push(this.rendRankChart(rankDataObj[familyName], rankChartOps, familyName));
        }
      }
    });
    return charts;
  };
  handleTrendChart = () => {
    const { home, paramsObj } = this.props;
    const { trendDataObj = {}, companyAvgDataObj, firstMeanObj } = home;
    const charts = [];
    Object.keys(trendDataObj).forEach(familyName => {
      if (trendDataObj[familyName] && trendDataObj[familyName].data) {
        const data = trendDataObj[familyName];
        const handleOptions = {
          data,
          companyAvgDataObj: companyAvgDataObj[familyName],
          firstMeanObj: firstMeanObj[familyName],
        };
        const trendChartOps = lineChart({
          ...handleOptions,
          paramsObj: { ...paramsObj, familyName },
        });
        charts.push(this.rendTrendChart(trendDataObj[familyName], trendChartOps, familyName, true));
      }
    });
    return charts;
  };

  rendRankChart = (data, dataSource, keyname, isShowFooter = false) => {
    return (
      <ChartCotainer
        key={keyname}
        isShowFooter={isShowFooter}
        onClickTitle={() => {
          this.toDetailPage();
        }}
        onClickFooter={() => {
          this.toAllRankPage(keyname);
        }}
      >
        <BarChart width="7.1rem" height="400px" key={keyname} data={data} dataSource={dataSource} />
      </ChartCotainer>
    );
  };
  rendTrendChart = (data, dataSource, keyname) => {
    return (
      <ChartCotainer
        key={keyname}
        onClickTitle={() => {
          this.toDetailPage();
        }}
      >
        <LineChart height="400px" key={keyname} data={data} dataSource={dataSource} />
      </ChartCotainer>
    );
  };

  render() {
    const { home = {} } = this.props;
    const { rankDataObj, trendDataObj, creditShowType } = home;
    // const {rankChartOps}=this.state;
    const rankDom = rankDataObj ? this.handleRankChart() : null;
    const trendDom = trendDataObj ? this.handleTrendChart() : null;
    const renderDom = creditShowType === 'rank' ? rankDom : trendDom;
    return <div>{[...renderDom]}</div>;
  }
}
