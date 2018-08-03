import React from 'react';
import styles from './exportDemention.less';
import { scroll } from '../../utils/scroll';
import top from '../../assets/top.svg';
import download from '../../assets/download.svg';

export default class ExportDemention extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    this.Id.style.display = t > 200 ? 'block' : 'none';
  };
  createRef = Id => {
    this.Id = Id;
  };
  toBackTop = () => {
    const currentY = document.documentElement.scrollTop || document.body.scrollTop;
    scroll(currentY, 0);
    // window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className={styles.floatCotainer}>
        <p className={styles.topBtn} ref={this.createRef} onClick={this.toBackTop}>
          <img src={top} alt="回到顶部" />
        </p>
        <p className={styles.downloadBtn}>
          <img src={download} alt="回到顶部" />
        </p>
      </div>
    );
  }
}
