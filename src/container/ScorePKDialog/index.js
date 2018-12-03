import React from 'react';
import { Button } from 'antd-mobile';
import Dialog from 'components/Dialog';
import classNames from 'classnames';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import Tab from './Tab';
import styles from './index.less';

export default class ExportDemention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: true,
      groupType: 2,
    };
  }
  changeTab = id => {
    const groupType = id;
    this.setState({ groupType });
  };

  renderGroupList = () => {
    // 此方法用于render出groupList
    const { selectedTime } = this.state;
    const data = this.choseDateArea();
    return (
      <ButtonGroup
        dataSource={{ data }}
        id={selectedTime}
        btnClass={styles.timeBtnStyle}
        btnSelectedClass={styles.timeBtnSelected}
        dataReturnFun={item => {
          this.selectDateTime(item.id, item.name);
        }}
      />
    );
  };

  render() {
    const { dialogVisible, groupType } = this.state;

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
            {/* tab区域 */}
            <Tab groupType={groupType} onChange={this.changeTab} />
            {/* 组织结构区域 */}
            <div className={classNames(styles.buttonList, 'scroller')}>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
              <div className={styles.ceshi}>1</div>
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
