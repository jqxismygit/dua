import React from 'react';
import { connect } from 'dva';
const Demo = (props: any) => {
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
}))(Demo);
