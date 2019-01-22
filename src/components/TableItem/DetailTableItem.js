import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './TableItem.less';
import modelstyles from './DetailTableItem.less';
import SelfDialog from '../Dialog/selfDialog';

class DetailTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      dialogData: {},
    };
  }
  checkDetal = (titleOne, titleTwo) => {
    this.setState({
      isShowModal: true,
      dialogData: {
        scoreDate: titleOne.replace(/-/g,'.'),
        avgScore: titleTwo,
        updateReason:
          'dsflahu sdia; sihf 大夫和高 i； 啥地方哈；我爱护对方 i；哦啊啥地方但是发哈is 回复；' +
          '阿富汗滴哦；哈地方i 啊还是短发 i 哦阿哈地方 i 哦啊哈地方i 啊啥地方 i 阿松都是顶级护发大夫过来的glass发挥了空间啥都感觉圣诞节开高速路口党纪国法圣诞节发个' +
          '接口地方噶考虑到噶看到过苦嘟嘟后付款阿里地方顶级护发空间发动机哈阿卡大家发哈剪短发可好阿地方哈阿技术的开',
      },
    });
  };
  showModel = bol => {
    this.setState({
      isShowModal: bol,
    });
  };

  render() {
    const { rowData, name } = this.props;
    const { isShowModal, dialogData } = this.state;
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgWhite : styles.bgGrey}>
          <div className={styles.leftCls}>{rowData.id}</div>
          <div className={styles.dateCls}>{rowData.titleOne}</div>
          <div className={styles.stuCls}>{rowData.titleTwo}</div>
          <div className={styles.preValCls}>{rowData.titleThree}</div>
          <div
            className={styles.checkButton}
            onClick={() => this.checkDetal(rowData.titleOne, rowData.titleTwo, rowData.titleThree)}
          >
            查看
          </div>
        </div>

        {/* modal */}
        <SelfDialog visible={isShowModal} className="m_dialogWrap">
          <dl className={modelstyles.m_titleInfo}>
            <dt className={modelstyles.dialogContent}>
              <p className={modelstyles.dialogTitle}>{name}</p>
              <p className={modelstyles.dialogType}>
                学分日期: <span>{dialogData.scoreDate}</span>
              </p>
              <p className={modelstyles.dialogType}>
                均分: <span>{dialogData.avgScore}</span>
              </p>
            </dt>
          </dl>
          <div className={modelstyles.m_richWrap}>
            <div className="scroller" style={{ overflowY: 'scroll' }}>
              <div className={modelstyles.limitHeight}>
                <p className={modelstyles.richText}>调整原因:</p>
                <pre className={modelstyles.richText}>{dialogData.updateReason}</pre>
                <br />
              </div>
            </div>
            <Icon
              type="cross-circle"
              className={modelstyles.dialogCloseBtn}
              onClick={() => {
                this.showModel(false);
              }}
            />
          </div>
        </SelfDialog>
      </div>
    );
  }
}
export default DetailTableItem;
