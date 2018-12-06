/* eslint-disable prefer-destructuring */
import React from 'react';
import { Button, Toast } from 'antd-mobile';
import Dialog from 'components/Dialog';
import classNames from 'classnames';
import { setItem, getItem } from 'utils/localStorage';
import { connect } from 'dva/index';
import Tab from './Tab';
import OrgItem from './orgItem';
import styles from './index.less';
import pk from '../../assets/PK.png';
import Loading from '../../components/Loading/Loading';

class ExportDemention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      groupType: 1,
      PKCondition: ExportDemention.getStorage(),
    };
  }

  static getStorage() {
    /**
     * localStorage存储说明
     * * 作用：存储当前每个group下的选中的item数据
     * * @key: string 'PKCondition'
     * * @value: object  {college:[id1,id2],family:[],group:[]}
     *
     * */
    let PKCondition = getItem('PKCondition').value;
    if (!PKCondition) {
      PKCondition = { college: [], family: [], group: [] };
      setItem('PKCondition', PKCondition);
    }
    return PKCondition;
  }

  getGroupName = groupType => {
    /*
    * 根据group id, 获取group name
    * */
    // eslint-disable-next-line no-param-reassign
    groupType = groupType ? String(groupType) : '1';
    return groupType === '1'
      ? 'college'
      : groupType === '2' ? 'family' : groupType === '3' ? 'group' : 'college';
  };

  checkTime = ({ startTime, endTime }) => {
    // 判断时间变化，清空缓存
    let PKTime = getItem('PKTime').value;
    if (!PKTime || PKTime[0] !== startTime || PKTime[1] !== endTime) {
      // 更新时间，初始化条件
      PKTime = [startTime, endTime];
      setItem('PKTime', PKTime);
      setItem('PKCondition', { college: [], family: [], group: [] });
      this.setState({
        PKCondition: ExportDemention.getStorage(),
      });
    }
  };

  changeTab = id => {
    const groupType = id;
    this.setState({ groupType });
    this.props.dispatch({
      type: 'modalPK/checkData',
      payload: {
        dataAll: this.props.modalPK.dataAll,
        groupType: this.getGroupName(id),
      },
    });
  };

  clickPK = () => {
    const { dialogVisible } = this.props;
    const urlParams = this.props.getUrlParams();
    this.checkTime(urlParams);
    this.setState({
      groupType: urlParams.groupType || 1,
      dialogVisible: !dialogVisible,
    });
    this.props.dispatch({
      type: 'modalPK/getPKObject',
      payload: {
        startTime: Number(urlParams.startTime),
        endTime: Number(urlParams.endTime),
        creditType: 1,
        groupType: this.getGroupName(urlParams.groupType || 1),
      },
    });
  };

  rendGroup = obj => {
    const PKCondition = ExportDemention.getStorage();
    const currentGroupList = PKCondition[this.getGroupName(this.state.groupType)];
    const hasId = currentGroupList.some((v, i) => {
      if (v.orgId === obj.orgId && v.familyType === obj.familyType) {
        currentGroupList.splice(i, 1);
      }
      return v.orgId === obj.orgId && v.familyType === obj.familyType;
    });

    if (!hasId && currentGroupList.length < 3) {
      currentGroupList.push(obj);
    }

    setItem('PKCondition', PKCondition);
    this.setState({
      PKCondition: { ...PKCondition },
    });
  };

  nextStep = () => {
    // 获取提交条件
    const urlParams = this.props.getUrlParams();
    const params = {
      startTime: Number(urlParams.startTime),
      endTime: Number(urlParams.endTime),
      groupType: this.state.groupType,
    };
    // 验证提交条件
    const conditionCheck = getItem('PKCondition').value;
    if (
      conditionCheck &&
      conditionCheck[this.getGroupName(params.groupType)] &&
      conditionCheck[this.getGroupName(params.groupType)].length < 2
    ) {
      Toast.info('至少选择2个对象', 2);
      return;
    }

    // 提交处理
    this.setState({
      dialogVisible: !this.state.dialogVisible,
    });

    if (this.props.openInResultPage) {
      this.props.openInResultPage(params);
    } else {
      this.props.setRouteUrlParams('/scoreresult', params);
    }
    // 记录log
    this.saveLog();
  };

  saveLog = () => {
    this.props.dispatch({
      type: 'login/saveLoginLog',
    });
  };
  showModel = () => {
    this.setState({
      dialogVisible: !this.state.dialogVisible,
    });
  };

  render() {
    const { dialogVisible, groupType, PKCondition } = this.state;
    const { isloading } = this.props;
    return (
      <React.Fragment>
        {dialogVisible ? (
          <Dialog
            visible={dialogVisible}
            showModel={bol => this.showModel(bol)}
            title={<p className={styles.dialogTitle}>请选择学分PK对象（最多选3个）</p>}
            modelClass={styles.chosePKButton}
            cotainerClass={styles.flexContainer}
          >
            {/* tab区域 */}
            <Tab groupType={groupType} onChange={this.changeTab} />
            {/* 组织结构区域 */}
            <div className={classNames(styles.buttonList, 'scroller')}>
              <OrgItem
                selectIds={PKCondition[this.getGroupName(groupType)]}
                dataList={this.props.modalPK.dataList}
                onChange={this.rendGroup}
              />
            </div>
            <div className={styles.footerButton}>
              <Button className={styles.nextStep} onClick={this.nextStep}>
                查看对比结果
              </Button>
            </div>
            {/* **************处理loading************** */}
            {isloading && <Loading />}
          </Dialog>
        ) : (
          <span onClick={this.clickPK} className={styles.pkBtn}>
            <img src={pk} className={styles.pkImg} alt="PK" />
          </span>
        )}
      </React.Fragment>
    );
  }
}
export default connect(({ modalPK, login, loading }) => ({
  modalPK,
  login,
  isloading: loading.models.modalPK,
}))(ExportDemention);
