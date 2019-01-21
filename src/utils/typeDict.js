// localstorage后期处理一对多用户的时候会用到
export const CURRENT_USER_INFO = 'userInfo';
export const ALL_ORG_MAP = 'allOrgMap';
export const LOCAL_STORAGE_USER = 'layered_user';

// page url
export const LIGHT_PAGE_HOST = {
  development: 'http://172.16.117.64:8095',
  production: 'http://bi-admin.ministudy.com',
};
export const PAGE_HOST = {
  development: 'http://172.16.117.64:8092',
  production: 'http://bi-m.ministudy.com',
};

export default {
  dateTypeDict: {
    1: '周均数据',
    // 2: '月均数据',
    3: '自定义数据',
  },
  creditTypeDict: {
    1: '学分均分',
    2: '正面均分',
    3: '负面均分',
  },
  groupTypeZHDict: {
    1: '学院',
    2: '家族',
    3: '小组',
  },
  selfExamDict: {
    selfExam: '自考',
    barrier: '壁垒',
    incubator: '孵化器',
  },
  groupTypeDict: {
    1: 'college',
    2: 'family',
    3: 'group',
    4: 'class',
    5: 'boss',
    6: 'admin',
  },
  familyTypeDict: {
    selfExam: 0,
    barrier: 1,
    incubator: 2,
  },
  operateCode: {
    //  用于储存后端log日志用;
    app_login: '0003',
    wechart_login: '0002',
    pk_login: '0001',
  },
  dicName: ['selfExam', 'barrier', 'incubator'], // 学分详情搜索弹框用到
};

// 前端角色类型,level含义是组织结构的层级，1代表选择到学院，2表示选择学院+家族，3代表选择三级，0代表不可选择,isPerformance代表绩效权限
export const FRONT_ROLE_TYPE_LIST = [
  { id: 'college', name: '院长或副院长' },
  { id: 'family', name: '家族长' },
  { id: 'group', name: '运营长' },
  { id: 'class', name: '班主任' },
  { id: 'admin', name: '管理员' },
  { id: 'boss', name: '管理层' },
  { id: 'others', name: '无绩效岗位' },
  { id: 'csmanager', name: '客诉经理' },
  { id: 'cssupervisor', name: '客诉主管' },
  { id: 'csleader', name: '客诉组长' },
  { id: 'csofficer', name: '客诉专员' },
];
