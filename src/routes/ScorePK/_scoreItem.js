import React from 'react';
import ScoreDetail from './_scoreDetail';
import styles from './_score.less';

class RenderItem extends React.Component {
  // 渲染二级数据
  renderList = (data, index) => {
    const i = `item1${index}`;
    const liList = data.map(item => {
      return (
        <div
          key={i}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <div className={styles.u_unitScore}>{item.childNode[index].avgScore.toFixed(2)}</div>
        </div>
      );
    });
    return <div className={styles.u_rightCss}>{liList}</div>;
  };
  render() {
    const { paramsObj = [], type = 2, selfProps, timeObj } = this.props;
    return (
      <div className={styles.m_container}>
        {paramsObj.length > 0
          ? paramsObj[0].childNode.map((item, index) => {
              const i = `item${index}`;
              return (
                <div key={i} style={{ borderRadius: '0.04rem' }}>
                  <div className={styles.u_colCss}>
                    <span className={styles.u_leftCss}>{item.dimensionName}</span>
                    {this.renderList(paramsObj, index)}
                  </div>
                  <ScoreDetail
                    paramsObj={item.pkReault}
                    arrowShow={item.originObj.arrowShow}
                    type={type}
                    selfProps={selfProps}
                    timeObj={timeObj}
                  />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
export default RenderItem;
