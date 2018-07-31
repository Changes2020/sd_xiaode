import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.less';

export default class ChartCotainer extends React.Component {
  onClickFooter = () => {
    if (this.props.onClickFooter) {
      this.props.onClickFooter();
    }
  };
  toCreateInfo = () => {
    if (this.props.onClickTitle) {
      this.props.onClickTitle();
    }
  };
  render() {
    const { children = [], isShowFooter = false } = this.props;
    return (
      <div className={styles.echartsBox}>
        <a className={styles.btnEcharts} onClick={this.toCreateInfo.bind(this)}>
          <span className={styles.echartMore}>查看详情</span>
          <Icon type="right" className={styles.echartsIcon} size="lg" />
        </a>
        <div className={styles.chartContent}>
          {Array.isArray(children) ? [...children] : { ...children }}
        </div>
        {isShowFooter ? (
          <div
            className={styles.checkAllGroup}
            style={{ marginTop: '-40px' }}
            onClick={this.onClickFooter}
          >
            <span className={styles.toggleText}>查看全部</span>
          </div>
        ) : null}
      </div>
    );
  }
}
