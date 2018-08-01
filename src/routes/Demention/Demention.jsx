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

const scoreTab = { data: [{ id: 2, title: '正面得分' }, { id: 10, title: '负面得分' }] };
const detailTab = { data: [{ id: 1, title: '详情数据' }, { id: 2, title: '趋势图' }] };

// 头部容器
const headerDom = (obj = null, clickTab = null) => (
  <div className={styles.headerContainer} style={{ display: 'block' }}>
    <div className={styles.headerText}>
      <p className={styles.dateArea}>{obj.dateArea}</p>
      <p className={styles.headerTitle}>{obj.topName} - {obj.titleName}</p>
    </div>
    <div>
      <Link to="/home"><img className={styles.iconBtn} src={homepng} alt="homeimg" /></Link>
    </div>
    <div className={styles.tabBox}>
      <SelfTab
        dataSource={scoreTab}
        firstId={obj.type}
        callBackFun={(item)=>{clickTab(item);}}
      />
    </div>
  </div>
);

// 切换趋势图和详情
const tabContainer = (obj = null, clickTab = null) => (
  <div className={styles.tabContainer}   style={{display:'block'}}>
    <div className={styles.switchTabBox} >
      <SelfTab
        dataSource={detailTab}
        firstId={obj.switchtype}
        callBackFun={(item) => {clickTab(item.id)}}
        commonClass={styles.switchTabBtn}
        tabClass={styles.switchSectedBtn}
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
  }
  componentDidMount() {
    const dementionListParams = {type: this.state.type};
    const {dementionId} = this.state;
    const {switchtype} = this.state;
    const Params = {groupType:this.state.groupType,familyType:this.state.familyType,filteKeyID:this.state.groupId,startTime:this.state.startTime,endTime:this.state.endTime};
    this.dataFetch(dementionListParams,dementionId,switchtype,Params);
  }

  // 请求model中的fetch方法
  dataFetch(dementionListParams,dementionId,switchtype,Params){
    const sendParams = {
      dementionId,
      switchtype,
      Params,
      dementionListParams:{...this.props.demention.dementionListParams, ...dementionListParams },
    }
    this.props.dispatch({
      type: 'demention/fetch',
      payload: sendParams,
    });
  }

  // 点击button触发的请求chart和table接口函数
  fnClickGroupButton(item) {
    const dementionId = item.id;
    this.setState({
      dementionId,
    });
  }


  // 正负面tab点击切换
  fnCLickTab=(val = null)=> {
    if (val.id !== this.state.type) {
      this.setState({
        type: val.id,
      });
    }
  }

  // 详情趋势图tab点击切换
  detailCLickTab=(id = null)=> {
    if (id !== this.state.switchtype) {
      this.setState({
        switchtype: id,
      });
    }
  }

  // 点击吸顶栏 返回顶部
  backToTop = () => {
    const dataToTop = document.getElementById('dataToTop');
    window.scrollTo(0, document.getElementById('selfDataCenter').offsetTop);
    dataToTop.style.display = 'none';
  };

  // 格式处理详情杭数据展示长度
  formatTableDatda=(val)=>{
    return String(val).length>10 ? `${String(val).substr(0,10)}...` : !isNaN(Number((val*100)/100))?(val*100)/100:val;
  }
  // 遍历接口返回数据获取table的行数据
  tableListFun=(v)=>{
    const data = []
    if(v.data!==null){
      const data100 = v.data.slice(0,100);
      data100.map((item, index)=> {
        const rowdata = {
          key: index,
          id: index+1,
          titleOne: this.formatTableDatda(item.valOne),
          titleTwo: this.formatTableDatda(item.valTwo),
          titleThree: this.formatTableDatda(item.valThree),
          titleFour: this.formatTableDatda(item.valFour),
        }
        data.push(rowdata)
        return 0;
      } )
    }
    return data;
  }


  render() {
    const {dementionListData} = this.props.demention
    const {detailListData} = this.props.demention
    const buttonData = dementionListData?(dementionListData.data?dementionListData.data:[]):[];
    const buttonList = {data:buttonData};
    const tableList = detailListData?(detailListData.data?this.tableListFun(detailListData.data):[]):[];
    const columnsData = detailListData?(detailListData.data?detailListData.data:[]):[];

    return (
      <div className={styles.normal} id="selfDataCenter">
        <div className={styles.topContent} id="dataToTop" onClick={() => {this.backToTop();}}>
          {this.state.dataToMD} | {this.state.topName1} | {this.state.titleName} |{' '}
          {this.state.buttonName}
        </div>
        {headerDom(this.state, this.fnCLickTab.bind(this))}
        {!dementionListData?<div>nothing</div> :(
          <div className={styles.btnContainer}>
            <ButtonGroup
              dataSource={buttonList}
              dataReturnFun={(item, index) => {
                this.fnClickGroupButton(item, index);
              }}
              id={this.state.dementionId}
              isSelectFirst
              btnClass={styles.btnStyle}
              btnSelectedClass={styles.btnSelected}
            />
          </div>)}
        {tabContainer(this.state, this.detailCLickTab.bind(this))}
        <div>
          <div className={styles.tabletitlediv}>
            <p className={styles.tabletitle}>详情数据</p>
          </div>
          <MultipHeaderList
            dataList={tableList}
            customRenderHeader={() => <CustomRenderHeader columnsData={columnsData} />}
            customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
          />
        </div>

      </div>
    );
  }
}

export default connect(({ demention, loading }) => ({
  demention,
  isloading: loading.models.demention,
}))(Demention);
