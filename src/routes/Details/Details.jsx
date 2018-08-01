import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { assignUrlParams } from '../../utils/routerUtils';
import Filter from './_filter';
import Loading from '../../components/Loading/Loading';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';

class CreditDetails extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
        endTime: null, // 过滤结束时间
        groupType: 1, // 1:学院，2:家族，3:小组
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: null,
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { paramsObj } = this.state;
    this.fnGetData(paramsObj);
  }
  fnGetData = (ops = {}) => {
    const { paramsObj } = this.state;
    const sendParams = {
      paramsObj: assignUrlParams(paramsObj, ops),
    };
    console.log(sendParams);
    // 掉接口
    this.props.dispatch({
      type: 'Details/fetch',
      payload: sendParams,
    });
    this.saveParams(sendParams);
  };
  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj } = sendParams;
    this.setState({ paramsObj });
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
    const { isloading, Details = {} } = this.props;
    const { dataList } = Details;
    console.log(dataList);
    const params = {
      0: { groupName: 'selfExam', arr: 'activeCS' },
      1: { groupName: 'barrier', arr: 'activeCS' },
    };
    const headerParam = {
      groupType: paramsObj.groupType,
      loadComponent: 'credit',
    };
    return (
      <div>
        {/* *************** Filter *************** */}
        <Filter paramsObj={paramsObj} fnGetData={obj => this.fnGetData(obj)} />

        {/* *************** listview *************** */}
        {dataList ? (
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
                    jump2Data={data => this.jump2Data(data)}
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
        {/* 处理loading */}
        {isloading && <Loading />}
      </div>
    );
  }
}
export default connect(({ Details, loading }) => ({
  Details,
  isloading: loading.models.Details,
}))(CreditDetails);
