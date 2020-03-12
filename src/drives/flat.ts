import { Drive, ListData } from "../types";

const drive: Drive<ListData> = {
  normalize: (list, total) => {
    const byId =
      list &&
      list.reduce((prev, c) => {
        if (c && c.id) {
          prev[c.id] = c;
        }
        return prev;
      }, {} as any);
    return {
      byId: byId || {},
      allIds: list || [],
      total: typeof total === "number" ? total : list.length
    };
  },
  transform: byId =>
    Object.keys(byId || {}).reduce(
      (prev, id) => prev.concat(byId[id]),
      [] as any
    ),
  reduce: state => state
};

export default drive;
