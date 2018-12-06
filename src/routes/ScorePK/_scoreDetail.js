import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './_score.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // 渲染3级数据
  renderList = (data, index,arrowShow,type) => {
    const liList = data.map(item => {
      return (
        <div
          key={index}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <span className={styles.u_unitScore}>{item.childNode[index].avgScore.toFixed(2)}</span>
          <Icon type="right" className={type===1?styles.echartsIcon:styles.echartsIcon2} size="lg" isShow={arrowShow} />
        </div>
      );
    });
    return <div className={styles.u_rightCss}>{liList}</div>;
  };
  render() {
    const { paramsObj = [] ,arrowShow=false,type=1} = this.props;

    return (
      <div className={`${styles.m_container} ${styles.m_regContain}`}>
        {paramsObj.length > 0
          ? paramsObj[0].childNode.map((item, index) => {
              return (
                <div key={item.id} className={`${styles.u_colCss} ${styles.u_regColCss}`}>
                  <span className={styles.u_leftCss}>{item.dimensionName}</span>
                  {this.renderList(paramsObj, index,arrowShow,type)}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
export default RenderItem;
