import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './IndexPage.less';
import DatePanle from '../../components/DatePanle';
import SelfTab from '../../components/SelfTab/SelfTab';
import RankTrendTab from '../../components/SelfTab/RankTrendTab';
import GroupCollege from '../../components/SelfTab/GroupCollegeTab';
import Dict from '../../utils/typeDict';
import { getItem } from '../../utils/localStorage';

const { creditTypeDict, groupTypeZHDict } = Dict;
const creditTypeData = Object.keys(creditTypeDict).map(id => ({
  id: Number(id),
  title: creditTypeDict[id],
}));
const groupTypeData = Object.keys(groupTypeZHDict).map(id => ({
  id: Number(id),
  title: groupTypeZHDict[id],
}));

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCollegaRank: false,
    };
  }
  componentDidMount() {
    const { paramsObj = {} } = this.props;
    this.fnCheckShowRank(paramsObj);
  }
  onSelectRank = value => {
    const { paramsObj } = this.props;
    if (value !== paramsObj.rankType) {
      this.getData({ rankType: value });
    }
  };
  onSelectedGroupType = groupType => {
    const { paramsObj } = this.props;
    const rankType = groupType !== 1 && paramsObj.creditShowType === 'rank' ? 1 : 3; // 重写排名顺序,默认是集团排名
    this.getData({ groupType, rankType });
  };
  onValueChange = value => {
    const { paramsObj } = this.props;
    const creditShowType = value === 1 ? 'rank' : value === 2 ? 'trend' : null;
    const rankType = value === 1 && paramsObj.groupType !== 1 ? 1 : 3; // 重写排名顺序,默认是集团排名
    this.getData({ creditShowType, rankType });
  };
  getData = obj => {
    if (this.props.fnGetData) {
      this.props.fnGetData(obj);
    }
    this.fnCheckShowRank({ ...this.props.paramsObj, ...obj });
  };
  selecteDate = dateObj => {
    this.getData(dateObj);
  };
  fnCLickTab = id => {
    this.getData({ creditType: id });
  };
  fnCheckShowRank = paramsObj => {
    // 判断集团排名院内排名是否出现
    const userInfo = getItem('userInfo').value || {};
    const { isShowCollegaRank } = this.state;
    const { groupType, creditShowType } = paramsObj; // 获取用户权限
    const groupTypeP = userInfo.groupType; // 获取用户权限
    const { groupId = null } = userInfo;
    if (
      groupTypeP === 'boss' ||
      groupTypeP === 'admin' ||
      groupId === null ||
      creditShowType === 'trend' ||
      groupType === 1
    ) {
      if (isShowCollegaRank !== false) {
        this.setState({ isShowCollegaRank: false });
      }
    } else if (isShowCollegaRank !== true) {
      this.setState({ isShowCollegaRank: true });
    }
  };

  render() {
    const { paramsObj = {} } = this.props;
    const { isShowCollegaRank } = this.state;
    return (
      <div className={styles.filterCntainer}>
        <Flex className={styles.hintContainer}>
          <p className={styles.hintTitle}>数据中心</p>
          <p className={styles.hintContent}>每天下午发布昨日数据</p>
        </Flex>
        {/*  时间控件  */}
        <DatePanle
          startTime={paramsObj.startTime}
          endTime={paramsObj.endTime}
          dateType={paramsObj.dateType}
          selecteDate={dateObj => this.selecteDate(dateObj)}
        />
        {/*  学分tab   */}
        <div className={styles.bgColor}>
          <div className={styles.tabBox}>
            <SelfTab
              dataSource={{ data: creditTypeData }}
              firstId={paramsObj.creditType}
              commonClass={styles.tabBtn}
              tabClass={styles.sectedBtn}
              callBackFun={item => {
                this.fnCLickTab(item.id);
              }}
            />
          </div>
        </div>
        {/* 趋势排名tab */}
        <div className={styles.classifycls}>
          <RankTrendTab
            firstId={paramsObj.creditShowType === 'rank' ? 1 : 2}
            callBackFun={id => {
              this.onValueChange(id);
            }}
          />
        </div>
        {/* 学院 家族 小组 tab */}
        <div className={styles.groupStyle}>
          <SelfTab
            dataSource={{ data: groupTypeData }}
            firstId={paramsObj.groupType}
            commonClass={styles.groupTabBtn}
            tabClass={styles.groupSectedBtn}
            callBackFun={item => {
              this.onSelectedGroupType(item.id);
            }}
          />
        </div>
        {/* 集团院内排名tab */}

        {!isShowCollegaRank ? null : (
          <div className={styles.tabConBox}>
            <GroupCollege
              firstId={paramsObj.rankType}
              callBackFun={id => {
                this.onSelectRank(id);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
