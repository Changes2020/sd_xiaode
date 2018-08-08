import React from 'react';
import { Modal } from 'antd-mobile';
import classNames from 'classnames';
import { fixModal } from '../../utils/fixModel';

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
  componentDidMount() {
    const { visible } = this.props;
    this.handleTouch(!visible);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.visible) !== JSON.stringify(this.props.visible)) {
      this.handleTouch(!nextProps.visible);
    }
  }
  componentWillUnmount() {
    this.handleTouch(true); // 将touch事件remove掉
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
  handleTouch = bol => {
    fixModal(bol);
    if (bol) {
      document.querySelector('#root').style.overflow = 'auto';
    } else {
      document.querySelector('#root').style.overflow = 'hidden';
    }
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
