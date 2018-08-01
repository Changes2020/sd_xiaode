import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { assignUrlParams } from 'utils/routerUtils';
import Filter from './_filter';
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
  fnGetData = (ops = {}) => {
    console.log(ops);
  };
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
      selfExam: [
        {
          total: 6,
          familyType: 0,
          creditScore: 10.659200523385593,
          project: '学分均分',
          rank: 1,
          id: 112,
          category: '睿博',
          isCheck: true,
          arrowShow: true,
          children: {
            id: 1,
            parentid: 0,
            project: '学分均分',
            number: 1,
            creditScore: 10.67,
            unit: '',
            data: [
              {
                id: 2,
                parentid: 1,
                project: '正面均分',
                number: 0,
                creditScore: 14.36,
                unit: '',
                data: [
                  {
                    id: 3,
                    parentid: 2,
                    project: '学术均分',
                    number: 0,
                    creditScore: 13.97,
                    unit: '',
                    data: [
                      {
                        id: 32,
                        parentid: 3,
                        project: '预估分',
                        number: 74897,
                        creditScore: 10.84,
                        unit: '分',
                        data: null,
                        chain: 51.4,
                      },
                      {
                        id: 4,
                        parentid: 3,
                        project: '直播',
                        number: 16153.86,
                        creditScore: 3.13,
                        unit: '小时',
                        data: null,
                        chain: -4.57,
                      },
                    ],
                    chain: 33.94,
                  },
                  {
                    id: 8,
                    parentid: 2,
                    project: '运营均分',
                    number: 0,
                    creditScore: 0.39,
                    unit: '',
                    data: [
                      {
                        id: 33,
                        parentid: 8,
                        project: '主帖',
                        number: 2314,
                        creditScore: 0.25,
                        unit: '个',
                        data: null,
                        chain: 13.64,
                      },
                      {
                        id: 34,
                        parentid: 8,
                        project: '跟帖',
                        number: 1410,
                        creditScore: 0.1,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                      {
                        id: 35,
                        parentid: 8,
                        project: '优质帖',
                        number: 46,
                        creditScore: 0.03,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: 11.43,
                  },
                ],
                chain: 33.21,
              },
              {
                id: 10,
                parentid: 1,
                project: '负面均分',
                number: 0,
                creditScore: -3.69,
                unit: '',
                data: [
                  {
                    id: 19,
                    parentid: 10,
                    project: '工单减分',
                    number: 0,
                    creditScore: -0.18,
                    unit: '',
                    data: [
                      {
                        id: 20,
                        parentid: 19,
                        project: '工单初次减分',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 100,
                      },
                      {
                        id: 21,
                        parentid: 19,
                        project: '工单二次减分',
                        number: 2,
                        creditScore: -0.18,
                        unit: '个',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 22,
                        parentid: 19,
                        project: '工单三次减分',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: -20,
                  },
                  {
                    id: 23,
                    parentid: 10,
                    project: '底线减分',
                    number: 0,
                    creditScore: -2.11,
                    unit: '',
                    data: [
                      {
                        id: 24,
                        parentid: 23,
                        project: '事件',
                        number: 18,
                        creditScore: -0.13,
                        unit: '次',
                        data: null,
                        chain: -1200,
                      },
                      {
                        id: 25,
                        parentid: 23,
                        project: '班投',
                        number: 24,
                        creditScore: -0.17,
                        unit: '次',
                        data: null,
                        chain: -142.86,
                      },
                      {
                        id: 26,
                        parentid: 23,
                        project: '退费',
                        number: 106,
                        creditScore: -1.15,
                        unit: '次',
                        data: null,
                        chain: -51.32,
                      },
                      {
                        id: 27,
                        parentid: 23,
                        project: '投诉',
                        number: 90000,
                        creditScore: -0.65,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                    ],
                    chain: -154.22,
                  },
                  {
                    id: 11,
                    parentid: 10,
                    project: '优新减分',
                    number: 0,
                    creditScore: -0.53,
                    unit: '',
                    data: [
                      {
                        id: 12,
                        parentid: 11,
                        project: '开班电话',
                        number: 3,
                        creditScore: -0.53,
                        unit: '个',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 13,
                        parentid: 11,
                        project: '随堂考',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 100,
                      },
                    ],
                    chain: -82.76,
                  },
                  {
                    id: 28,
                    parentid: 10,
                    project: '质检减分',
                    number: 0,
                    creditScore: -0.38,
                    unit: '',
                    data: [
                      {
                        id: 29,
                        parentid: 28,
                        project: '一级质检',
                        number: 35000,
                        creditScore: -0.25,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 30,
                        parentid: 28,
                        project: '二级质检',
                        number: 15000,
                        creditScore: -0.11,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 31,
                        parentid: 28,
                        project: '三级质检',
                        number: 3000,
                        creditScore: -0.02,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                    ],
                    chain: null,
                  },
                  {
                    id: 14,
                    parentid: 10,
                    project: 'IM减分',
                    number: 0,
                    creditScore: -0.49,
                    unit: '',
                    data: [
                      {
                        id: 16,
                        parentid: 14,
                        project: '不满意会话',
                        number: 125,
                        creditScore: -0.38,
                        unit: '个',
                        data: null,
                        chain: -18.75,
                      },
                      {
                        id: 17,
                        parentid: 14,
                        project: '不及时消息',
                        number: 47,
                        creditScore: -0.07,
                        unit: '个',
                        data: null,
                        chain: -40,
                      },
                      {
                        id: 15,
                        parentid: 14,
                        project: '未回复会话',
                        number: 11,
                        creditScore: -0.03,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: -22.5,
                  },
                ],
                chain: -120.96,
              },
            ],
            chain: 17.12,
          },
        },
        {
          total: 6,
          familyType: 0,
          creditScore: 8.654441238923857,
          project: '学分均分',
          rank: 2,
          id: 108,
          category: '泰罗',
          children: {
            id: 1,
            parentid: 0,
            project: '学分均分1',
            number: 1,
            creditScore: 10.67,
            unit: '',
            data: [
              {
                id: 2,
                parentid: 1,
                project: '正面均分1',
                number: 0,
                creditScore: 14.36,
                unit: '',
                data: [
                  {
                    id: 3,
                    parentid: 2,
                    project: '学术均分1',
                    number: 0,
                    creditScore: 13.97,
                    unit: '',
                    data: [
                      {
                        id: 32,
                        parentid: 3,
                        project: '预估分1',
                        number: 74897,
                        creditScore: 10.84,
                        unit: '分',
                        data: null,
                        chain: 51.4,
                      },
                      {
                        id: 4,
                        parentid: 3,
                        project: '直播1',
                        number: 16153.86,
                        creditScore: 3.13,
                        unit: '小时',
                        data: null,
                        chain: -4.57,
                      },
                    ],
                    chain: 33.94,
                  },
                  {
                    id: 8,
                    parentid: 2,
                    project: '运营均分1',
                    number: 0,
                    creditScore: 0.39,
                    unit: '',
                    data: [
                      {
                        id: 33,
                        parentid: 8,
                        project: '主帖',
                        number: 2314,
                        creditScore: 0.25,
                        unit: '个',
                        data: null,
                        chain: 13.64,
                      },
                      {
                        id: 34,
                        parentid: 8,
                        project: '跟帖',
                        number: 1410,
                        creditScore: 0.1,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                      {
                        id: 35,
                        parentid: 8,
                        project: '优质帖',
                        number: 46,
                        creditScore: 0.03,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: 11.43,
                  },
                ],
                chain: 33.21,
              },
              {
                id: 10,
                parentid: 1,
                project: '负面均分',
                number: 0,
                creditScore: -3.69,
                unit: '',
                data: [
                  {
                    id: 19,
                    parentid: 10,
                    project: '工单减分',
                    number: 0,
                    creditScore: -0.18,
                    unit: '',
                    data: [
                      {
                        id: 20,
                        parentid: 19,
                        project: '工单初次减分',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 100,
                      },
                      {
                        id: 21,
                        parentid: 19,
                        project: '工单二次减分',
                        number: 2,
                        creditScore: -0.18,
                        unit: '个',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 22,
                        parentid: 19,
                        project: '工单三次减分',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: -20,
                  },
                  {
                    id: 23,
                    parentid: 10,
                    project: '底线减分',
                    number: 0,
                    creditScore: -2.11,
                    unit: '',
                    data: [
                      {
                        id: 24,
                        parentid: 23,
                        project: '事件',
                        number: 18,
                        creditScore: -0.13,
                        unit: '次',
                        data: null,
                        chain: -1200,
                      },
                      {
                        id: 25,
                        parentid: 23,
                        project: '班投',
                        number: 24,
                        creditScore: -0.17,
                        unit: '次',
                        data: null,
                        chain: -142.86,
                      },
                      {
                        id: 26,
                        parentid: 23,
                        project: '退费',
                        number: 106,
                        creditScore: -1.15,
                        unit: '次',
                        data: null,
                        chain: -51.32,
                      },
                      {
                        id: 27,
                        parentid: 23,
                        project: '投诉',
                        number: 90000,
                        creditScore: -0.65,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                    ],
                    chain: -154.22,
                  },
                  {
                    id: 11,
                    parentid: 10,
                    project: '优新减分',
                    number: 0,
                    creditScore: -0.53,
                    unit: '',
                    data: [
                      {
                        id: 12,
                        parentid: 11,
                        project: '开班电话',
                        number: 3,
                        creditScore: -0.53,
                        unit: '个',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 13,
                        parentid: 11,
                        project: '随堂考',
                        number: 0,
                        creditScore: 0,
                        unit: '个',
                        data: null,
                        chain: 100,
                      },
                    ],
                    chain: -82.76,
                  },
                  {
                    id: 28,
                    parentid: 10,
                    project: '质检减分',
                    number: 0,
                    creditScore: -0.38,
                    unit: '',
                    data: [
                      {
                        id: 29,
                        parentid: 28,
                        project: '一级质检',
                        number: 35000,
                        creditScore: -0.25,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 30,
                        parentid: 28,
                        project: '二级质检',
                        number: 15000,
                        creditScore: -0.11,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                      {
                        id: 31,
                        parentid: 28,
                        project: '三级质检',
                        number: 3000,
                        creditScore: -0.02,
                        unit: '分',
                        data: null,
                        chain: null,
                      },
                    ],
                    chain: null,
                  },
                  {
                    id: 14,
                    parentid: 10,
                    project: 'IM减分',
                    number: 0,
                    creditScore: -0.49,
                    unit: '',
                    data: [
                      {
                        id: 16,
                        parentid: 14,
                        project: '不满意会话',
                        number: 125,
                        creditScore: -0.38,
                        unit: '个',
                        data: null,
                        chain: -18.75,
                      },
                      {
                        id: 17,
                        parentid: 14,
                        project: '不及时消息',
                        number: 47,
                        creditScore: -0.07,
                        unit: '个',
                        data: null,
                        chain: -40,
                      },
                      {
                        id: 15,
                        parentid: 14,
                        project: '未回复会话',
                        number: 11,
                        creditScore: -0.03,
                        unit: '个',
                        data: null,
                        chain: 0,
                      },
                    ],
                    chain: -22.5,
                  },
                ],
                chain: -120.96,
              },
            ],
            chain: 17.12,
          },
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
    const headerParam = {
      tabKey: paramsObj.tabKey,
      loadComponent: 'credit',
      jump2Data: this.jump2Data,
    };
    return (
      <div>
        {/* *************** Filter *************** */}
        <Filter paramsObj={paramsObj} fnGetData={obj => this.fnGetData(obj)} />

        {/* *************** listview *************** */}
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
export default connect(({ loading }) => ({ loading }))(Details);
