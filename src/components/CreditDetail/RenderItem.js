import React from 'react';
import CreditDetails from '../SecDetails/CreditDetails';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import styles from './Render.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: this.props.rowData.isCheck,
    };
  }
  componentDidMount() {}

  render() {
    const { rowData, jump2Data } = this.props;
    const { isShowDetail } = this.state;
    return (
      <div>
        <div
          className={styles.tableCss}
          onClick={() => {
            this.setState({ isShowDetail: !isShowDetail });
          }}
        >
          <div className={styles.leftCss}>{rowData.name}</div>
          <div className={styles.proCss}>{rowData.project}</div>
          <div className={styles.rankCss}>
            {rowData.rank}/{rowData.total}
          </div>
          <div className={styles.equableCss}>{rowData.score.toFixed(2)}</div>
          <div className={styles.ringRatioCss}>
            {/* {this.showChain(chain)} */}
            {/* {chain||chain===0?<img className={styles.triImg} src={chain===0?yellowImg:chain<0?redImg:greenImg} />:<span className={styles.triImg}></span>} */}
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
          jump2Data={data => jump2Data(data)}
          isShowDetail={isShowDetail}
        />
      </div>
    );
  }
}
export default RenderItem;
