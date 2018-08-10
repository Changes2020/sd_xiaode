import React, { Component } from 'react';
import { List } from 'antd-mobile';
import redImg from '../../assets/redtriangle.png';
import greenImg from '../../assets/greentriangle.png';
import yellowImg from '../../assets/yellowtriangle.png';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import styles from './CreditDetails.less';

class SecDetails extends Component {
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

  // 是否展示右侧箭头
  detailTmp = (data, rowData, isShowArrow) => {
    return (
      <div className={`${styles.tableCss} ${styles.liCssThr}`}>
        <div className={styles.leftCss} />
        <div className={styles.proCss2}>{data.name}</div>
        <div className={styles.equableCss}>{data.score.toFixed(2)}</div>
        <div className={styles.ringRatioCss}>
          {this.showChain(data.chain)}
          {data.chain || data.chain === 0 ? (
            <img
              alt="img"
              className={styles.triImg}
              src={data.chain === 0 ? yellowImg : data.chain < 0 ? redImg : greenImg}
            />
          ) : (
            <span className={styles.triImg} />
          )}
        </div>

        <div className={styles.countCss}>
          {data.rawValue > 99999 ? '99999+' : Math.round(data.rawValue)}
          {data.unit}
        </div>

        <div className={styles.rightCss}>
          {isShowArrow && rowData.arrowShow ? (
            <img
              alt="img"
              className={styles.arrowR}
              src={
                rowData.familyType === 0
                  ? greenIcon
                  : rowData.familyType === 1 ? yellowIcon : blueIcon
              }
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  };

  render() {
    const rgb = {
      col: 'rgba(82,201,194,0.15)',
      fam: 'rgba(243,169,47,0.15)',
      gro: 'rgba(97,155,222,0.15)',
      higColor: 'rgba(255,89,89,0.10)',
    };

    const { rowData, isShowDetail, jump2Data } = this.props;

    return (
      <div
        key={rowData.id}
        style={{ fontSize: '.2rem', display: !isShowDetail ? 'none' : 'block' }}
      >
        <List
          className={styles.mylist}
          prefixCls="mylist"
          style={{
            background:
              rowData.familyType === 0 ? rgb.col : rowData.familyType === 1 ? rgb.fam : rgb.gro,
          }}
        >
          <List.Item prefixCls="mylist">
            <ul className={styles.ulCss}>
              {rowData.dimensions.length === 0
                ? null
                : rowData.dimensions[0].dimensions.map((key, index) => {
                    const n = index + 1;
                    return (
                      <li key={`fir${n}`} className={styles.liCssFir}>
                        <div className={styles.tableCss}>
                          <div className={styles.leftCss}>{`${index + 1}`}</div>
                          <div className={styles.proCss2}>{key.name}</div>
                          <div className={styles.equableCss}>{key.score.toFixed(2)}</div>
                          <div className={styles.ringRatioCss}>
                            {this.showChain(key.chain)}
                            {key.chain || key.chain === 0 ? (
                              <img
                                alt="img"
                                className={styles.triImg}
                                src={
                                  key.chain === 0 ? yellowImg : key.chain < 0 ? redImg : greenImg
                                }
                              />
                            ) : (
                              <span className={styles.triImg} />
                            )}
                          </div>
                          <p className={styles.countCss} />
                          <p className={styles.rightCss} />
                        </div>
                        <ul>
                          {key.dimensions.map((key1, i1) => {
                            const n2 = i1 + 1;
                            return (
                              <li key={`sec${n2}`} className={styles.liCssSec}>
                                <div className={styles.tableCss}>
                                  <div className={styles.leftCss}>{`${index + 1}.${i1 + 1}`}</div>
                                  <div className={styles.proCss2}>{key1.name}</div>
                                  <div className={styles.equableCss}>{key1.score.toFixed(2)}</div>
                                  <div className={styles.ringRatioCss}>
                                    {this.showChain(key1.chain)}
                                    {key1.chain || key1.chain === 0 ? (
                                      <img
                                        alt="img"
                                        className={styles.triImg}
                                        src={
                                          key1.chain === 0
                                            ? yellowImg
                                            : key1.chain < 0 ? redImg : greenImg
                                        }
                                      />
                                    ) : (
                                      <span className={styles.triImg} />
                                    )}
                                  </div>
                                  <p className={styles.countCss} />
                                  <p className={styles.rightCss} />
                                </div>
                                <div>
                                  {key1.dimensions.map((key2, i2) => {
                                    const n3 = i2 + 1;
                                    // 判断number是否为0，0?那行数据不可点击:可点击
                                    return (
                                      <div key={`thr${n3}`}>
                                        {!key2.rawValue ? (
                                          <div>{this.detailTmp(key2, rowData, false)}</div>
                                        ) : (
                                          <div onClick={() => jump2Data(rowData, key, key1, key2)}>
                                            {this.detailTmp(key2, rowData, true)}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
            </ul>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default SecDetails;
