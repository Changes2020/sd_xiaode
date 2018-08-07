import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import CustomRenderHeader from '../../components/TableItem/TableHeader';
import CustomRenderItem from '../../components/TableItem/TableItem';
import styles from './Demention.less';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import SelfTab from '../../components/SelfTab/SelfTab';
import { formatDate } from '../../utils/FormatDate';
import { scroll } from '../../utils/scroll';
import homepng from '../../assets/home.png';
import NoData from '../../components/NoData/NoData.js';
import Loading from '../../components/Loading/Loading';
import ChartFilter from './_chartFilter';

const scoreTab = { data: [{ id: 2, title: '正面得分' }, { id: 10, title: '负面得分' }] };
const detailTab = { data: [{ id: 1, title: '详情数据' }, { id: 2, title: '趋势图' }] };

// 头部容器
const headerDom = (obj = null, clickTab = null, homeFun = null) => (
  <div className={styles.headerContainer} style={{ display: 'block' }}>
    <div className={styles.headerText}>
      <p className={styles.dateArea}>{obj.dateArea}</p>
      <p className={styles.headerTitle}>
        {obj.topName} - {obj.titleName}
      </p>
    </div>
    <div>
      <div
        onClick={() => {
          homeFun();
        }}
      >
        <img className={styles.iconBtn} src={homepng} alt="homeimg" />
      </div>
    </div>
    <div className={styles.tabBox}>
      <SelfTab
        dataSource={scoreTab}
        firstId={obj.type}
        callBackFun={item => {
          clickTab(item);
        }}
      />
    </div>
  </div>
);

// 切换趋势图和详情
const tabContainer = (obj = null, clickTab = null) => (
  <div className={styles.tabContainer} style={{ display: 'block' }}>
    <div className={styles.switchTabBox}>
      <SelfTab
        dataSource={detailTab}
        firstId={obj.switchtype}
        callBackFun={item => {
          clickTab(item.id);
        }}
        commonClass={styles.switchTabBtn}
        tabClass={styles.switchSectedBtn}
      />
    </div>
  </div>
);

