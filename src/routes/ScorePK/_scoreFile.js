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
        <span className={styles.u_avgClass}>{`${paramsObj.rank}/${paramsObj.allObj}`}</span>
      </div>
    );
  };

  render() {
    const { paramsObj = {} } = this.props;
    const arrLength = paramsObj.length;
    return (
      <div className={arrLength > 2 ? styles.pk3Score : styles.pk2Score}>
        <span className={styles.pkWordCls}>PK</span>
        {this.scoreRight(paramsObj[0])}
        {this.scoreRight(paramsObj[1])}
        {this.scoreRight(paramsObj[2])}
      </div>
    );
  }
}
