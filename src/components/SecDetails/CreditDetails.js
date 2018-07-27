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
  // 是否展示右侧箭头
  detailTmp = (data, rowData, isShowArrow) => {
    return (
      <div className={`${styles.tableCss} ${styles.liCssThr}`}>
        <div className={styles.leftCss} />
        <div className={styles.proCss2}>{data.project}</div>
        <div className={styles.equableCss}>{data.creditScore.toFixed(2)}</div>
        <div className={styles.ringRatioCss}>
          {this.showChain(Number(data.chain))}
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
          {data.number > 99999 ? '99999+' : Math.round(data.number)}
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
    let i = 0;
    i += 1;
    const rgb = {
      col: 'rgba(82,201,194,0.15)',
      fam: 'rgba(243,169,47,0.15)',
      gro: 'rgba(97,155,222,0.15)',
      higColor: 'rgba(255,89,89,0.10)',
    };
    const { rowData, jump2Data } = this.props;

    return (
      <div
        id={`rowId${i}`}
        dataid={`${rowData.familyType}${rowData.id}`}
        key={rowData.id}
        style={{ paddingBottom: '.14rem', fontSize: '.2rem' }}
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
              {rowData.children == null
                ? ''
                : Object.keys(rowData.children.data).map((key, index) => {
                    const dataList = rowData.children.data[index];
                    return (
                      <li key={`fir${key}`} className={styles.liCssFir}>
                        <div className={styles.tableCss}>
                          <div className={styles.leftCss}>{`${index}`}</div>
                          <div className={styles.proCss2}>{dataList.project}</div>
                          <div className={styles.equableCss}>{dataList.creditScore.toFixed(2)}</div>
                          <div className={styles.ringRatioCss}>
                            {this.showChain(Number(dataList.chain))}
                            {dataList.chain || dataList.chain === 0 ? (
                              <img
                                alt="img"
                                className={styles.triImg}
                                src={
                                  dataList.chain === 0
                                    ? yellowImg
                                    : dataList.chain < 0 ? redImg : greenImg
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
                          {Object.keys(dataList.data).map((key1, i1) => {
                            return (
                              <li key={`sec${key1}`} className={styles.liCssSec}>
                                <div className={styles.tableCss}>
                                  <div className={styles.leftCss}>{`${i}.${i1}`}</div>
                                  <div className={styles.proCss2}>
                                    {dataList.data[key1].project}
                                  </div>
                                  <div className={styles.equableCss}>
                                    {dataList.data[key1].creditScore.toFixed(2)}
                                  </div>
                                  <div className={styles.ringRatioCss}>
                                    {this.showChain(Number(dataList.data[key1].chain))}
                                    {dataList.data[key1].chain ||
                                    dataList.data[key1].chain === 0 ? (
                                      <img
                                        alt="img"
                                        className={styles.triImg}
                                        src={
                                          dataList.data[key1].chain === 0
                                            ? yellowImg
                                            : dataList.data[key1].chain < 0 ? redImg : greenImg
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
                                  {Object.keys(dataList.data[key1].data).map(key2 => {
                                    // 判断number是否为0，0?那行数据不可点击:可点击
                                    return (
                                      <div key={`thr${key2}`}>
                                        {!dataList.data[key1].data[key2].number ? (
                                          <div>
                                            {this.detailTmp(
                                              dataList.data[key1].data[key2],
                                              rowData,
                                              false
                                            )}
                                          </div>
                                        ) : (
                                          <div
                                            onClick={jump2Data.bind(
                                              this,
                                              rowData,
                                              dataList,
                                              dataList.data[key1],
                                              dataList.data[key1].data[key2]
                                            )}
                                          >
                                            {this.detailTmp(
                                              dataList.data[key1].data[key2],
                                              rowData,
                                              true
                                            )}
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
