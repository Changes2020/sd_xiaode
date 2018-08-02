import React from 'react';
import styles from './groupList.less';
import ChartCotainer from '../../components/ChartCotainer';
import BarChart from '../../components/Charts/Bar';
import LineChart from '../../components/Charts/Line';
import { horizontalChart } from './_horizontalChart';
import { longitudinalChart } from './_longitudinalChart';
import { lineChart } from './_lineChart';
import { getItem } from '../../utils/localStorage';
import { arrayNoReapeat } from '../../utils/arrayNoReapeat';
import { getSameCollegeAllGroup } from '../../utils/dealWithOrg';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Dialog from '../../components/Dialog';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

export default class ChartContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
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
    this.selectLimitGroup('selfExam');
    const { home, paramsObj } = this.props;
    const { rankDataObj } = home;
    const charts = [];
    Object.keys(rankDataObj)
      .reverse()
      .forEach(familyName => {
        if (rankDataObj[familyName] && rankDataObj[familyName].data) {
          const chartData = rankDataObj[familyName];
          if (chartData.data.length > 10) {
            // 使用横向柱状图
            const rankChartOps = longitudinalChart(chartData, { ...paramsObj, familyName });
            charts.push(
              this.rendRankChart(rankDataObj[familyName], rankChartOps, familyName, true)
            );
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
    Object.keys(trendDataObj)
      .reverse()
      .forEach(familyName => {
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
          charts.push(
            this.rendTrendChart(trendDataObj[familyName], trendChartOps, familyName, true)
          );
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
    const { paramsObj } = this.props;
    const { groupType } = paramsObj;
    const isShowAllBtn = groupType === 3 && keyname === 'selfExam'; //  自考小组时才显示
    const groupList = this.selectLimitGroup(keyname);
    return (
      <ChartCotainer
        key={keyname}
        onClickTitle={() => {
          this.toDetailPage();
        }}
      >
        <LineChart height="400px" key={keyname} data={data} dataSource={dataSource} />
        <div>{groupList.length > 0 && this.renderGroupList(groupList, keyname)}</div>
        {isShowAllBtn && (
          <div className={styles.checkAllGroup} onClick={() => this.lookAllGroup(keyname)}>
            查看全部
          </div>
        )}
      </ChartCotainer>
    );
  };
  selectLimitGroup = familyType => {
    // 根据用户权限过滤出需要展示的用户
    // 用户权限分为collega,family,group,bossAdmin;
    // 用户登录类型'admin,boss,college,family,
    const { groupId, groupType } = userInfo;
    const { home = {}, paramsObj } = this.props;
    const { rankDataObj = {} } = home;
    let returnData = [];
    if (paramsObj.groupType === 3 && familyType === 'selfExam') {
      // 当用户为小组自考时显示小组自考数据
      if (groupType === 'boss' || groupType === 'admin') {
        // 管理员用户,显示前9后9条
        const newData = rankDataObj[familyType].data;
        const top9Arr = newData.slice(0, 9);
        const last9Arr = newData.slice(-9);
        returnData = arrayNoReapeat([...top9Arr, ...last9Arr]);
      } else {
        // 如果是小组自考,根据用户身份获取对应college里面所有的小组
        const orgArr = getSameCollegeAllGroup(allOrgMap, groupId, groupType); // 该小组的学院下所有的小组(组织结构)
        orgArr.forEach(item => {
          for (let i = 0; i < rankDataObj[familyType].data.length; i += 1) {
            const obj = rankDataObj[familyType].data[i];
            if (obj.groupId === item.groupId) {
              returnData.push(obj);
            }
          }
        });
      }
    } else {
      returnData = [...rankDataObj[familyType].data];
    }

    return returnData.sort((a, b) => a.rank - b.rank);
  };
  lookAllGroup = familyType => {
    // 趋势图查看全部
    if (this.props.lookAllGroup) {
      this.props.lookAllGroup(familyType);
    }
    this.setState({ visible: true });
  };
  selectGroup = (id = null, name, familyType) => {
    if (this.props.selectGroup) {
      this.props.selectGroup(id, name, familyType);
    }
  };
  renderGroupList = (groupData, familyType) => {
    // 此方法用于render出groupList
    const { fmilyTypeFilteKeyIDs } = this.props.home;
    const isSelectedId = fmilyTypeFilteKeyIDs[familyType];
    const data = groupData.map(item => ({
      id: item.groupId,
      name: item.name,
      rank: item.rank,
      familyType,
    }));

    const buttonItem = item => (
      <span>
        <span className={item.id === isSelectedId ? styles.spanIdSelected : styles.spanIdStyle}>
          {item.rank}
        </span>
        <span className={item.id === isSelectedId ? styles.spanNameSelected : styles.spanNameStyle}>
          {item.name}
        </span>
      </span>
    );
    return (
      <ButtonGroup
        dataSource={{ data }}
        id={isSelectedId}
        btnClass={styles.btnStyle}
        btnSelectedClass={styles.btnSelected}
        spanFunction={item => buttonItem(item)}
        dataReturnFun={item => {
          this.selectGroup(item.id, item.name, item.familyType);
        }}
      />
    );
  };
  renderDialogGroup = () => {
    // const { allGroupObj, fmilyTypeFilteKeyIDs } = this.props.home;
  };

  render() {
    const { home = {} } = this.props;
    const { visible } = this.state;
    const { rankDataObj, trendDataObj, creditShowType } = home;
    const rankDom = rankDataObj ? this.handleRankChart() : null;
    const trendDom = trendDataObj ? this.handleTrendChart() : null;
    const renderDom = creditShowType === 'rank' ? rankDom : trendDom;
    return (
      <div>
        {[...renderDom]}
        {visible && (
          <Dialog visible={visible}>
            <div>ccddd</div>
          </Dialog>
        )}
      </div>
    );
  }
}
