import { Drive, SingleTreeData } from "../types";

//一次遍历找出所有子节点的children

const build = (workspace: any, current: SingleTreeData) => {
  //初始化
  if (!workspace.roots) {
    workspace.roots = [];
  }
  if (!workspace.childMap) {
    workspace.childMap = {};
  }

  if (current.parentId) {
    if (workspace.childMap[current.parentId]) {
      workspace.childMap[current.parentId].push(current);
    } else {
      workspace.childMap[current.parentId] = [current];
    }
  } else {
    if (!workspace.childMap.hasOwnProperty(current.id)) {
      workspace.childMap[current.id] = [];
    }
    workspace.roots.push(current);
  }
  return workspace;
};

const buildRelationShip = (node: any, map: any) => {
  const children = map[node.id];
  children &&
    children.forEach((element: any) => {
      buildRelationShip(element, map);
    });
  node.children = children;
  return node;
};

const drive: Drive<SingleTreeData> = {
  normalize: (list, total) => {
    const normalized = (list &&
      list.reduce(
        (prev, c) => {
          if (c && c.id) {
            prev.byId[c.id] = c;
            prev.workspace = build(prev.workspace, c);
          }
          return prev;
        },
        { byId: {}, workspace: {} } as any
      )) || { byId: {}, workspace: {} as any };
    return {
      byId: normalized.byId,
      allIds: normalized.workspace.roots.map((i: any) =>
        buildRelationShip(i, normalized.workspace.childMap)
      ),
      total: typeof total === "number" ? total : list.length
    };
  },
  transform: byId => {
    const normalized: any = Object.keys(byId || {}).reduce(
      (workspace, id) => build(workspace, byId[id]),
      {}
    );
    return normalized.workspace.roots.map((i: any) =>
      buildRelationShip(i, normalized.workspace.childMap)
    );
  },
  reduce: state => state
};

export default drive;
