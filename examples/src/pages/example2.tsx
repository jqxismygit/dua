import React from 'react';
import { connect } from 'dva';
const Example2 = (props: any) => {
  const { users, profile, dispatch } = props;
  React.useEffect(() => {
    dispatch({
      type: 'user2/fetch',
    });
  }, []);
  console.log('users = ', users);
  console.log('profile = ', profile);
  return (
    <div>
      {users.map(i => (
        <div key={i.name}>{i.name}</div>
      ))}
    </div>
  );
};

export default connect(({ user2, profile }) => ({
  users: user2.allIds,
  profile: user2.profile
}))(Example2);
