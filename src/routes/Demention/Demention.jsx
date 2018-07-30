import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import CustomRenderHeader from '../../components/TableItem/TableHeader';
import CustomRenderItem from '../../components/TableItem/TableItem';
import styles from './Demention.less';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import SelfTab from '../../components/SelfTab/SelfTab';

class Demention extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
        endTime: null, // 过滤结束时间
        creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 1, // 1:学院，2:家族，3:小组
        rankType: 3, // 1:集团，2:院内，3:null
        dateType: 3, // 1:周均,2:月均,3:自定义
        filteKeyID: null, // 登录用户id
        userId: null,
      },

      dementionId: 4,
      type: 2,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {}
  // 父组件控制butonn组内容显示
  spanFun = item => {
    return (
      <span>
        <span>{item.id}</span>
        <span>{item.name}</span>
      </span>
    );
  };

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

  render() {
    const { paramsObj } = this.state;
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

    const tabData1 = { data: [{ id: 2, title: '正面得分' }, { id: 10, title: '负面得分' }] };
    const tabData2 = {
      data: [
        { id: 1, title: '学分均分' },
        { id: 2, title: '正面均分' },
        { id: 3, title: '负面均分' },
      ],
    };
    return (
      <div>
        <div>{JSON.stringify(paramsObj)}</div>
        <div className={styles.tabBox}>
          <SelfTab
            dataSource={tabData1}
            callBackFun={(item, index) => {
              this.fnCLickTab(item, index);
            }}
            firstId={this.state.type}
            commonClass={styles.switchTabBtn}
            tabClass={styles.switchSectedBtn}
          />
        </div>

        <div className={styles.tabBox1}>
          <SelfTab
            dataSource={tabData2}
            callBackFun={(item, index) => {
              this.fnCLickTab(item, index);
            }}
            firstId={this.state.type}
            commonClass={styles.tabBtn}
            tabClass={styles.sectedBtn}
          />
        </div>

        <div className={styles.btnContainer}>
          <ButtonGroup
            dataSource={dataSource}
            dataReturnFun={(item, index) => {
              this.fnClickGroupButton(item, index);
            }}
            id={this.state.dementionId}
            isSelectFirst
            spanFunction={(item, num) => this.spanFun(item, num)}
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
