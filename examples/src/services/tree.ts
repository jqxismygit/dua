import request from 'umi-request';

export const fetchArea = (params: Object) =>
  request.get('/spaces/spaceTree', { params });

export const fetchAreaDetail = (params: any) => {
  const { id } = params;
  return request.get(`/spaces/${id}`, { params });
};

export const createAreaNode = (params: any) => {
  return request.post(`/spaces`, { data: params });
};

export const updateAreaNode = (params: any) => {
  const { id, ...rest } = params;
  return request.put(`/spaces/${id}`, { data: rest });
};

export const deleteAreaNode = (id: string) => {
  return request.delete(`/spaces/${id}`);
};
