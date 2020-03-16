# dua

dua是封装的基于dva的数据流，主要是为了统一model的数据结构，减少大量重复性的创建model相关的代码

## 基础使用

- 定义model文件

```js
import { create } from 'dua';
//可以换成其他的请求库
import request from 'umi-request';

export const fetchUser = () => request.get('/users');

const model = create('user', {
  fetch: fetchUser,
});

export default {
  namespace: 'user', //umi3会对model文件进行识别，umi2不需要这个
  ...model,
};

```

- 使用model

```js

import React from 'react';
import { connect } from 'dva';
const Example = (props) => {
  const { users, dispatch } = props;
  React.useEffect(() => {
    dispatch({
      type: 'user/fetch',
    });
  }, []);
  return (
    <div>
      {users.map(i => (
        <div key={i.name}>{i.name}</div>
      ))}
    </div>
  );
};

export default connect(({ user }) => ({
  users: user.allIds,
}))(Example);

```

## 进阶使用(TODO)