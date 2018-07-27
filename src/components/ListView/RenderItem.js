import React from 'react';
import CreditDetails from '../SecDetails/CreditDetails';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import styles from './RenderItem.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
    };
  }
  componentDidMount() {}

  render() {
    const { rowData, jump2Data } = this.props;
    const { isShowDetail } = this.state;
    const rgb = {
      col: 'rgba(82,201,194,0.15)',
      fam: 'rgba(243,169,47,0.15)',
      gro: 'rgba(97,155,222,0.15)',
      higColor: 'rgba(255,89,89,0.10)',
    };
    return (
      <div
        className="flex-container"
        style={{
          width: '7.1rem',
          color: '#333',
          marginBottom: '0.14rem',
          background: rowData.lineHeight
            ? rgb.higColor
            : rowData.familyType === 0 ? rgb.col : rowData.familyType === 1 ? rgb.fam : rgb.gro,
        }}
      >
        <div
          className={styles.tableCss}
          onClick={() => {
            this.setState({ isShowDetail: !isShowDetail });
          }}
        >
          <div className={styles.leftCss}>{rowData.category}</div>
          <div className={styles.proCss}>{rowData.project}</div>
          <div className={styles.rankCss}>
            {rowData.rank}/{rowData.total}
          </div>
          <div className={styles.equableCss}>{rowData.creditScore.toFixed(2)}</div>
          <div className={styles.ringRatioCss}>
            {/* {this.showChain(chain)} */}
            {/* {chain||chain===0?<img className={styles.triImg} src={chain===0?yellowImg:chain<0?redImg:greenImg} />:<span className={styles.triImg}></span>} */}
          </div>
          <div className={styles.rightCss} />
          <div className={styles.rightCss}>
            <img
              alt="箭头"
              className={rowData.isCheck ? styles.arrowUp : styles.arrowDown}
              src={
                rowData.familyType === 0
                  ? greenIcon
                  : rowData.familyType === 1 ? yellowIcon : blueIcon
              }
            />
          </div>
        </div>
        <CreditDetails rowData={rowData} jump2Data={jump2Data} isShowDetail={isShowDetail} />
      </div>
    );
  }
}
export default RenderItem;
