import { find } from 'lodash';

let database = [
  {
    id: '1',
    title: '区域1',
    parentIds: [],
  },
  {
    id: '2',
    title: '区域2',
    parentIds: [],
  },
  {
    id: '3',
    title: '区域3',
    parentIds: [],
  },
  {
    id: '11',
    title: '建筑11',
    parentIds: ['1'],
  },
  {
    id: '12',
    title: '建筑12',
    parentIds: ['1'],
  },
  {
    id: '111',
    title: '楼层111',
    parentIds: ['11', '1'],
  },
  {
    id: '33',
    title: '建筑33',
    parentIds: ['3'],
  },
  {
    id: '333',
    title: '楼层333',
    parentIds: ['33', '3'],
  },
  {
    id: '4444',
    title: '房间4444',
    parentIds: ['333', '33', '3'],
  },
];

let database2 = [
  {
    id: '1',
    title: '区域1',
    parentIds: [],
    info: 'info信息'
  },
  {
    id: '2',
    title: '区域2',
    parentIds: [],
  },
  {
    id: '3',
    title: '区域3',
    parentIds: [],
  },
  {
    id: '11',
    title: '建筑11',
    parentIds: ['1'],
  },
  {
    id: '12',
    title: '建筑12',
    parentIds: ['1'],
  },
  {
    id: '111',
    title: '楼层111',
    parentIds: ['11', '1'],
  },
  {
    id: '33',
    title: '建筑33',
    parentIds: ['3'],
  },
  {
    id: '333',
    title: '楼层333',
    parentIds: ['33', '3'],
  },
  {
    id: '4444',
    title: '房间4444',
    parentIds: ['333', '33', '3'],
  },
];

function fetchRegionList(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {
      list: database,
      total: database.length,
    },
  });
}
function fetchRegionDetail(req, res) {
  const { id } = req.params;
  res.send({
    code: 200,
    message: 'success',
    data: find(database2, o => o.id === id),
  });
}

function createRegionNode(req, res) {
  const id = Date.now() + '';
  res.send({
    code: 200,
    message: 'success',
    data: {
      ...req.body,
      id: id,
    },
  });
}

function updateRegionNode(req, res) {
  const { id } = req.params;
  const current = find(database, o => o.id === id);
  res.send({
    code: 200,
    message: 'success',
    data: {
      ...current,
      ...req.body,
    },
  });
}
function deleteRegionNode(req, res) {
  const { id } = req.params;
  database = database.filter(i => i.id !== id);
  res.send({
    code: 200,
    message: 'success',
  });
}

export default {
  'GET /spaces/spaceTree': fetchRegionList,
  'GET /spaces/:id': fetchRegionDetail,
  'POST /spaces': createRegionNode,
  'PUT /spaces/:id': updateRegionNode,
  'DELETE /spaces/:id': deleteRegionNode,
};
