import React from 'react';
import { Modal } from 'antd-mobile';
import classNames from 'classnames';
// import { fixModal } from './fixModel';

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
  // showModel(bol) {
  //   if (this.props.showModel) {
  //     this.props.showModel(bol);
  //   }
  //   if (!bol) {
  //     document.querySelector('#root').style.overflow = 'auto';
  //   } else {
  //     this.overHide();
  //   }
  // }
  //
  componentDidMount() {
    // fixModal()
  }

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
  renderFoot = () => {
    const footer = this.props.footer || [];
    return footer.map(item => {
      const { text = '', onPress = null } = item;
      return { text, onPress };
    });
  };

  render() {
    const { visible, modelClass = '', children = null } = this.props;
    const newModelClass = modelClass ? classNames(styles.normal, modelClass) : styles.groupModal;
    if (visible) {
      this.overHide(visible);
    }
    return visible ? (
      <div className={styles.normal}>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          className={newModelClass}
          wrapClassName={styles.gwrapRoupModal}
          footer={this.renderFoot()}
        >
          {children && Array.isArray(children)
            ? [...this.props.children]
            : { ...this.props.children }}
        </Modal>
      </div>
    ) : null;
  }
}
