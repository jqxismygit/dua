import { create } from 'dua';
import {
  fetchArea,
  fetchAreaDetail,
  createAreaNode,
  updateAreaNode,
  deleteAreaNode,
} from '../services/tree';

const model = create(
  'tree',
  {
    fetch: fetchArea,
    create: createAreaNode,
    update: updateAreaNode,
    detail: fetchAreaDetail,
    remove: deleteAreaNode,
  },
  {
    type: 'multiple-tree',
  },
);

export default {
  namespace: 'tree',
  ...model,
};
