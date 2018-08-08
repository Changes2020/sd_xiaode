import React from 'react';
import { Modal, Icon } from 'antd-mobile';
import classNames from 'classnames';
// import { fixModal } from './fixModel';

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
  // componentDidMount() {
  //   const {visible}=this.props;
  //   if(visible){
  //     fixModal()
  //   }
  //
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (JSON.stringify(nextProps.visible) !== JSON.stringify(this.props.visible)) {
  //     if(nextProps.visible){
  //       fixModal()
  //     }else{
  //       fixModal(true)
  //     }
  //   }
  // }
  // componentWillUnmount(){
  //   fixModal(true);   // 将touch事件remove掉
  // }
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
  showModel(bol) {
    if (!bol) {
      // fixModal(true);
      document.querySelector('#root').style.overflow = 'auto';
    } else {
      this.overHide();
    }
    if (this.props.showModel) {
      this.props.showModel(bol);
    }
  }

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
            this.showModel(false);
          }}
        />
      </div>
    );
  }

  render() {
    const { visible, modelClass = '', cotainerClass = '', children = null, title } = this.props;
    const newModelClass = modelClass
      ? classNames(styles.groupModal, modelClass)
      : styles.groupModal;
    const newFlexContainer = cotainerClass
      ? classNames(styles.normal, cotainerClass)
      : styles.flexContainer;
    if (visible) {
      this.overHide(visible);
    }
    return visible ? (
      <div className={styles.dialog}>
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
            {children && (
              <div className={styles.modalContent}>
                {children && Array.isArray(children)
                  ? [...this.props.children]
                  : { ...this.props.children }}
              </div>
            )}
            <div className={styles.modalContentBottom} />
          </div>
        </Modal>
      </div>
    ) : null;
  }
}
