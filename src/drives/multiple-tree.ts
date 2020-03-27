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

const buildTree = (workspace: WorkspaceItem[]) => {
  const depth = workspace.length - 1;
  for (let i = depth; i > 0; --i) {
    Object.keys(workspace[i]).forEach(c => {
      const element = workspace[i][c];
      const parentId = element.parentIds[0];
      const parent = workspace[i - 1][parentId];
      if (parent) {
        if (parent.children) {
          parent.children = [].concat(parent.children, []);
        } else {
          parent.children = [element];
        }
      }
    });
  }
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
    const normalized: any = Object.keys(byId || {}).reduce(
      (workspace, id) => buildWorkspace(workspace, byId[id]),
      {} as any,
    );
    const workspace = Object.keys(normalized).map(i => normalized[i]);
    return buildTree(workspace);
  },
  reduce: state => state,
};

export default drive;
