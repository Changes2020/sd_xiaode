import React from 'react';
import { Modal, Icon } from 'antd-mobile';
import classNames from 'classnames';

import styles from './index.less';

/*
*modelClass     模态框样式
*cotainerClass  内容区域样式
*
 */
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
  overHide = () => {
    document.querySelector('#root').style.overflow = 'hidden';
  };
  renderHeadElement(title) {
    let ReturnDom = null;
    if (typeof title === 'string') {
      ReturnDom = <p className={styles.titleTxt}>{title}</p>;
    }
    if (React.isValidElement(title)) {
      ReturnDom = <div>{title}</div>;
    }
    return (
      <div className={styles.modalHead}>
        {ReturnDom}
        <Icon
          type="cross-circle"
          className={styles.dialogCloseBtn}
          onClick={() => {
            this.props.isShowModel(false);
          }}
        />
      </div>
    );
  }

  render() {
    const { visible, modelClass = '', cotainerClass = '', children = null, title } = this.props;
    const newModelClass = modelClass ? classNames(styles.normal, modelClass) : styles.groupModal;
    const newFlexContainer = cotainerClass
      ? classNames(styles.normal, cotainerClass)
      : styles.flexContainer;
    if (visible) {
      this.overHide(visible);
    }
    return visible ? (
      <div>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          title={this.renderHeadElement(title)}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          className={newModelClass}
          wrapClassName={styles.gwrapRoupModal}
        >
          <div className={newFlexContainer} style={{ overflowY: 'scroll' }}>
            <div className={styles.modalContent}>{children && { ...this.props.children }}</div>
            <div className={styles.modalContentBottom} />
          </div>
        </Modal>
      </div>
    ) : null;
  }
}
