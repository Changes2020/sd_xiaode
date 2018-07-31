import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { assignUrlParams } from '../../utils/routerUtils';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';

class Assistant extends React.Component {
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
  jump2Data = rowData => {
    // 跳转至数据详情页
    console.log(rowData);
  };
  render() {
    const { paramsObj } = this.state;
    const dataList = {
      collegeselfExam: [
        {
          groupTotal: 6,
          type: 0,
          firstScore: 10.659200523385593,
          score: 13.659200523385593,
          group: 18.659200523385593,
          project: '学分均分',
          rank: 1,
          id: 112,
          category: '睿博',
          firstName: '睿博',
          isCheck: true,
          arrowShow: true,
          children: [
            {
              positive: 33,
              negative: 1,
            },
            {
              positive: 2,
              negative: 88,
            },
          ],
        },
        {
          groupTotal: 6,
          type: 0,
          firstScore: 8.654441238923857,
          project: '学分均分',
          rank: 2,
          id: 108,
          category: '泰罗',
          firstName: '泰罗',
          children: [
            {
              positive: 2,
              negative: 1,
            },
            {
              positive: 222,
              negative: 111,
            },
          ],
        },
        {
          groupTotal: 6,
          type: 0,
          firstScore: 8.25492429991654,
          project: '学分均分',
          rank: 3,
          id: 103,
          category: '狐逻',
        },
        {
          groupTotal: 6,
          type: 0,
          firstScore: 8.137644462684506,
          project: '学分均分',
          rank: 4,
          id: 100,
          category: '自变量',
        },
        {
          groupTotal: 6,
          type: 0,
          firstScore: 7.801447737521375,
          project: '学分均分',
          rank: 5,
          id: 104,
          category: '芝士',
        },
        {
          groupTotal: 6,
          type: 0,
          firstScore: 4.49985282297273,
          project: '学分均分',
          rank: 6,
          id: 118,
          category: '派学院',
        },
      ],
      collegebarrier: [
        {
          groupTotal: 4,
          type: 1,
          firstScore: 14.71097737789142,
          project: '学分均分',
          rank: 1,
          id: 111,
          category: '皓博',
        },
        {
          groupTotal: 4,
          type: 1,
          firstScore: 9.068389128450464,
          project: '学分均分',
          rank: 2,
          id: 108,
          category: '泰罗',
        },
        {
          groupTotal: 4,
          type: 1,
          firstScore: 7.653003814707551,
          project: '学分均分',
          rank: 3,
          id: 103,
          category: '狐逻',
        },
        {
          groupTotal: 4,
          type: 1,
          firstScore: 0.8297508238418185,
          project: '学分均分',
          rank: 4,
          id: 118,
          category: '派学院',
        },
      ],
    };

    const params = {
      0: { groupName: 'collegeselfExam', arr: 'activeCS' },
      1: { groupName: 'collegebarrier', arr: 'activeCS' },
    };
    const headerParam = {
      tabKey: paramsObj.tabKey,
      loadComponent: 'assistant',
      jump2Data: this.jump2Data,
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
                    headerParam={headerParam}
                    style={{ background: '#fff', paddingBottom: '.4rem' }}
                  />
                )
              );
            })}
          </div>
        ) : null}

        <div style={{ marginTop: '50px' }}>
          <Button onClick={this.toDementionPage}>点击跳转至低表页面</Button>
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Assistant);
