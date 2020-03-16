import React from 'react';
import { connect } from 'dva';
const Basic: React.FC<any> = props => {
  const { children, dispatch, profile } = props;
  React.useEffect(() => {
    dispatch({
      type: 'profile/detail',
    });
  }, []);
  return <div>{profile && children}</div>;
};

export default connect(({ profile }) => ({ profile: profile.allIds[0] }))(
  Basic,
);
