import React from 'react';
import { connect } from 'dva';
import { Tree, Card, Button } from 'antd';
const { TreeNode } = Tree;

const Example = (props: any) => {
  const { treeData, dispatch } = props;
  console.log;
  React.useEffect(() => {
    dispatch({
      type: 'tree/fetch',
    }).then(res => {
      console.log('res = ', res);
    });
  }, []);

  const renderTreeNodes = (data: any[]) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode key={item.id} title={item.title}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.title} />;
    });
  console.log('treeData = ', treeData);
  return (
    <div style={{ display: 'flex' }}>
      <Card>
        <Tree blockNode>{renderTreeNodes(treeData)}</Tree>
      </Card>
      <Card>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/create',
              payload: {
                title: '新加区域',
              },
            });
          }}
        >
          添加一级节点
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/create',
              payload: {
                title: '新加建筑',
                parentIds: ['1'],
              },
            });
          }}
        >
          添加二级节点
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/create',
              payload: {
                title: '新加楼层',
                parentIds: ['11', '1'],
              },
            });
          }}
        >
          添加三级节点
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/create',
              payload: {
                title: '新加房间',
                parentIds: ['111', '11', '1'],
              },
            });
          }}
        >
          添加四级节点
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/update',
              payload: {
                id: '1',
                title: '重命名',
              },
            });
          }}
        >
          更新节点
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'tree/remove',
              payload: {
                id: '12',
              },
            });
          }}
        >
          删除节点
        </Button>
      </Card>
    </div>
  );
};

export default connect(({ tree }) => ({
  treeData: tree.allIds,
}))(Example);
