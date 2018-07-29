import React from 'react';
import { Modal, Button, Icon } from 'antd-mobile';

import styles from './index.less';

function closest(el, selector) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  let e = el;
  while (e) {
    if (matchesSelector.call(e, selector)) {
      return e;
    }
    e = e.parentElement;
  }
  return null;
}
export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  onClose = () => {
    document.querySelector('#root').style.overflow = 'auto';
    this.setState({
      modal: false,
    });
  };

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  showModal = key => e => {
    document.querySelector('#root').style.overflow = 'hidden';
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  renderHeadElement() {
    return (
      <div className={styles.modalHead}>
        <p className={styles.titleTxt}>请选择想要查看的</p>
        <Icon type="cross-circle" className={styles.dialogCloseBtn} onClick={this.onClose} />
      </div>
    );
  }

  render() {
    const { modal } = this.state;
    return (
      <div>
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          title={this.renderHeadElement()}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          className={styles.groupModal}
          wrapClassName={styles.gwrapRoupModal}
        >
          <div className={styles.flexContainer}>
            <div className={styles.modalContent}>
              {'111111111111111111111111111111111111111111111111111111111111'
                .split('')
                .map((item, index) => (
                  <div key={Math.random()}>`sdkjsdfslkjdfsk&{item + index}`</div>
                ))}
            </div>
            <div className={styles.modalContentBottom} />
          </div>
        </Modal>
        <Button onClick={this.showModal('modal')}>dianji</Button>
      </div>
    );
  }
}
