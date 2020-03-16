import React from 'react';
import { connect } from 'dva';
const Home: React.FC<any> = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '24px',
      }}
    >
      <a href={'/example'}>基本用法</a>
      <a href={'/example2'} style={{ marginTop: '24px' }}>
        进阶用法
      </a>
    </div>
  );
};

export default Home;
