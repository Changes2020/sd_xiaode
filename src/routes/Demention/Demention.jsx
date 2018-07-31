import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
// import { assignUrlParams } from 'utils/routerUtils';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import CustomRenderHeader from '../../components/TableItem/TableHeader';
import CustomRenderItem from '../../components/TableItem/TableItem';
import styles from './Demention.less';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import SelfTab from '../../components/SelfTab/SelfTab';
import { formatDate } from '../../utils/FormatDate';
import homepng from '../../assets/home.png';

const data = { data: [{ id: 2, title: '正面得分' }, { id: 10, title: '负面得分' }] };

// 头部容器
const headerDom = (obj = null, clickTab = null) => (
  <div className={styles.headerContainer} style={{ display: 'block' }}>
    <div className={styles.headerText}>
      <p className={styles.dateArea}>{obj.dateArea}</p>
      <p className={styles.headerTitle}>
        {obj.topName} - {obj.titleName}
      </p>
    </div>
    <div>
      <Link to="/home">
        <img className={styles.iconBtn} src={homepng} alt="homeimg" />
      </Link>
    </div>
    <div className={styles.tabBox}>
      <SelfTab
        dataSource={data}
        firstId={obj.type}
        callBackFun={(item, index) => {
          clickTab(item, index);
        }}
      />
    </div>
  </div>
);

class Demention extends React.Component {
  constructor(props) {
    super(props);
    // const { urlParams = {} } = props;
    // const initState = {
    //   paramsObj: {
    //     startTime: null, // 过滤开始时间
    //     endTime: null, // 过滤结束时间
    //     creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
    //     groupType: 1, // 1:学院，2:家族，3:小组
    //     rankType: 3, // 1:集团，2:院内，3:null
    //     dateType: 3, // 1:周均,2:月均,3:自定义
    //     filteKeyID: null, // 登录用户id
    //     userId: null,
    //   },
    //
    //   dementionId: 4,
    //   type: 2,
    // };
    // this.state = assignUrlParams(initState, urlParams);
    const startTime = 1532880000000;
    const endTime = 1532966399999;
    const groupType = 2;
    const familyType = 1;
    const topName1 = groupType === 1 ? '学院' : groupType === 2 ? '家族' : '小组';
    const topName2 = familyType === 0 ? '自考' : familyType === 1 ? '壁垒' : '孵化器';
    const formatStratTime = formatDate(startTime);
    const formatEndTime = formatDate(endTime);
    this.state = {
      startTime,
      endTime,
      dateArea: `${formatStratTime} ～ ${formatEndTime}`, // 根据用户选择时间区间显示到页头
      groupName: '学术均分', // 从上个页面获取
      type: 2, // 正面得分为2,负面的分为10，从上个页面获取的本页面初始值
      groupId: 220,
      groupType, // 1学院 2 家族 3 小组
      familyType, // 0 自考 1 壁垒 2 孵化器
      topName1,
      topName: `${topName1} (${topName2})`,
      dataToMD: `${formatStratTime} ～ ${formatEndTime}`,
      dementionId: 32,
      titleName: '人资证1',
      buttonName: '预估分',
      switchtype: 1, // 趋势图和详情数据的切换
    };
    console.log(this.state);
  }
  componentDidMount() {}

  // 点击button触发的请求chart和table接口函数
  fnClickGroupButton(item) {
    const dementionId = item.id;
    this.setState({
      dementionId,
    });
  }

  // 造数据
  dataFn = () => {
    const rowdata = [];
    [1, 2, 3, 4, 5, 6, 7].forEach(i => {
      rowdata.push({
        key: i,
        id: i,
        titleOne: '2018-07-31',
        titleTwo: '312313',
        titleThree: '50',
        titleFour: '哈哈镜',
      });
    });
    return rowdata;
  };
  // tab点击切换
  fnCLickTab(val = null) {
    // console.log('自己写的tab组件回调',val)
    if (val.id !== this.state.type) {
      this.setState({
        type: val.id,
      });
    }
  }

  // 点击吸顶栏 返回顶部
  backToTop = () => {
    const dataToTop = document.getElementById('dataToTop');
    window.scrollTo(0, document.getElementById('selfDataCenter').offsetTop);
    dataToTop.style.display = 'none';
  };

  render() {
    // const { paramsObj } = this.state;
    const dataList = this.dataFn();
    const dataSource = {
      data: [
        { name: '直播', id: 4, rawDataDes: '直播（小时）' },
        { name: '预估分', id: 32, rawDataDes: '预估分' },
        { name: '主帖', id: 33, rawDataDes: '主帖' },
        { name: '跟帖', id: 34, rawDataDes: '跟帖' },
        { name: '优质帖', id: 35, rawDataDes: '优质帖' },
      ],
    };

    return (
      <div className={styles.normal} id="selfDataCenter">
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
        {headerDom(this.state, this.fnCLickTab.bind(this))}
        <div className={styles.btnContainer}>
          <ButtonGroup
            dataSource={dataSource}
            dataReturnFun={(item, index) => {
              this.fnClickGroupButton(item, index);
            }}
            id={this.state.dementionId}
            isSelectFirst
            // spanFunction={(item, num) => this.spanFun(item, num)}
            btnClass={styles.btnStyle}
            btnSelectedClass={styles.btnSelected}
          />
        </div>

        {/* tableList */}
        <MultipHeaderList
          dataList={dataList}
          customRenderHeader={() => <CustomRenderHeader />}
          customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
        />
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Demention);
