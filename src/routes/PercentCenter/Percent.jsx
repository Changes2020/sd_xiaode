import React from 'react';
import { CURRENT_USER_INFO, FRONT_ROLE_TYPE_LIST } from '../../utils/typeDict';
import { dimensionAuthority } from '../../utils/dimensionAuthority';
import itemList from '../../utils/personalJson';
import Detail from './percentItem';
import styles from './Percenter.less';
import lightBg from '../../assets/lightBG.png';
import adressIcon from '../../assets/address.svg';
import shapeIcon from '../../assets/Shape.svg';
import classIcon from '../../assets/class.svg';
import collegeIcon from '../../assets/college.svg';
import { getItem } from '../../utils/localStorage';

const userInfo = getItem(CURRENT_USER_INFO).value || {};
const allOrgMap = getItem('allOrgMap').value || {};

class Percent extends React.Component {
  getRoleName = () => {
    const { groupType } = userInfo;
    let roleName = '';
    FRONT_ROLE_TYPE_LIST.forEach(item => {
      if (groupType === item.id) roleName = item.name;
    });
    return roleName;
  };
  getOrgName = () => {
    const { groupId, groupType } = userInfo;
    const dataOrg = dimensionAuthority(allOrgMap, groupId, groupType); // 获取授权数据

    const orgDetail = groupType === 'boss' || groupType === 'admin' ? '' : dataOrg[groupType][0];

    let newName = '';

    switch (groupType) {
      case 'boss':
        break;
      case 'admin':
        break;
      case 'college':
        newName = `${orgDetail.collegeName}`;
        break;
      case 'family':
        newName = `${orgDetail.collegeName} / ${orgDetail.familyName} `;
        break;
      case 'class':
      case 'group':
        newName = `${orgDetail.collegeName} / ${orgDetail.familyName} / ${orgDetail.groupName}`;
        break;
      default:
        console.warn('传递用户权限有误');
    }
    return newName;
  };
  render() {
    // 获取权限用户数据
    const { name, userId } = userInfo;
    const isShowName = this.getOrgName(); // boss和admin权限不展示组织信息

    return (
      <div className={styles.m_percentWrap}>
        <div className={styles.u_header}>
          <img src={lightBg} alt="BG" className={styles.bgCls} />
          <div className={styles.infoCls}>
            <div className={styles.userInfo}>
              <img src={shapeIcon} alt="name" className={styles.hdIcon} />
              <span>{!name ? userId : name}</span>
              <div className={styles.addressCls}>
                <img src={adressIcon} alt="name" className={styles.addresIcon} />
                <span>北京</span>
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
      </div>
    );
  }
}

export default Percent;
