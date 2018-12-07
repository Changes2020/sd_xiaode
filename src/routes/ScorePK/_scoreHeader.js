import React from 'react';
import { randomString } from '../../utils/radomUtils';
import styles from './_score.less';

class RenderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  negative = (paramsObj = [], arrLength = 1, type) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map(item => {
      return (
        <div
          key={randomString(1)}
          className={arrLength > 2 ? styles.m_formulaButton : styles.m_formulaButton2}
        >
          <span className={type === 1 ? styles.u_nameClass : styles.u_nameClass1}>
            {item.avgScore.toFixed(2)}
          </span>
        </div>
      );
    });
    return <div className={styles.widthDiv}>{liList}</div>;
  };
  contentDiv = (paramsObj, arrLength, type) => {
    return (
      <div className={type === 1 ? styles.m_studyScore : styles.m_studyScore1}>
        <span className={type === 1 ? styles.u_studyWord : styles.u_studyWord1}>
          {type === 1 ? '正面均分' : '负面均分'}
        </span>
        {this.negative(paramsObj, arrLength, type)}
      </div>
    );
  };

  render() {
    const { paramsObj = [], type = 1 } = this.props;
    const arrLength = paramsObj.length;
    return (
      <div>
        <div className={type === 1 ? styles.heightDiv : styles.heightDiv1} />
        {this.contentDiv(paramsObj, arrLength, type)}
      </div>
    );
  }
}
export default RenderHeader;