class Demention extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const {
      startTime = 1531756800000,
      endTime = 1531843199999,
      groupId = 111,
      groupType = 1,
      familyType = 1,
      groupName = '',
      type = 1,
      dementionId = 33,
      titleName = '',
      buttonName = '',
    } = urlParams;
    const topName1 = Number(groupType) === 1 ? '学院' : Number(groupType) === 2 ? '家族' : '小组';
    const topName2 = Number(familyType) === 0 ? '自考' : Number(familyType) === 1 ? '壁垒' : '孵化器';
    const formatStratTime = formatDate(startTime);
    const formatEndTime = formatDate(endTime);
    const initState = {
      startTime,
      endTime,
      dateArea: `${formatStratTime} ～ ${formatEndTime}`, // 根据用户选择时间区间显示到页头
      groupName, // 从上个页面获取
      type: Number(type), // 正面得分为2,负面的分为10，从上个页面获取的本页面初始值
      groupId: Number(groupId),
      groupType: Number(groupType), // 1学院 2 家族 3 小组
      familyType: Number(familyType), // 0 自考 1 壁垒 2 孵化器
      topName1,
      topName: `${topName1} (${topName2})`,
      dataToMD: `${formatStratTime.substring(5)} ～ ${formatEndTime.substring(5)}`,
      dementionId: Number(dementionId),
      titleName,
      buttonName,
      switchtype: 1, // 趋势图和详情数据的切换
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const dementionListParams = { type: this.state.type };
    const { dementionId } = this.state;
    const { switchtype } = this.state;
    const Params = {
      groupType: this.state.groupType,
      familyType: this.state.familyType,
      filteKeyID: this.state.groupId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    };
    this.dataFetch(dementionListParams, dementionId, switchtype, Params);
    window.onscroll = function() {
      const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
      const backTop = document.getElementById('dataToTop'); // 吸顶模块
      if (backTop !== null) {
        backTop.style.display = t >= 118 ? 'block' : 'none';
      }
    };
  }

  componentWillReceiveProps() {
    scroll(0, 0);
  }
  // 点击home图片返回首页
  homeFun = () => {
    this.props.setRouteUrlParams('/indexPage', {});
  };

  // 正负面tab点击切换
  fnCLickTab = (val = null) => {
    if (val.id !== this.state.type) {
      const dementionListParams = { type: val.id };
      const dementionId = null;
      const { switchtype } = this.state;
      const Params = {
        groupType: this.state.groupType,
        familyType: this.state.familyType,
        filteKeyID: this.state.groupId,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      this.dataFetch(dementionListParams, dementionId, switchtype, Params);
      this.setState({
        type: val.id,
        buttonName: val.id === 2 ? '直播' : '开班电话',
      });
    }
  };

  // 详情趋势图tab点击切换
  detailCLickTab = (id = null) => {
    if (id !== this.state.switchtype) {
      const { dementionId } = this.props.demention;
      const Params = {
        groupType: this.state.groupType,
        familyType: this.state.familyType,
        filteKeyID: this.state.groupId,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      if (id === 1) {
        this.dataTable(dementionId, Params);
      } else {
        this.dataChart(dementionId, Params);
      }
      this.setState({
        switchtype: id,
      });
    }
  };

  // 请求model中的fetch方法
  dataFetch(dementionListParams, dementionId, switchtype, Params) {
    const sendParams = {
      dementionId,
      switchtype,
      Params,
      dementionListParams: { ...this.props.demention.dementionListParams, ...dementionListParams },
    };
    this.props.dispatch({
      type: 'demention/fetch',
      payload: sendParams,
    });
  }

  // 请求model中的table方法
  dataTable(dementionId, param) {
    const sendParams = {
      detailListParams: { ...this.props.demention.detailListParams, ...param },
      dementionId,
    };
    this.props.dispatch({
      type: 'demention/table',
      payload: sendParams,
    });
  }

  // 请求model中的chart方法
  dataChart(dementionId, param) {
    const sendParams = {
      TrendParams: { ...this.props.demention.TrendParams, ...param },
      dementionId,
    };
    this.props.dispatch({
      type: 'demention/chart',
      payload: sendParams,
    });
  }

  // 点击button触发的请求chart和table接口函数
  fnClickGroupButton(item) {
    const dementionId = item.id;
    const buttonName = item.name;
    const { switchtype } = this.state;
    if (item.id !== this.props.demention.dementionId) {
      const Params = {
        groupType: this.state.groupType,
        familyType: this.state.familyType,
        filteKeyID: this.state.groupId,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      if (switchtype === 1) {
        this.dataTable(dementionId, Params);
      } else {
        this.dataChart(dementionId, Params);
      }
    }
    this.setState({
      dementionId,
      buttonName,
    });
  }

  // 格式处理详情数据展示长度
  formatTableDatda = val => {
    return String(val).length > 10
      ? `${String(val).substr(0, 10)}...`
      : !isNaN(Number(val * 100 / 100)) ? val * 100 / 100 : val;
  };

  // 遍历接口返回数据获取table的行数据
  tableListFun = v => {
    const data = [];
    if (v.data !== null) {
      const data100 = v.data.slice(0, 100);
      data100.map((item, index) => {
        const rowdata = {
          key: index,
          id: index + 1,
          titleOne: this.formatTableDatda(item.valOne),
          titleTwo: this.formatTableDatda(item.valTwo),
          titleThree: this.formatTableDatda(item.valThree),
          titleFour: this.formatTableDatda(item.valFour),
        };
        data.push(rowdata);
        return 0;
      });
    }
    return data;
  };

  // 点击吸顶栏 返回顶部
  backToTop = () => {
    const dataToTop = document.getElementById('dataToTop');
    scroll(0, document.getElementById('selfDataCenter').offsetTop);
    dataToTop.style.display = 'none';
  };

  render() {
    const { isloading } = this.props;
    const { dementionListData, detailListData, trendData } = this.props.demention;
    // button组件数据处理
    const buttonData = dementionListData
      ? dementionListData.data ? dementionListData.data : []
      : [];
    const buttonList = { data: buttonData };
    // 详情数据组件table数据处理
    const tableList = detailListData
      ? !detailListData.data ? null : this.tableListFun(detailListData.data)
      : null;
    const columnsData = detailListData ? (detailListData.data ? detailListData.data : []) : [];
    const listNum = !detailListData ? 0 : !detailListData.data ? 0 : detailListData.data.total;
    return (
      <div className={styles.normal} id="selfDataCenter">
        {/* 页面吸顶元素 */}
        <div
          className={styles.topContent}
          id="dataToTop"
          onClick={() => {
            this.backToTop();
          }}
        >
          {this.state.dataToMD} | {this.state.topName1} | {this.state.titleName} |{' '}
          {this.state.buttonName}
        </div>
        {/* 页面header展示 */}
        {headerDom(this.state, this.fnCLickTab.bind(this), this.homeFun.bind(this))}
        {isloading && <Loading />}
        {/* button组件展示 */}
        {!dementionListData ? (
          <NoData showflag />
        ) : (
          <div className={styles.btnContainer}>
            <ButtonGroup
              dataSource={buttonList}
              dataReturnFun={item => {
                this.fnClickGroupButton(item);
              }}
              id={this.props.demention.dementionId}
              isSelectFirst
              btnClass={styles.btnStyle}
              btnSelectedClass={styles.btnSelected}
            />
          </div>
        )}
        {/* 详情数据和趋势图tab切换导航 */}
        {!tableList ? null:tabContainer(this.state, this.detailCLickTab.bind(this))}
        {/* 详情数据和趋势图组件 */}
        {!tableList ? null:this.state.switchtype === 1 ? (
          <div className={styles.tableDiv}>
            {!tableList || tableList.length === 0 ? (
              <NoData showflag />
            ) : (
              <div>
                <p className={styles.tableTitle}>
                  <span style={{paddingLeft: '0.24rem'}}>{this.state.buttonName}详情数据</span>
                </p>
                <MultipHeaderList
                  dataList={tableList}
                  customRenderHeader={() => <CustomRenderHeader columnsData={columnsData} />}
                  customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
                />
                <div className={styles.divheight} />
              </div>
            )}
          </div>
        ) : !trendData ? (
          <NoData showflag />
        ) : (
          <div  style={{marginLeft:'0.2rem',width:'7.1rem',background:'#fff'}}>
            <ChartFilter
              buttonData={buttonData}
              trendData={trendData}
              dementionId={this.props.demention.dementionId}
            />
          </div>
        )}
        {/* 详情数据条数超过100的温馨提示 */}
        {this.state.switchtype === 1 ? (
          <div className={`${listNum > 99 ? styles.warmtoast : styles.warmtoastnone}`}>
            <div className={styles.warmtoasttitle}>*温馨提示</div>
            <div className={styles.warmtoastcontent}>
              由于数据过多，仅展示前100条数据。如需查看更多详情，可到首页下载底表查看（限10天内底表）
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(({ demention, loading }) => ({
  demention,
  isloading: loading.models.demention,
}))(Demention);
