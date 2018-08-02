import React from 'react';
import Dialog from '../../components/Dialog/index';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import NoData from '../../components/NoData/NoData';
import styles from './_creditDialog.less';

class _creditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }
  setListItem = (data, v) => {
    const _self = this;
    let i = 0;
    const liList = Object.keys(v).map(key => {
      const res = { data: this.dataFormt(v[key]) };
      const domTmp = (
        <li key={(i += 1)}>
          <div className={styles.modeltitlediv}>
            <span key={key} className={styles.modeltitle}>
              {key === 'selfExam' ? '自考' : key === 'barrier' ? '壁垒' : '孵化器'}
            </span>
          </div>
          {/* div的样式需要调整 */}

          <div className={styles.buttonDiv}>
            <ButtonGroup
              dataSource={res}
              dataReturnFun={item => {
                _self.selectGroup(item.id, key, v);
              }}
              id={this.state.selected}
              btnClass={styles.btnStyle}
              btnSelectedClass={styles.btnSelected}
            />
          </div>
        </li>
      );
      return domTmp;
    });
    return <ul className={styles.buttonul}>{liList}</ul>;
  };
  dataFormt = data => {
    const list = [];
    data.map((item, index) => {
      const bb = {
        key: index,
        id: item.groupId,
        name: item.category,
      };
      list.push(bb);
      return 0;
    });
    return list;
  };
  selectGroup(groupId, key, data) {
    const clientHeight = document.documentElement.clientHeight / 667 * 17;
    let len = 0;
    const selfLen = data.selfExam ? data.selfExam.length : 0;
    const barLen = data.barrier ? data.barrier.length : 0;
    if (key === 'selfExam') {
      len = 0;
    } else if (key === 'barrier') {
      len = selfLen;
    } else if (key === 'incubator') {
      len = selfLen + barLen;
    }

    this.setState({
      selected: groupId,
    });
    for (let i = 0; i < data[key].length; i += 1) {
      len += 1;
      if (document.getElementById(`rowId${len}`)) {
        if (document.getElementById(`rowId${len}`).getAttribute('dataid') === groupId) {
          const height = document.getElementById(`rowId${len}`).offsetTop + clientHeight;
          setTimeout(() => {
            window.scrollTo(0, height);
          }, 300);
        }
      }
    }
    this.props.showModel(false);
  }

  render() {
    const { dataList, listData, tabkey, modelflag } = this.props;

    return (
      <div>
        <Dialog
          visible={modelflag}
          showModel={val => {
            this.props.showModel(val);
          }}
          title={`请选择想要查看的${tabkey === 1 ? '学院' : tabkey === 2 ? '家族' : '小组'}`}
        >
          <div className={styles.flexContainer}>
            {!dataList ? <NoData showflag /> : this.setListItem(dataList, listData)}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default _creditDialog;
