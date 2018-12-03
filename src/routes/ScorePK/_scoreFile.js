import React from 'react';
import styles from './ResultList.less';

export default class ScoreFile extends React.Component {
  getData = obj => {
    if (this.props.fnGetData) {
      this.props.fnGetData(obj);
    }
  };
  selecteDate = dateObj => {
    this.getData(dateObj);
  };

  scoreRight = (paramsObj = {}) => {
    return (
      <div className={styles.m_formulaButton}>
        <span className={styles.u_nameClass}>{paramsObj.orgName}</span>
        <br />
        <span className={styles.u_nameClass}>{`${paramsObj.rank}/${paramsObj.allObj}`}</span>
      </div>
    );
  };

  render() {
    const { paramsObj = {} } = this.props;
    const arrLength = paramsObj.length;
    // console.log(paramsObj,paramsObj[0].orgName)
    // const url=
    return (
      <div className={arrLength > 2 ? styles.pk3Score : styles.pk2Score}>
        {/* {this.scoreRight(paramsObj[0])} */}
        <span className={styles.pkWordCls}>PK</span>
        <div className={styles.u_splitLine} />
      </div>
    );
  }
}
