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
  list: () => Object.keys(drives),
  install: (id, plugin) => (drives[id] = plugin)
} as Driver<any>;
