import React from 'react';
import styles from './_score.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList = (data, index) => {
    const liList = data.map(item => {
      return (
        <div
          key={index}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <span className={styles.u_unitScore}>{item.childNode[index].avgScore.toFixed(2)}</span>
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
                <div key={item.id} className={styles.u_colCss}>
                  <span className={styles.u_leftCss}>{item.dimensionName}</span>
                  {this.renderList(paramsObj, index)}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
export default RenderItem;
