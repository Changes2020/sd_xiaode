import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import ScoreItem from './_scoreItem';
import ScoreHeader from './_scoreHeader';

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

    // 掉接口;
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: paramsObj,
    });
  }
  fnGetData = (ops = {}) => {
    console.log(ops);
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
          orgName: item.orgName||'',
          allObj: item.allObj||100,
          rank: item.rank||100,
          avgScore: item.dimensionPKResult.avgScore.toFixed(2)||0,
        };
        const childrien=item.dimensionPKResult.childNode || [];
        childrien.map((val) => {
          if (val.dimensionName==='正面均分'){
            positive.push(val)
          }else{
            negative.push(val);
          }
          return 0;
        })
        scoreDate.push(scoreDateItem);
        return 0;
      });
    }
    return { positive, negative, scoreDate };
  };

  render() {
    const { paramsObj } = this.state;
    const { dataList = [] } = this.props.scorePK;
    const itemList = this.dataStruct(dataList);
    const scoreDate3 = [
      {
        avgScore: 83.44,
        childNode: [
          {
            id: 3,
            parentId: 2,
            dimensionName: '学术均分',
            avgScore: 4.9638422704325285,
            childNode: [
              {
                id: 32,
                parentId: 3,
                dimensionName: '预估分',
                avgScore: 4.3,
                childNode: null,
              },
              {
                id: 4,
                parentId: 3,
                dimensionName: '直播',
                avgScore: 0.2,
                childNode: null,
              },
            ],
          },
          {
            id: 8,
            parentId: 2,
            dimensionName: '运营均分',
            avgScore: 0.3847728203029062,
            childNode: [
              {
                id: 33,
                parentId: 8,
                dimensionName: '主帖',
                avgScore: 0.23536635284486288,
                childNode: null,
              },
              {
                id: 34,
                parentId: 8,
                dimensionName: '跟帖',
                avgScore: 0.1391731477691363,
                childNode: null,
              },
              {
                id: 35,
                parentId: 8,
                dimensionName: '优质帖',
                avgScore: 0.010233319688907082,
                childNode: null,
              },
            ],
          },
        ],
      },
      {
        avgScore: 99.99,
        childNode: [
          {
            id: 3,
            parentId: 2,
            dimensionName: '学术均分',
            avgScore: 2.9638422704325285,
            childNode: [
              {
                id: 32,
                parentId: 3,
                dimensionName: '预估分',
                avgScore: 1.22,
                childNode: null,
              },
              {
                id: 4,
                parentId: 3,
                dimensionName: '直播',
                avgScore: 0,
                childNode: null,
              },
            ],
          },
          {
            id: 8,
            parentId: 2,
            dimensionName: '运营均分',
            avgScore: 1.3847728203029062,
            childNode: [
              {
                id: 33,
                parentId: 8,
                dimensionName: '主帖',
                avgScore: 0.23536635284486288,
                childNode: null,
              },
              {
                id: 34,
                parentId: 8,
                dimensionName: '跟帖',
                avgScore: 0.1391731477691363,
                childNode: null,
              },
              {
                id: 35,
                parentId: 8,
                dimensionName: '优质帖',
                avgScore: 0.010233319688907082,
                childNode: null,
              },
            ],
          },
        ],
      },
    ];
    return (
      <div>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <ScoreFile paramsObj={itemList.scoreDate} />
        <ScoreHeader paramsObj={itemList.positive} type={1} />
        <ScoreItem paramsObj={scoreDate3} />
        <ScoreHeader paramsObj={itemList.negative} type={2} />
        <ScoreItem paramsObj={scoreDate3} />
      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.Details,
}))(ReaultList);
