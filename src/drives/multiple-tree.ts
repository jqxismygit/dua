import { Drive, MultipleTreeData } from '../types';

interface WorkspaceItem {
  [key: string]: MultipleTreeData;
}
//该算法时间复杂度是n,按层级深度先分类
const buildWorkspace = (
  workspace: WorkspaceItem[],
  current: MultipleTreeData,
) => {
  const depth = (current.parentIds && current.parentIds.length) || 0;
  if (!workspace[depth]) {
    workspace[depth] = {};
  }
  workspace[depth][current.id] = current;
  return workspace;
};

//从最底层的节点开始遍历，慢慢的把节点挂到他的父节点上
const buildTree = (workspace: WorkspaceItem[]) => {
  const depth = workspace.length - 1;
  for (let i = depth; i > 0; --i) {
    Object.keys(workspace[i]).forEach(c => {
      const element: MultipleTreeData = workspace[i][c];
      if (element.parentIds && element.parentIds.length > 0) {
        const parentId = element.parentIds[0];
        const parent = workspace[i - 1][parentId];
        if (parent) {
          if (parent.children) {
            parent.children.push(element);
          } else {
            parent.children = [element];
          }
        }
      }
    });
  }
  //最后取第一层，就是一个完整的树
  if (workspace && workspace.length > 0) {
    return Object.keys(workspace[0]).map(c => workspace[0][c]);
  } else {
    return [];
  }
};

const drive: Drive<MultipleTreeData> = {
  normalize: (list, total) => {
    const normalized = (list &&
      list.reduce(
        (prev, c) => {
          if (c && c.id) {
            prev.byId[c.id] = c;
            prev.workspace = buildWorkspace(prev.workspace, c);
          }
          return prev;
        },
        { byId: {}, workspace: [] } as any,
      )) || { byId: {}, workspace: [] };
    return {
      byId: normalized.byId,
      allIds: buildTree(normalized.workspace),
      total: typeof total === 'number' ? total : list.length,
    };
  },
  transform: byId => {
    //这里为了防止出问题把byId里面的children给去掉
    const normalized: any = Object.keys(byId || {}).reduce(
      (workspace, id) =>
        buildWorkspace(workspace, { ...byId[id], children: undefined }),
      {} as any,
    );
    const workspace = Object.keys(normalized).map(i => normalized[i]);
    return buildTree(workspace);
  },
  reduce: state => state,
};

export default drive;
