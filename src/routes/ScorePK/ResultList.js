import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import ScoreItem from './_scoreItem';
import ScoreHeader from './_scoreHeader';
import { dimensionAuthority } from '../../utils/dimensionAuthority';
import { getItem } from '../../utils/localStorage';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

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

    // 获取权限用户数据
    const { groupId, groupType } = userInfo;
    const dataOrg = dimensionAuthority(allOrgMap, groupId, groupType); // 获取授权数据
    const sendParams = {
      paramsObj: {
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
      },
      dataOrg,
    };

    // 掉接口;
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: sendParams,
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

  render() {
    const { paramsObj } = this.state;
    const { dataList = [] } = this.props.scorePK;
    const itemList = this.dataStruct(dataList);
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
        <ScoreItem paramsObj={itemList.positive} />
        <ScoreHeader paramsObj={itemList.negative} type={2} />
        <ScoreItem paramsObj={itemList.negative} />
      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.Details,
}))(ReaultList);
