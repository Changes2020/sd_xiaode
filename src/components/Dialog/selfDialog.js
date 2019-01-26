// tip：弹框内有滚动内容的话，需要在滚动内容外边包一层：<div className="scroller" style={{ overflowY: 'scroll' }}>滚动内容</div>
import React from 'react';
import { Modal } from 'antd-mobile';
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

export default class selfDialog extends React.Component {
  componentDidMount() {
    const { visible } = this.props;
    this.handleTouch(!visible);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const { ...others } = this.props;
    return (
      <div className={styles.normal}>
        <Modal
          {...others}
          transparent
          maskClosable={false}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          footer={this.renderFoot()}
        >
          {React.Children.map(this.props.children, child => {
            return child;
          })}
        </Modal>
      </div>
    );
  }
}
