import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { assignUrlParams } from 'utils/routerUtils';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';

class Details extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
        endTime: null, // 过滤结束时间
        tabKey: 1, // 1:学院，2:家族，3:小组
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: null,
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {}
  toDementionPage = () => {
    const { dateType, startTime, endTime } = this.state.paramsObj;
    this.props.setRouteUrlParams('/demention', {
      dateType,
      startTime,
      endTime,
    });
  };

  render() {
    // const { paramsObj } = this.state;
    // dataList, groupName, tabKey, initialListSize, secDataGetFn, otherCpmponent, listColumn
    const dataList = {
      selfExam: [
        {
          total: 6,
          familyType: 0,
          creditScore: 10.659200523385593,
          project: '学分均分',
          rank: 1,
          id: 112,
          category: '睿博',
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 8.654441238923857,
          project: '学分均分',
          rank: 2,
          id: 108,
          category: '泰罗',
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 8.25492429991654,
          project: '学分均分',
          rank: 3,
          id: 103,
          category: '狐逻',
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 8.137644462684506,
          project: '学分均分',
          rank: 4,
          id: 100,
          category: '自变量',
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 7.801447737521375,
          project: '学分均分',
          rank: 5,
          id: 104,
          category: '芝士',
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 4.49985282297273,
          project: '学分均分',
          rank: 6,
          id: 118,
          category: '派学院',
        },
      ],
      barrier: [
        {
          total: 4,
          familyType: 1,
          creditScore: 14.71097737789142,
          project: '学分均分',
          rank: 1,
          id: 111,
          category: '皓博',
        },
        {
          total: 4,
          familyType: 1,
          creditScore: 9.068389128450464,
          project: '学分均分',
          rank: 2,
          id: 108,
          category: '泰罗',
        },
        {
          total: 4,
          familyType: 1,
          creditScore: 7.653003814707551,
          project: '学分均分',
          rank: 3,
          id: 103,
          category: '狐逻',
        },
        {
          total: 4,
          familyType: 1,
          creditScore: 0.8297508238418185,
          project: '学分均分',
          rank: 4,
          id: 118,
          category: '派学院',
        },
      ],
    };

    const params = {
      0: { groupName: 'selfExam', arr: 'activeCS' },
      1: { groupName: 'barrier', arr: 'activeCS' },
    };

    return (
      <div>
        {/*
         *************** listview ***************
         * */}
        {dataList !== null ? (
          <div>
            {Object.keys(params).map(item => {
              const newDataList = Object.keys(dataList).filter(
                obj => obj === params[item].groupName
              );

              return (
                newDataList.length > 0 && (
                  <MultipHeaderList
                    key={item}
                    groupName={params[item].groupName}
                    dataList={dataList}
                    tabKey={1}
                    initialListSize={500}
                  />
                )
              );
            })}
          </div>
        ) : null}

        <div style={{ marginTop: '50px' }}>
          <Button onClick={this.toDementionPage}>点击跳转至低表页面</Button>
        </div>

        {/* <Loading/>  */}
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Details);
