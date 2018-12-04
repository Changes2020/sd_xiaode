import React from 'react';
import { Button } from 'antd-mobile';
import Dialog from 'components/Dialog';
import classNames from 'classnames';
import { setItem, getItem } from 'utils/localStorage';
import { connect } from 'dva/index';
import Tab from './Tab';
import OrgItem from './orgItem';
import styles from './index.less';

class ExportDemention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: true,
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

  getGroupName({ groupType } = this.state) {
    /*
    * 根据group id, 获取group name
    * */
    return groupType === '1'
      ? 'college'
      : groupType === '2' ? 'family' : groupType === '3' ? 'group' : 'college';
  }

  changeTab = id => {
    const groupType = id;
    this.setState({ groupType });
  };

  clickPK = () => {
    const { urlParams } = this.props;
    this.setState({
      groupType: urlParams.groupType ? urlParams.groupType : 1,
    });
    this.props.dispatch({
      type: 'modalPK/getPKObject',
      payload: {
        startTime: Number(urlParams.startTime),
        endTime: Number(urlParams.endTime),
        creditType: 1,
      },
    });
  };

  rendGroup = obj => {
    const PKCondition = ExportDemention.getStorage();
    const currentGroupList = PKCondition[this.getGroupName()];
    const hasId = currentGroupList.some((v, i) => {
      if (v === obj.id) {
        currentGroupList.splice(i, 1);
      }
      return v === obj.id;
    });

    if (!hasId && currentGroupList.length < 3) {
      currentGroupList.push(obj.id);
    }

    setItem('PKCondition', PKCondition);
    this.setState({
      PKCondition: { ...PKCondition },
    });
  };

  nextStep = () => {
    const { urlParams } = this.props;
    const params = {
      startTime: Number(urlParams.startTime),
      endTime: Number(urlParams.endTime),
      groupType: this.getGroupName(this.state.groupType),
    };
    this.props.setRouteUrlParams('/scoreresult', params);
  };

  render() {
    const { dialogVisible, groupType, PKCondition } = this.state;
    return (
      <div>
        {dialogVisible && (
          <Dialog
            visible={dialogVisible}
            showModel={bol => this.showModel(bol)}
            title={<p className={styles.dialogTitle}>请选择学分PK对象（最多选3个）</p>}
            modelClass={styles.chosePKButton}
            cotainerClass={styles.flexContainer}
          >
            <div onClick={this.clickPK}>PK</div>
            {/* tab区域 */}
            <Tab groupType={groupType} onChange={this.changeTab} />
            {/* 组织结构区域 */}
            <div className={classNames(styles.buttonList, 'scroller')}>
              <OrgItem selectIds={PKCondition[this.getGroupName()]} onChange={this.rendGroup} />
            </div>
            <div className={styles.footerButton}>
              <Button className={styles.nextStep} onClick={this.nextStep}>
                查看对比结果
              </Button>
            </div>
          </Dialog>
        )}
      </div>
    );
  }
}
export default connect(({ modalPK }) => ({
  modalPK,
}))(ExportDemention);
