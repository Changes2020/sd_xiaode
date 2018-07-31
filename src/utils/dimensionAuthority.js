import { arrayNoReapeat } from './arrayNoReapeat';

export function dimensionAuthority(orgArr, groupId, groupType) {
  // 此方法用于数据详情页面权限的控制进行分组,传递组织机构表,以及用户id用户type
  // ******** 返回的是一个对象,里面包含college,family,group三个个分类,如果admin或者是boss用户的话返回数据都为null
  let authorityOrg = {
    college: [],
    family: [],
    group: [],
    groupType,
  };
  const orgObj = getSameAllGroup(orgArr, groupId, groupType);
  switch (groupType) {
    case 'boss':
      break;
    case 'admin':
      break;
    case 'college':
      authorityOrg = orgObj;
      break;
    case 'family':
      authorityOrg.family = orgObj.family;
      authorityOrg.group = orgObj.group;
      break;
    case 'group':
      authorityOrg.group = orgObj.group;
      break;
    case 'class':
      console.warn('将class用户转换成group用户');
      break;
    default:
      console.warn('传递用户权限有误');
  }
  return authorityOrg;
}

export function highLightData(orgArr, groupId, groupType) {
  let authorityOrg = {
    college: [],
    family: [],
    group: [],
  };
  const orgObj = getSameAllGroup(orgArr, groupId, groupType);
  switch (groupType) {
    case 'boss':
      break;
    case 'admin':
      break;
    case 'college':
    case 'family':
    case 'group':
      authorityOrg = orgObj;
      break;
    case 'class':
      console.warn('将class用户转换成group用户');
      break;
    default:
      console.warn('传递用户权限有误');
  }
  return authorityOrg;
}

export function getSameAllGroup(allOrg, groupId, groupType) {
  // 遍历出相同的组织机构,可能出现自考学院,壁垒学院,此方法也可用于相关高亮
  const returnObj = {
    college: [],
    family: [],
    group: [],
  };
  allOrg.forEach(item => {
    if (item[`${groupType}Id`] === groupId) {
      // 因为并列关系,所以不能采用ifelse
      if (item.collegeId && item.collegeId !== null) {
        // 取出学院
        returnObj.college.push({
          name: item.collegeName,
          groupId: item.collegeId,
          familyType: item.familyType,
        });
      }
      if (item.familyId && item.familyId !== null) {
        // 取出家族
        returnObj.family.push({
          name: item.familyName,
          groupId: item.familyId,
          familyType: item.familyType,
        });
      }
      if (item.groupId && item.groupId !== null) {
        // 取出小组
        returnObj.group.push({
          name: item.groupName,
          groupId: item.groupId,
          familyType: item.familyType,
        });
      }
    }
  });
  // 将遍历的数组用于去重
  Object.keys(returnObj).forEach(key => {
    returnObj[key] = arrayNoReapeat(returnObj[key]);
  });
  return returnObj;
}

export function getAllGroupMap(orgArr, groupType) {
  const returnObj = {
    selfExam: [],
    barrier: [],
    incubator: [],
  };
  for (let i = 0, len = orgArr.length; i < len; i += 1) {
    const item = orgArr[i];
    if (item[`${groupType}Id`]) {
      switch (item.familyType) {
        case 0:
          returnObj.selfExam.push({
            name: item[`${groupType}Name`],
            groupId: item[`${groupType}Id`],
            familyType: item.familyType,
          });
          break;
        case 1:
          returnObj.barrier.push({
            name: item[`${groupType}Name`],
            groupId: item[`${groupType}Id`],
            familyType: item.familyType,
          });
          break;
        case 2:
          returnObj.incubator.push({
            name: item[`${groupType}Name`],
            groupId: item[`${groupType}Id`],
            familyType: item.familyType,
          });
          break;
        default:
          console.warn('其他类型用户');
      }
    }
  }

  Object.keys(returnObj).forEach(key => {
    returnObj[key] = arrayNoReapeat(returnObj[key]);
  });
  return returnObj;
}
