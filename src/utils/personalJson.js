import { LIGHT_PAGE_HOST } from './typeDict';
// import score1 from '../assets/score1.png';
import score2 from '../assets/score2.png';
import score3 from '../assets/score3.png';
// import performance1 from '../assets/performance1.png';
import performance2 from '../assets/performance2.png';
// import performance3 from '../assets/performance3.png';
import light1 from '../assets/light1.png';
/*
global API_TYPE
*/
export default {
  XIAODE_SCORE: [
    // {
    //   id: 1,
    //   icon: score1,
    //   name: '小德学分',
    //   pathName: '11',
    // },
    {
      id: 2,
      icon: score2,
      name: '学分使用教程',
      pathName: 'http://bi-m.ministudy.com/static/usercourse',
    },
    {
      id: 3,
      icon: score3,
      name: '学分算法说明',
      pathName: 'http://bi-m.ministudy.com/static/formula?1',
    },
  ],
  XIAODE_PERFORMANCE: [
    //   {
    //     id: 4,
    //     icon: performance1,
    //     name: '小德绩效',
    //     pathName: '11',
    //   },
    {
      id: 5,
      icon: performance2,
      name: '绩效使用教程',
      pathName: 'http://test-api.bd.ministudy.com/static/usercourse',
    },
    //   {
    //     id: 6,
    //     icon: performance3,
    //     name: '学分算法说明',
    //     pathName: '31',
    //   },
  ],
  LIGHT_COLLEGE: [
    {
      id: 7,
      icon: light1,
      name: '能力认证',
      pathName: `${LIGHT_PAGE_HOST[API_TYPE]}/user/login/selfsystem`, // /class/user/login/:type
    },
  ],
};
