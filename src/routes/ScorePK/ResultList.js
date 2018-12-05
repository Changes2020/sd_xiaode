import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import ScoreItem from './_scoreItem';
import ScoreHeader from './_scoreHeader';
import styles from './ResultList.less';
import { getItem } from '../../utils/localStorage';
import { defaultDateTime } from '../../utils/FormatDate';
import ScorePKDialog from '../../container/ScorePKDialog';

const userInfo = getItem('userInfo').value || {};

class ReaultList extends Component {
  // constructor(props) {
  //   super(props);
  //   const { urlParams = {} } = props;
  //   const initState = {
  //     paramsObj: {
  //       startTime: 1535817600000, // 过滤开始时间
  //       endTime: 1535817600999, // 过滤结束时间
  //       dateType: 3, // 1:周均,2:月均,3:自定义
  //       userId: 'xiejian',
  //     },
  //   };
  //   this.state = assignUrlParams(initState, urlParams);
  // }

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
    const { startTime, endTime, userId } = this.state.paramsObj;
    const paramsObj = {
      startTime, // 过滤开始时间
      endTime, // 过滤结束时间
      groupType: 1,
      pkList: [
        {
          familyType: 0,
          objId: 108,
        },
        {
          familyType: 1,
          objId: 108,
        },
      ],
      userId,
    };
      console.log(paramsObj)
    // 掉接口;
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: paramsObj,
    });
  }

  fnGetData = (ops = {}) => {
    const { paramsObj } = this.state;
    const sendParams = {
      paramsObj: assignUrlParams(paramsObj, ops),
    };
    this.saveParams(sendParams);
  };

  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj } = sendParams;
    this.setState({ paramsObj });
    this.props.setCurrentUrlParams(paramsObj);
  };

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


  scoreList = (paramsObj = [],arrLength=1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map((item) => {
      return (
        <div key={item.id} className={arrLength > 2 ?styles.m_formulaButton:styles.m_formulaButton2}>
          <span className={styles.u_nameClass}>{item.orgName}</span>
          <br />
          <span className={styles.u_nameClass}>{`${item.rank}/${item.allObj}`}</span>
        </div>
      );
    });
    return (
      <div style={{display:'inline-block'}} >
        {liList}
      </div>
    );
  };

  render() {
    const { paramsObj } = this.state;
    const { dataList = [] } = this.props.scorePK;
    const itemList = this.dataStruct(dataList);

    const { scoreDate =[]}  = itemList;
    const arrLength = scoreDate.length;
    const bol=true;
    return (
      <div>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <div
          className={arrLength > 2 ? styles.pk3Score : styles.pk2Score}
          onClick={() => {
            window.scroll(0,0);
          }}
        >
          <span className={styles.pkWordCls}>PK</span>
          {this.scoreList(scoreDate,arrLength)}
        </div>
        <ScoreFile paramsObj={scoreDate} />

        <ScoreHeader paramsObj={itemList.positive} type={1} />
        <ScoreItem paramsObj={itemList.positive} />
        <ScoreHeader paramsObj={itemList.negative} type={2} />
        <ScoreItem paramsObj={itemList.negative} />



        <div className="fixBox">
          {/* 学分px区域 */}
          <ScorePKDialog {...this.props} isResultPage={bol} />
        </div>
      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.Details,
}))(ReaultList);
