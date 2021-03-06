import React from 'react';
import { connect } from 'dva';
import { getItem } from '../../utils/localStorage';
import { assignUrlParams } from '../../utils/routerUtils';
import { dimensionAuthority, highLightData } from '../../utils/dimensionAuthority';
import Filter from './_filter';
import top from '../../assets/top.svg';
import search from '../../assets/search.svg';
import NoData from '../../components/NoData/NoData';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import CreditDialog from './_creditDialog';
import Loading from '../../components/Loading/Loading';
import { defaultDateTime } from '../../utils/FormatDate';
import styles from './Details.less';
import ScorePKDialog from '../../container/ScorePKDialog';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

let paramCom = {}; // 存储过滤器参数
let locationKey = null;
let isRequest = null;

class CreditDetails extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {}, Details } = props;
    const { routerHash } = urlParams;
    const { startTime, endTime } = defaultDateTime();

    isRequest = locationKey;
    locationKey = locationKey !== routerHash ? routerHash : locationKey;

    const initState = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        groupType: 1, // 1:学院，2:家族，3:小组
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: userInfo.userId,
      },
      modelflag: false,
      groupData: Details.sortData || {},
      isShowDetail: false,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.onScroll);

    // 防止重复调用接口
    const { routerHash } = this.props.urlParams;
    if (isRequest !== routerHash) {
      const { paramsObj } = this.state;
      this.fnGetData(paramsObj);
    }
  }
  UNSAFE_componentWillReceiveProps(nexprops) {
    if (nexprops.Details.paramsObj && this.props.Details.paramsObj) {
      const { paramsObj } = this.props.Details;
      const nextParamsObj = nexprops.Details.paramsObj;
      paramCom = {
        paramsObj,
        nextParamsObj,
      };
    }
    if (JSON.stringify(nexprops.Details.sortData) !== JSON.stringify(this.props.Details.sortData)) {
      this.setState({
        groupData: nexprops.Details.sortData,
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    const backTop = document.getElementById('backTopBtn'); // 返回顶部模块
    if (backTop !== null) {
      backTop.style.display = t >= 200 ? 'block' : 'none';
    }
  };
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
    this.showModel(true);
    const { dataList } = this.props.Details;
    this.props.dispatch({
      type: 'Details/pinyinComparator',
      payload: { dataListObj: dataList, groupType: this.state.paramsObj.groupType },
    });
  };
  showModel(v) {
    // 判断模态框显隐
    this.setState({
      modelflag: v,
    });
  }
  saveIds = checkIds => {
    this.props.dispatch({
      type: 'Details/saveData',
      payload: { checkIds, dataList: this.props.Details.dataList },
    });
  };
  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj } = sendParams;
    this.setState({ paramsObj });
    this.props.setCurrentUrlParams(paramsObj);
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
    const { paramsObj, modelflag, groupData } = this.state;
    const { isloading, Details = {}, isSorting } = this.props;
    const { dataList } = Details;
    const params = {
      0: { groupName: 'selfExam', arr: 'activeCS' },
      1: { groupName: 'barrier', arr: 'activeCS' },
      2: { groupName: 'incubator', arr: 'activeCS' },
    };
    const headerParam = {
      groupType: paramsObj.groupType,
      loadComponent: 'credit',
    };
    return (
      <div className={styles.normal}>
        {/* *************** Filter *************** */}
        <Filter
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />

        {/* *************** listview *************** */}
        {isloading ? null : dataList !== null ? (
          <div>
            {Object.keys(params).map(item => {
              const newDataList = Object.keys(dataList).filter(
                obj => obj === params[item].groupName
              );

              return (
                newDataList.length > 0 && (
                  <MultipHeaderList
                    paramCom={paramCom}
                    key={item}
                    groupName={params[item].groupName}
                    dataList={dataList}
                    headerParam={headerParam}
                    jump2Data={(data1, data2, data3, data4) => {
                      this.jump2Data(data1, data2, data3, data4);
                    }}
                    saveIds={arr => this.saveIds(arr)}
                    style={{ background: '#fff', paddingBottom: '1px' }}
                  />
                )
              );
            })}
          </div>
        ) : (
          <NoData showflag />
        )}

        {/* *************** 搜索模态框 *************** */}
        {isSorting ? null : (
          <CreditDialog
            listData={groupData}
            tabkey={paramsObj.groupType}
            dataList={dataList}
            modelflag={modelflag}
            showModel={v => {
              this.showModel(v);
            }}
          />
        )}

        {/*
        * *fix 小button浮动框区域
        * 按顺序放置，内部按正常盒子模型处理，统一margin-bottom:0.1rem
        * */}
        <div className="fixBox">
          {/* 学分px区域 */}
          <ScorePKDialog {...this.props} />
          {/* *************** 回到顶部 *************** */}
          <div
            className={`${styles.floatIcon} ${styles.goTopCls}`}
            onClick={() => {
              window.scrollTo(0, 0);
              // const currentY = document.documentElement.scrollTop || document.body.scrollTop;
              // scroll(currentY, 0);
            }}
            id="backTopBtn"
          >
            <img src={top} className={styles.imgTop} alt="回到顶部" />
          </div>

          {/* *************** 搜索按钮 *************** */}
          <div
            className={`${styles.floatIcon} ${styles.searchCls}`}
            onClick={() => {
              this.searchFn();
            }}
          >
            <img src={search} className={styles.imgSearch} alt="搜索" />
          </div>
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
  isSorting: loading.effects['Details/pinyinComparator'],
}))(CreditDetails);
