import dva from 'dva';
import browserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({history: browserHistory()});

// 2. Plugins
app.use(createLoading());

// 3. Model  用于全局页面之间的交互
// app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
export default app._store;
