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
  checkDetal = (titleOne = '', titleTwo, checkDetail) => {
    this.setState({
      isShowModal: true,
      dialogData: {
        scoreDate: titleOne.replace(/-/g, '.'),
        avgScore: titleTwo,
        updateReason: checkDetail,
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
            onClick={() => this.checkDetal(rowData.titleOne, rowData.titleTwo, rowData.checkDetail)}
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
                学分日期: <span className={modelstyles.wordCls}>{dialogData.scoreDate}</span>
              </p>
              <p className={modelstyles.dialogType}>
                均分: <span className={modelstyles.wordCls}>{dialogData.avgScore}</span>
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
