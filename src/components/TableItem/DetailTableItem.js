import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './TableItem.less';
import SelfDialog from '../Dialog/selfDialog';

class DetailTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      dialogData:{},
    };
  }
  checkDetal=(titleOne,titleTwo,titleThree)=>{
    console.log(titleOne,titleTwo,titleThree)
    this.setState({
      isShowModal: true,
      dialogData:{
        scoreDate:titleOne,
        avgScore:titleTwo,
        updateReason:titleThree,
      }

    });
  }
  showModel = bol => {
    this.setState({
      isShowModal: bol,
    });
  };

  render() {
    const { rowData ,name} = this.props;
    const { isShowModal,dialogData } = this.state;
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgWhite : styles.bgGrey}>
          <div className={styles.leftCls}>{rowData.id}</div>
          <div className={styles.dateCls}>{rowData.titleOne}</div>
          <div className={styles.stuCls}>{rowData.titleTwo}</div>
          <div className={styles.preValCls}>{rowData.titleThree}</div>
          <div className={styles.checkButton} onClick={()=>this.checkDetal(rowData.titleOne,rowData.titleTwo,rowData.titleThree)}>查看</div>
        </div>

        {/* modal */}
        <SelfDialog visible={isShowModal} className={styles.m_dialogWrap}>
          <dl className={styles.m_titleInfo}>
            <dt className={styles.dialogContent}>
              <p className={styles.dialogTitle}>{name}</p>
              <p className={styles.dialogType}>
                学分日期: <span>{dialogData.scoreDate}</span>
              </p>
              <p className={styles.dialogType}>
                均分: <span>{dialogData.avgScore}</span>
              </p>
            </dt>
          </dl>
          <div className={styles.m_richWrap}>
            <div className="scroller" style={{ overflowY: 'scroll' }}>
              <div className={styles.limitHeight}>
                <p className={styles.richText}>调整原因:</p>
                <pre className={styles.richText}>{dialogData.updateReason}</pre>
                <br />
              </div>
            </div>
            <Icon
              type="cross-circle"
              className={styles.dialogCloseBtn}
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
