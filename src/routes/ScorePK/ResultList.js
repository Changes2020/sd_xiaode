import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import styles from './ResultList.less';

import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import ScoreHeader from './_scoreHeader';
import ScoreItem from './_scoreItem';

class ReaultList extends Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: 1535817600000, // 过滤开始时间
        endTime: 1535817600999, // 过滤结束时间
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: 'xiejian',
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

    // 掉接口
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: paramsObj,
    });
  }
  fnGetData = (ops = {}) => {
    console.log(ops);
  };
  dataStruct = (dataList = []) => {
    // console.log(dataList.length)
    const positive = [];
    const negative= [];
    const scoreDate =[];
    if(!dataList||(Array.isArray(dataList) && dataList.length === 0)){
      console.log('是空数组');
    }else{
      // console.log((dataList[0].dimensionPKResult.avgScore).toFixed(2))
      dataList.map((item, index) => {
        const scoreDateItem ={
          key: index,
          id: item.id,
          orgName:item.orgName ,
          allObj:item.allObj ,
          rank: item.rank,
          avgScore:(item.dimensionPKResult.avgScore).toFixed(2)
        }
        const positiveItem = {
          key: index,
          name: '正面均分',
          value: item.dimensionPKResult.childNode[0].avgScore,
          childNode:item.dimensionPKResult.childNode[0].childNode||[],
        };
        const negativeItem = {
          key: index,
          name: '负面均分',
          value: item.dimensionPKResult.childNode[1].avgScore,
          childNode:item.dimensionPKResult.childNode[1].childNode||[],
        };
        positive.push(positiveItem);
        scoreDate.push(scoreDateItem);
        negative.push(negativeItem);
        return 0;
      });
    }


    return {positive,negative,scoreDate};
  };

  render() {
    const { paramsObj } = this.state;
    const { dataList=[] } = this.props.scorePK;
    const test = this.dataStruct(dataList)
    // console.log(dataList,test)
    const scoreDate = [
      { key: 1, demensionName: '正面均分', avgScore: 23.34,childNode:[] },
      { key: 2, demensionName: '正面均分', avgScore: 33.34,childNode:[] },
    ];
    const scoreDate1 = [
      { id: 2, orgName: '狐逻经管专科', rank: 12, allObj: 100, avgScore: 83.44 },
      { id: 3, orgName: '财富经管本科', rank: 24, allObj: 100, avgScore: 99.99 },
    ];
    return (
      <div className={styles.normal}>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <ScoreFile paramsObj={test.scoreDate} />
        <ScoreFile paramsObj={scoreDate1} />
        <ScoreHeader paramsObj={scoreDate} />


      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.Details,
}))(ReaultList);
