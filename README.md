# state-tool

利用 react hooks 特性来做状态管理，功能比较简单

## 使用方法

### 简单使用

创建一个 store.js 文件，需要有 initState 和 reducer 函数

```javascript
// store.js
import StateTool from 'state-tool';
// 可以通过设置 StateTool 的 debug 属性来开启日志输出
// StateTool.debug = true

const initState = {
  count: 0
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, age: state.count + 1 };
    default:
      return state;
  }
};

export const { Provider, useDispatch, useStore } = StateTool.createStore(
  initState,
  reducer
);

// index.js
import Provider from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// App.js
import React from 'react';

import {
  useStore as useCountStore,
  useDispatch as useCountDispatch
} from './store';

function App() {
  const dispatchCount = useCountDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: 'add' });
        }}
      >
        add
      </button>
      <Age />
    </div>
  );
}

const Age = props => {
  const store = useCountStore();
  return <div>count is: {store.count}</div>;
};
export default App;
```

合并多个 store

```javascript
import StateTool from 'state-tool';
import { Provider as Provider1 } from 'store1.js';
import { Provider as Provider2 } from 'store2.js';
const Provider = StateTool.combindProvider(Provider1, Provider2);
```

## License

[MIT](LICENSE).
