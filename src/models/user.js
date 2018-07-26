
export default {

    namespace: 'user',
  
    state: {
      count:0
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        const {location={}}=history;
        const {pathname}=location;
        if(pathname==='/user/login'){
         //进行授权
        }
        console.log(123)
        
      },
    },
  
    effects: {
      *login({ payload }, { call, put }) {  // eslint-disable-line
      const count=3;
        yield put({ type: 'save' ,
        payload:{count}});
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };