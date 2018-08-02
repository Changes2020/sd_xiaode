import React from 'react';
import { connect } from 'dva';
import { getItem } from '../../utils/localStorage';
import { assignUrlParams } from '../../utils/routerUtils';
import { dimensionAuthority, highLightData } from '../../utils/dimensionAuthority';
import Filter from './_filter';
import top from '../../assets/top.svg';
import search from '../../assets/search.svg';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import Loading from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/index';
import { defaultDateTime } from '../../utils/FormatDate';
import styles from './Details.less';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

class CreditDetails extends React.Component {
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
      visible: false,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    window.onscroll = function() {
      const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
      const backTop = document.getElementById('backTopBtn'); // 返回顶部模块
      if (backTop !== null) {
        backTop.style.display = t >= 200 ? 'block' : 'none';
      }
    };

    const { paramsObj } = this.state;
    this.fnGetData(paramsObj);
  }

  fnGetData = (ops = {}) => {
    const { paramsObj } = this.state;

    // 获取权限用户数据
    const { groupId, groupType } = userInfo;

    const dataOrg = dimensionAuthority(allOrgMap, groupId, groupType); // 获取授权数据
    const lineHeight = highLightData(allOrgMap, groupId, groupType); // 获取高亮数据
    const sendParams = {
      paramsObj: assignUrlParams(paramsObj, ops),
      allOrgMap,
      dateType: paramsObj.dateType,
      dataOrg,
      lineHeight,
    };

    // 掉接口
    this.props.dispatch({
      type: 'Details/fetch',
      payload: sendParams,
    });
    this.saveParams(sendParams);
  };
  searchFn = () => {
    this.setState({
      visible: true,
    });
  };
  toggleClick = (data, show) => {
    this.props.dispatch({
      type: 'Details/saveIsCheck',
      payload: { isCheck: show, data },
    });
  };
  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj } = sendParams;
    this.setState({ paramsObj });
  };
  jump2Data = (rowData, data, data1, data2) => {
    if (rowData.arrowShow) {
      const { startTime, endTime, groupType } = this.state.paramsObj;
      const { familyType, id, name } = rowData;
      this.props.setRouteUrlParams('/demention', {
        groupType,
        startTime,
        endTime,
        familyType, // 0:自考，1:壁垒，2:孵化器
        titleName: name, // 学院名字
        groupId: id, // 学院id
        groupName: '学分均分',
        type: data.id, //
        dementionId: data2.id, //
        buttonName: data2.name, // 直播名字
      });
    } else {
      console.warn('无权限查看');
    }
  };
  render() {
    const { paramsObj, visible } = this.state;
    const { isloading, Details = {} } = this.props;
    const { dataList } = Details;

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
        <Filter
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />

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
                    jump2Data={(data1, data2, data3, data4) => {
                      this.jump2Data(data1, data2, data3, data4);
                    }}
                    toggleClick={(data, show) => this.toggleClick(data, show)}
                    style={{ background: '#fff', paddingBottom: '.4rem' }}
                  />
                )
              );
            })}
          </div>
        ) : null}
        {/* *************** 回到顶部 *************** */}
        <div
          className={`${styles.floatIcon} ${styles.goTopCls}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          id="backTopBtn"
        >
          <img src={top} alt="" />
        </div>

        {/* *************** 搜索按钮 *************** */}
        <div
          className={`${styles.floatIcon} ${styles.searchCls}`}
          onClick={() => {
            this.searchFn();
          }}
        >
          <img src={search} alt="" />
        </div>

        {/* *************** 搜索模态框 *************** */}
        <Dialog visible={visible} />

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
