import React from 'react';
import CreditDetails from '../SecDetails/CreditDetails';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import redImg from '../../assets/redtriangle.png';
import greenImg from '../../assets/greentriangle.png';
import yellowImg from '../../assets/yellowtriangle.png';
import styles from './Render.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: this.props.rowData.isCheck,
    };
  }
  toggleClick = (data, show) => {
    this.setState({ isShowDetail: !show });
    this.props.toggleClick(data, !show);
  };
  showChain = (n = null) => {
    if (!n) {
      return n === 0 ? n : 'N/A';
    } else if (n > 1000) {
      return '1000+';
    } else if (n < -1000) {
      return '-1000+';
    } else {
      return n;
    }
  };
  render() {
    let idIndex = 0;
    idIndex += 1;
    const { rowData, jump2Data } = this.props;
    const { isShowDetail } = this.state;
    const { chain } = rowData;
    return (
      <div>
        <div
          className={styles.tableCss}
          onClick={() => {
            this.toggleClick(rowData, isShowDetail);
          }}
        >
          <div className={styles.leftCss}>{rowData.name}</div>
          <div className={styles.proCss}>{rowData.project}</div>
          <div className={styles.rankCss}>
            {rowData.rank}/{rowData.total}
          </div>
          <div className={styles.equableCss}>{rowData.score.toFixed(2)}</div>
          <div className={styles.ringRatioCss}>
            {this.showChain(chain)}
            {chain || chain === 0 ? (
              <img
                alt=""
                className={styles.triImg}
                src={chain === 0 ? yellowImg : chain < 0 ? redImg : greenImg}
              />
            ) : (
              <span className={styles.triImg} />
            )}
          </div>
          <div className={styles.rightCss} />
          <div className={styles.rightCss}>
            <img
              alt="箭头"
              className={isShowDetail ? styles.arrowUp : styles.arrowDown}
              src={
                rowData.familyType === 0
                  ? greenIcon
                  : rowData.familyType === 1 ? yellowIcon : blueIcon
              }
            />
          </div>
        </div>
        <CreditDetails
          rowData={rowData}
          jump2Data={(data1, data2, data3, data4) => {
            jump2Data(data1, data2, data3, data4);
          }}
          isShowDetail={isShowDetail}
          idIndex={idIndex}
        />
      </div>
    );
  }
}
export default RenderItem;
