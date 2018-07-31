import React from 'react';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import Group1 from '../../assets/Group1.png';
import Group2 from '../../assets/Group2.png';
import Group3 from '../../assets/Group3.png';
import styles from './Render.less';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props;
    const splitLevel = 1; // 取低于均值高于均值
    const n = rowData.type; // 按自考，壁垒，孵化器区分颜色
    return (
      <div>
        <div className={styles.tableCss}>
          <div className={styles.leftCss}>
            {splitLevel === 1 ? (
              rowData.rank === 1 ? (
                <img alt="" className={styles.imgCls} src={Group1} />
              ) : rowData.rank === 2 ? (
                <img alt="" className={styles.imgCls} src={Group2} />
              ) : rowData.rank === 3 ? (
                <img alt="" className={styles.imgCls} src={Group3} />
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {rowData.category}
          </div>
          <div className={styles.proCss}>{rowData.project}</div>
          <div className={styles.rankCss}>
            {rowData.rank}/{rowData.groupTotal}
          </div>
          <div className={styles.equableCss}>{rowData.score && rowData.score.toFixed(2)}</div>
          <div className={styles.ringRatioCss}>{rowData.group && rowData.group.toFixed(2)}</div>
          <div className={styles.rightCss}>
            {rowData.firstScore && rowData.firstScore.toFixed(2)}
          </div>
          <img
            alt=""
            className={rowData.isCheck ? styles.arrowUp : styles.arrowDown}
            src={n === 0 ? greenIcon : n === 1 ? yellowIcon : blueIcon}
          />
        </div>
      </div>
    );
  }
}
export default RenderItem;
