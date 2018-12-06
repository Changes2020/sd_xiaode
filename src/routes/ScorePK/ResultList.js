import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import { defaultDateTime } from '../../utils/FormatDate';
import { dimensionAuthority } from '../../utils/dimensionAuthority';
import Loading from '../../components/Loading/Loading';
import NoData from '../../components/NoData/NoData.js';
import { getItem } from '../../utils/localStorage';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import ScoreItem from './_scoreItem';
import ScoreHeader from './_scoreHeader';
import ScorePKDialog from '../../container/ScorePKDialog';
import styles from './ResultList.less';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

class ReaultList extends Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const { startTime, endTime } = defaultDateTime();
    const initState = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        groupType: 1, // 1:学院，2:家族，3:小组
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: userInfo.userId,
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getData(this.state.paramsObj);
  }
  // 请求接口的中间函数
  getData = (params = {}) => {
    // const { startTime, endTime, userId } = this.state.paramsObj;
    const { startTime, endTime } = params || this.state.paramsObj;
    const pkType = params.groupType || this.state.paramsObj.groupType;
    const { userId } = this.state.paramsObj;
    // 获取权限用户数据
    const { groupId, groupType } = userInfo;
    const dataOrg = dimensionAuthority(allOrgMap, groupId, groupType); // 获取授权数据
    const PKCondition = getItem('PKCondition').value || {};
    const type = { 1: 'college', 2: 'family', 3: 'group' }[Number(pkType)];
    const resetList = [];
    PKCondition[type].map(item => {
      const list = {
        familyType: item.familyType,
        orgId: item.orgId,
      };
      resetList.push(list);
      return 0;
    });

    const sendParams = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        groupType: Number(pkType),
        pkList: resetList,
        userId,
      },
      dataOrg,
    };
    this.getPKResultFetch(sendParams);
  };

  // 请求model中的getPKResult方法
  getPKResultFetch(sendParams) {
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: sendParams,
    });
  }

  fnGetData = (ops = {}) => {
    const { paramsObj } = this.state;
    const sendParams = {
      paramsObj: assignUrlParams(paramsObj, ops),
    };
    this.getData(ops);
    this.saveParams(sendParams);
  };

  changeType = (ops = {}) => {
    this.fnGetData(ops);
  };

  // 用于数据存储,以及添加url
  saveParams = sendParams => {
    const { paramsObj } = sendParams;
    this.setState({ paramsObj });
    this.props.setCurrentUrlParams(paramsObj);
  };

  // 格式化数据
  dataStruct = (dataList = []) => {
    const positive = [];
    const negative = [];
    const scoreDate = [];
    if (!dataList || (Array.isArray(dataList) && dataList.length === 0)) {
      console.log('是空数组');
    } else {
      dataList.map((item, index) => {
        const scoreDateItem = {
          key: index,
          id: item.id,
          orgName: item.orgName || '',
          allObj: item.allObj || 100,
          rank: item.rank || 100,
          avgScore: item.dimensionPKResult.avgScore.toFixed(2) || 0,
        };
        const childrien = item.dimensionPKResult.childNode || [];
        childrien.map(val => {
          if (val.dimensionName === '正面均分') {
            positive.push(val);
          } else {
            negative.push(val);
          }
          return 0;
        });
        scoreDate.push(scoreDateItem);
        return 0;
      });
    }
    return { positive, negative, scoreDate };
  };

  // pk区域数据处理
  scoreList = (paramsObj = [], arrLength = 1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map((item, index) => {
      const i = index + 1;
      return (
        <div key={i} className={arrLength > 2 ? styles.m_formulaButton : styles.m_formulaButton2}>
          <span className={styles.u_nameClass}>{item.orgName}</span>
          <br />
          <span className={styles.u_nameClass}>{`${item.rank}/${item.allObj}`}</span>
        </div>
      );
    });
    return <div style={{ display: 'inline-block' }}>{liList}</div>;
  };

  render() {
    const { paramsObj } = this.state;
    const { isloading, scorePK } = this.props;
    const { dataList = [] } = scorePK;
    const itemList = this.dataStruct(dataList);

    const { scoreDate = [] } = itemList;
    const arrLength = scoreDate.length;
    return (
      <div style={{ background: '#EDF0F3', width: '7.5rem', overflow: 'hidden' }}>
        {/* 时间选择区域 */}
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />

        {isloading && <Loading />}
        {/* 学分px区域吸顶 */}
        {arrLength > 0 ? (
          <div
            className={arrLength > 2 ? styles.pk3Score : styles.pk2Score}
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <span className={styles.pkWordCls}>PK</span>
            {this.scoreList(scoreDate, arrLength)}
          </div>
        ) : null}
        {/* 学分均分区域 */}
        {arrLength > 0 ? (
          <div>
            <ScoreFile paramsObj={scoreDate} />
            {/* 正负面均分list */}
            <ScoreHeader paramsObj={itemList.positive} type={1} />
            <ScoreItem
              paramsObj={itemList.positive}
              type={2}
              selfProps={(url, obj) => this.props.setRouteUrlParams(url, obj)}
            />
            <ScoreHeader paramsObj={itemList.negative} type={2} />
            <ScoreItem
              paramsObj={itemList.negative}
              type={10}
              selfProps={(url, obj) => this.props.setRouteUrlParams(url, obj)}
            />
          </div>
        ) : (
          <NoData showflag />
        )}

        {/* 学分px区域悬浮窗户 */}
        <div className="fixBox">
          <ScorePKDialog
            {...this.props}
            openInResultPage={params => {
              this.changeType(params);
            }}
          />
        </div>
        <div style={{ height: '0.4rem', width: '7.5rem' }} />
      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.scorePK,
}))(ReaultList);
