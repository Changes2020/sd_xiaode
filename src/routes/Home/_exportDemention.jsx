import React from 'react';
import { Button } from 'antd-mobile';
import moment from 'moment';
import styles from './exportDemention.less';
import { scroll } from '../../utils/scroll';
import top from '../../assets/top.svg';
import download from '../../assets/download.svg';
import Dialog from '../../components/Dialog';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import { getExtraDate } from '../../utils/FormatDate';
import Modal from '../../components/Modal';
import rightIcon from '../../assets/right.svg';
import { getItem } from '../../utils/localStorage';

export default class ExportDemention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isResultModal: false,
      isShowModal: false,
      selectedTime: [],
      dialogVisible: false,
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    this.Id.style.display = t > 200 ? 'block' : 'none';
  };
  getDownloadInfo = () => {
    if (this.props.getDownloadInfo) {
      const { selectedTime } = this.state;
      const { paramsObj } = this.props;
      const sendObj = {
        userId: paramsObj.userId,
        downloadDates: selectedTime.join(','),
      };
      this.props.getDownloadInfo(sendObj);
      this.setState({
        isResultModal: true,
        isShowModal: false,
      });
    }
  };
  getGroupType = () => {
    const userInfo = getItem('userInfo').value || {};
    const { groupType } = userInfo;
    return groupType;
  };
  createRef = Id => {
    this.Id = Id;
  };
  toBackTop = () => {
    const currentY = document.documentElement.scrollTop || document.body.scrollTop;
    scroll(currentY, 0);
  };
  selectDateTime = id => {
    const { selectedTime } = this.state;
    if (!selectedTime.find(item => item === id)) {
      if (selectedTime.length < 5) {
        selectedTime.push(id);
        this.setState({ selectedTime });
      }
    } else {
      selectedTime.splice(selectedTime.findIndex(item => item === id), 1);
      this.setState({ selectedTime });
    }
  };
  choseDateArea = () => {
    const extra = getExtraDate();
    const { minDate = 0, maxDate = 0 } = extra;
    const dateArr = [];
    for (let i = maxDate; i >= minDate && dateArr.length < 10; i -= 86400000) {
      dateArr.push({
        id: moment(i).format('YYYY.MM.DD'),
        name: moment(i).format('YYYY.MM.DD'),
      });
    }
    return dateArr;
    // const dateTime = moment(date).format('YYYY-MM-DD');
  };
  showModel = bol => {
    if (bol) {
      this.choseDateArea();
      this.setState({ dialogVisible: bol, selectedTime: [] });
    } else {
      this.setState({ dialogVisible: bol });
    }
  };
  nextStep = () => {
    const { selectedTime } = this.state;
    if (selectedTime.length > 0) {
      this.setState({
        dialogVisible: false,
        isShowModal: true,
      });
    }
  };
  cannelModal = () => {
    this.setState({
      isShowModal: false,
    });
  };

  cannelResultModal = () => {
    this.setState({
      isResultModal: false,
    });
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
    const { dialogVisible, isShowModal, isResultModal } = this.state;

    const { paramsObj } = this.props;
    const groupType = this.getGroupType();
    const isShowDownload =
      groupType === 'college' || groupType === 'family' || groupType === 'group';
    return (
      <div>
        <div className={styles.floatCotainer}>
          <p className={styles.topBtn} ref={this.createRef} onClick={this.toBackTop}>
            <img src={top} alt="回到顶部" />
          </p>
          {isShowDownload && (
            <p className={styles.downloadBtn} onClick={this.showModel.bind(this, true)}>
              <img src={download} alt="下载" />
            </p>
          )}
        </div>
        <div className={styles.download}>
          {dialogVisible && (
            <Dialog
              visible={dialogVisible}
              showModel={bol => this.showModel(bol)}
              title={<p className={styles.dialogTitle}>请选择所要下载的底表(最多选择5天)</p>}
              modelClass={styles.modelClass}
              cotainerClass={styles.flexContainer}
            >
              <div className={styles.timeList}>{this.renderGroupList()}</div>
              <Button className={styles.nextStep} onClick={this.nextStep}>
                下一步
              </Button>
            </Dialog>
          )}
        </div>
        {/* modal弹框 */}
        {isShowModal && (
          <Modal
            visible={isShowModal}
            modelClass={styles.downLoadModal}
            footer={[
              { text: '取消', onPress: this.cannelModal },
              { text: '确定', onPress: this.getDownloadInfo },
            ]}
          >
            <p className={styles.downLoadTitle}>是否确定发送底表？</p>
            <div className={styles.downloadWarn}>
              <p>接收邮箱: {paramsObj.userId}@sanlunds.com</p>
              <p>
                *底表包含
                <i className={styles.dataInfo}>
                  {' '}
                  本{{ college: '学院', family: '家族', group: '小组' }[groupType]}所有学分维度数据
                </i>
              </p>
              <p>(底线了质检除外)</p>
            </div>
          </Modal>
        )}
        {/* 返回结果弹框 */}
        {isResultModal && (
          <Modal
            visible={isResultModal}
            modelClass={styles.downLoadModal}
            footer={[{ text: '确定', onPress: this.cannelResultModal }]}
          >
            <div className={styles.resultModal}>
              <img src={rightIcon} className={styles.resultIcon} alt="成功" />
              <h4 className={styles.resultSuccess}> 发送成功!</h4>
              <p className={styles.resultEmilCheck}>请稍后到邮箱中查看底表</p>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
