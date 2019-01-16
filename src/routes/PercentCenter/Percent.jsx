/* tip：class用户转成group */
import React from 'react';
import { connect } from 'dva';
import Loading from '../../components/Loading/Loading';
import { CURRENT_USER_INFO, FRONT_ROLE_TYPE_LIST } from '../../utils/typeDict';
import itemList from '../../utils/personalJson';
import Detail from './percentItem';
import styles from './Percenter.less';
import lightBg from '../../assets/lightBG.png';
import lightBg1 from '../../assets/LightBG1.png';
import adressIcon from '../../assets/address.svg';
import shapeIcon from '../../assets/Shape.svg';
import classIcon from '../../assets/class.svg';
import collegeIcon from '../../assets/college.svg';
import { getItem } from '../../utils/localStorage';

const userInfo = getItem(CURRENT_USER_INFO).value || {};

class Percent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { id, userId } = userInfo;
    this.props.dispatch({
      type: 'login/getUserInfoCity',
      payload: { userId, id },
    });
  }
  getRoleName = () => {
    const { groupType } = userInfo;
    let roleName = '';
    FRONT_ROLE_TYPE_LIST.forEach(item => {
      if (groupType === item.id) roleName = item.name;
    });
    return roleName;
  };

  render() {
    // 获取权限用户数据
    const { name, userId } = userInfo;
    const { city, orgData } = this.props.login;
    const isShowName = orgData.split('|').join('/'); // boss和admin权限不展示组织信息
    const indexBg = isShowName ? lightBg : lightBg1;

    return (
      <div className={styles.m_percentWrap}>
        <div className={styles.u_header}>
          <img src={indexBg} alt="BG" className={styles.bgCls} />
          <div className={styles.infoCls}>
            <div className={styles.userInfo}>
              <img src={shapeIcon} alt="name" className={styles.hdIcon} />
              <span>{!name ? userId : name}</span>
              <div className={styles.addressCls}>
                {!city ? null : (
                  <>
                    <img src={adressIcon} alt="name" className={styles.addresIcon} />
                    <span>{city}</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.classInfo}>
              <img src={classIcon} alt="class" className={styles.hdIcon} />
              {this.getRoleName()}
            </div>
            {!isShowName ? null : (
              <div className={styles.collegeInfo}>
                <img src={collegeIcon} alt="college" className={styles.hdIcon} />
                {isShowName}
              </div>
            )}
          </div>
        </div>
        {Object.keys(itemList).map(item => <Detail key={item} datasource={itemList[item]} />)}
        <p className={styles.u_footer}>后端运营中心 - 产研一组</p>
        {/* 处理loading */}
        {this.props.isloading && <Loading />}
      </div>
    );
  }
}
export default connect(({ login, loading }) => ({
  login,
  isloading: loading.effects['login/getUserInfoCity'],
}))(Percent);
