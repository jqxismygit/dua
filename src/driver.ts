import { Driver, Drives } from "./types";
import FlatProxy from "./drives/flat";
import SingleTreeProxy from "./drives/single-tree";
import MultipleTreeProxy from "./drives/multiple-tree";

const drives: Drives<any> = {};

drives["flat"] = FlatProxy;
drives["single-tree"] = SingleTreeProxy;
drives["multiple-tree"] = MultipleTreeProxy;

export default {
  get: id => drives[id],
  clone: (id, drive) => {
    const dest = drives[id];
    if (dest) {
      return {
        ...dest,
        ...drive
      };
    } else {
      return null;
    }
  },
  list: () => Object.keys(drives),
  install: (id, plugin) => (drives[id] = plugin)
} as Driver<any>;
