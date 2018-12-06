import React from 'react';
import ScoreDetail from './_scoreDetail';
import styles from './_score.less';

class RenderItem extends React.Component {
  // 渲染二级数据
  renderList = (data, index) => {
    const liList = data.map(item => {
      return (
        <div
          key={index}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <div className={styles.u_unitScore}>{item.childNode[index].avgScore.toFixed(2)}</div>
        </div>
      );
    });
    return <div className={styles.u_rightCss}>{liList}</div>;
  };
  render() {
    const { paramsObj = [] } = this.props;
    return (
      <div className={styles.m_container}>
        {paramsObj.length > 0
          ? paramsObj[0].childNode.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className={styles.u_colCss}>
                    <span className={styles.u_leftCss}>{item.dimensionName}</span>
                    {this.renderList(paramsObj, index)}
                  </div>
                  <ScoreDetail paramsObj={item.pkReault} arrowShow={item.originObj.arrowShow} />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
export default RenderItem;
