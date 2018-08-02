// import typeDict from './typeDict';
// const groupTypeDist=typeDict.groupTypeDict;
export function getSameCollegeAllGroup(allOrg, groupId, groupType) {
  // groupId可以使小组,也可以是小组,groupType是学院家族自考familyType是自考壁垒孵化器
  const returnArr = [];
  const collegeArr = allOrg.filter(
    (
      item // 同一个小组对应只能有一个学院,改方法便利所有小组
    ) => item[`${groupType}Id`] === groupId
  );
  if (collegeArr.length > 0) {
    const { collegeId } = collegeArr[0];
    allOrg.forEach(list => {
      if (list.collegeId === collegeId && list.groupId !== null && list.groupId) {
        const filterArr = returnArr.filter(obj => obj.groupId === list.groupId);
        if (filterArr.length === 0) {
          returnArr.push(list);
        }
      }
    });
  }
  return returnArr;
}
