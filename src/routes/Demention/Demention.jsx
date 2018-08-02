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
import NoData from '../../components/NoData/NoData.js';
import Loading from '../../components/Loading/Loading';
import TrendChart from '../../components/Charts/Line';
import {fontSizeAuto} from "../../utils/echartsUtils";

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
    const familyType = 0;
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
      groupId: 250,
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
    console.log(this.state)
  }
  componentDidMount() {
    const dementionListParams = {type: this.state.type};
    const {dementionId} = this.state;
    const {switchtype} = this.state;
    const Params = {groupType:this.state.groupType,familyType:this.state.familyType,filteKeyID:this.state.groupId,startTime:this.state.startTime,endTime:this.state.endTime};
    this.dataFetch(dementionListParams,dementionId,switchtype,Params);
    window.onscroll = function () {
      const t = document.documentElement.scrollTop || document.body.scrollTop;// 滚动条滚动时，到顶部的距离
      const backTop = document.getElementById('dataToTop');// 吸顶模块
      if (backTop !== null) {
        backTop.style.display = t >= 118 ? 'block' : 'none';
      }
    };
  }

  // 正负面tab点击切换
  fnCLickTab=(val = null)=> {
    if (val.id !== this.state.type) {
      const dementionListParams = {type: val.id};
      const dementionId = null;
      const {switchtype} = this.state;
      const Params = {groupType:this.state.groupType,familyType:this.state.familyType,filteKeyID:this.state.groupId,startTime:this.state.startTime,endTime:this.state.endTime};
      this.dataFetch(dementionListParams,dementionId,switchtype,Params);
      this.setState({
        type: val.id,
        buttonName:val.id===2?'直播':'开班电话',
      });
    }
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

  // 请求model中的table方法
  dataTable(dementionId,param){
    const sendParams = {
      detailListParams:  {...this.props.demention.detailListParams, ...param },
      dementionId,
    }
    this.props.dispatch({
      type: 'demention/table',
      payload: sendParams,
    });
  }

  // 请求model中的chart方法
  dataChart(dementionId,param){
    const sendParams = {
      TrendParams:  {...this.props.demention.TrendParams, ...param },
      dementionId,
    }
    this.props.dispatch({
      type: 'demention/chart',
      payload: sendParams,
    });
  }

  // 点击button触发的请求chart和table接口函数
  fnClickGroupButton(item) {
    const dementionId = item.id;
    const buttonName = item.name
    const {switchtype} = this.state;
    if (item.id !== this.props.demention.dementionId) {
      const Params = {groupType:this.state.groupType,familyType:this.state.familyType,filteKeyID:this.state.groupId,startTime:this.state.startTime,endTime:this.state.endTime};
      if(switchtype===1){
        this.dataTable(dementionId,Params)}
      else{
        this.dataChart(dementionId,Params);
      }
    }
    this.setState({
      dementionId,
      buttonName,
    });
  }

  // 详情趋势图tab点击切换
  detailCLickTab=(id = null)=> {
    if (id !== this.state.switchtype) {
      const {dementionId} = this.state;
      const Params = {groupType:this.state.groupType,familyType:this.state.familyType,filteKeyID:this.state.groupId,startTime:this.state.startTime,endTime:this.state.endTime};
      if(id===1){
        this.dataTable(dementionId,Params)}
      else{
        this.dataChart(dementionId,Params);
      }
      this.setState({
        switchtype: id,
      });
    }
  }

  // 格式处理详情数据展示长度
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

  // 通过dementionId遍历接口获得button的title
  dataHandle=(datasource)=> {
    const titledata = !datasource?[]:datasource;
    const result = []
    titledata.map((item)=> {
      if(item.id === this.props.demention.dementionId)
      {
        const titleitem = {
          nametitle: item.name,
          secondtitle: item.rawDataDes,
        }
        result.push(titleitem)
      }
      return null
    })
    return result;
  }

  chartDataFun=(datasource,chartData)=>{
    const titleobj = this.dataHandle(datasource);
    const titleobjName = titleobj.length===0?'':(!titleobj[0].nametitle?'':titleobj[0].nametitle)
    const tetleobjSecond = titleobj.length===0?'':(!titleobj[0].secondtitle?'':titleobj[0].secondtitle);
    const nameTitle = `${titleobjName}趋势图`;
    const rawDataDes= tetleobjSecond;
    const xdata = [];
    const ydata = [];
    const dataList = !chartData?[]:(!chartData.data?[]:chartData.data);
    dataList.map((item)=> {
      const xvalue = item.key;
      const value = item.val
      xdata.push(xvalue)
      ydata.push(value)
      return null
    } )
    return {
      title: {
        text: nameTitle,
        subtext: rawDataDes,
        top: fontSizeAuto(38),
        left: fontSizeAuto(24),
        textStyle: {
          fontSize: fontSizeAuto(24),
          color: '#444348',
        },
        subtextStyle: {
          fontSize: fontSizeAuto(20),
          color: '#999',
        },
      },
      grid: {
        containLabel: true,    // 此属性用于设置名字太长显示不全
        left: fontSizeAuto(25),
        top: fontSizeAuto(155),
        right:fontSizeAuto(40),
        bottom:fontSizeAuto(20),
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine:{
          show: true,
          lineStyle:{
            color:"#dadada",
          },
        },
        axisLabel: { // x轴y轴字体样式
          fontSize: fontSizeAuto(16),
          color: '#999',
        },
        // splitNumber: 5, // 显示的行数
        data: xdata,
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitNumber: 4, // 显示的行数
        axisLabel: { // x轴y轴字体样式
          fontSize: fontSizeAuto(16),
          color: '#999',
        },
        splitLine: {  // 分界线样式
          lineStyle: {
            width: 1,
            color: '#eee',
          },
        },
      },
      series: {
        name: '集团第一名均分',
        type: 'line',
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(10), // 拐点大小
        itemStyle: {  // 拐点
          color: '#52C9C2',
        },
        lineStyle: {
          color: '#52C9C2',
          type: 'solid', // 实线
          width:1,
        },
        data: ydata,
      },
    }
  }
  // 点击吸顶栏 返回顶部
  backToTop = () => {
    const dataToTop = document.getElementById('dataToTop');
    window.scrollTo(0, document.getElementById('selfDataCenter').offsetTop);
    dataToTop.style.display = 'none';
  };


  render() {
    const { isloading } = this.props;
    const {dementionListData} = this.props.demention
    const {detailListData} = this.props.demention
    const buttonData = dementionListData?(dementionListData.data?dementionListData.data:[]):[];
    const buttonList = {data:buttonData};
    const tableList = detailListData?(!detailListData.data?null:this.tableListFun(detailListData.data)):null;
    const columnsData = detailListData?(detailListData.data?detailListData.data:[]):[];
    const listNum = !detailListData?0:(!detailListData.data?0:detailListData.data.total)
    // console.log(listNum)
    const chartData = !this.props.demention.trendData?null:this.props.demention.trendData;
    return (
      <div className={styles.normal} id="selfDataCenter">
        <div className={styles.topContent} id="dataToTop" onClick={() => {this.backToTop();}}>
          {this.state.dataToMD} | {this.state.topName1} | {this.state.titleName} |{' '}
          {this.state.buttonName}
        </div>

        {headerDom(this.state, this.fnCLickTab.bind(this))}

        {isloading && <Loading />}

        {!dementionListData?<NoData showflag /> :(
          <div className={styles.btnContainer}>
            <ButtonGroup
              dataSource={buttonList}
              dataReturnFun={(item) => {
                this.fnClickGroupButton(item);
              }}
              id={this.props.demention.dementionId}
              isSelectFirst
              btnClass={styles.btnStyle}
              btnSelectedClass={styles.btnSelected}
            />
          </div>)}

        {tabContainer(this.state, this.detailCLickTab.bind(this))}

        {this.state.switchtype===1? (
          <div>
            <div className={styles.tabletitlediv}>
              <p className={styles.tabletitle}>{this.state.buttonName}详情数据</p>
            </div>
            {!tableList||tableList.length===0 ? <NoData showflag /> : (
              <div>
                <MultipHeaderList
                  dataList={tableList}
                  customRenderHeader={() => <CustomRenderHeader columnsData={columnsData} />}
                  customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
                />
              </div>)
            }
          </div>
          ) :(!chartData?<NoData showflag />:(
            <div style={{background:'#fff',width: '7.1rem',marginLeft: '0.2rem'}}>
              <TrendChart
                dataSource={!buttonData?[]: this.chartDataFun(buttonData,chartData)}
                data={this.props.demention.dementionId}
                width='7.1rem'
                height='6rem'
              />
            </div>))
        }
        {this.state.switchtype===1? (
          <div  className={`${listNum > 99 ? styles.warmtoast : styles.warmtoastnone}`} >
            <div className={styles.warmtoasttitle}>
              *温馨提示
            </div>
            <div className={styles.warmtoastcontent}>
              由于数据过多，目前仅支持查看前100条。数据下载功能开发中，即将上线～
            </div>
          </div>
        ):null}
        <div className={styles.divheight} />
      </div>
    );
  }
}

export default connect(({ demention, loading }) => ({
  demention,
  isloading: loading.models.demention,
}))(Demention);
