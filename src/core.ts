import { DuaApi, DuaModel, Option } from "./types";
import driver from "./driver";

export default function create<T>(
  namespace: string,
  api: DuaApi,
  option?: Option
): DuaModel<T> {
  const { fetch, fetchPart, create, update, remove, detail } = api;
  const type = (option && option.type) || "flat";
  const drive = (option && option.drive) || driver.get(type);
  if (!drive) {
    throw new Error(`no drive for this type [${type}]`);
  }
  const { transform, normalize, mixed } = drive;
  const reduce = drive.reduce;
  return {
    namespace,
    state: {
      byId: {},
      allIds: [],
      total: 0,
    },
    effects: {
      *fetch({ payload }, { call, put, select }) {
        if (fetch) {
          const response = yield call(fetch, payload);
          if (response && (response.code === 200 || response.code === 0)) {
            //TODO这个retlist是java的，以后肯定要一致
            const list =
              response.data.list ||
              response.data.retlist ||
              response.data ||
              [];
            const total = response.data.total || list.length;
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onFetch",
              payload: {
                list,
                total,
                __extra__,
              },
            });
            return response || true;
          }
        }
        return false;
      },
      *fetchPart({ payload }, { call, put, select }) {
        if (fetchPart) {
          const response = yield call(fetchPart, payload);
          if (response && (response.code === 200 || response.code === 0)) {
            const list = response.data.list || response.data || [];
            const total = response.data.total;
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onFetchPart",
              payload: {
                list,
                total,
                __extra__,
              },
            });
            return response || true;
          }
        }
        return false;
      },
      *create({ payload }, { call, put, select }) {
        if (create) {
          const response = yield call(create, payload);
          if (response && (response.code === 200 || response.code === 0)) {
            const data = response.data;
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onCreate",
              payload: {
                ...payload,
                ...data,
                __extra__,
              },
            });
            return response || true;
          }
        }
        return false;
      },
      *update({ payload }, { call, put, select }) {
        if (update) {
          const { id, ...otherData } = payload || {};
          const response = yield call(update, id || payload, otherData);
          if (response && (response.code === 200 || response.code === 0)) {
            const data = response.data;
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onUpdate",
              payload: {
                ...payload,
                ...data,
                __extra__,
              },
            });
            return response || true;
          }
        }
        return false;
      },
      *remove({ payload }, { call, put, select }) {
        if (remove) {
          const id = (payload && payload.id) || payload;
          const response = yield call(remove, id);
          if (response && (response.code === 200 || response.code === 0)) {
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onRemove",
              payload: { id: id, __extra__ },
              __extra__,
            });
            return response || true;
          }
        }
        return false;
      },
      *detail({ payload }, { call, put, select }) {
        if (detail) {
          // const id = (payload && payload.id) || payload;
          const response = yield call(detail, payload);
          if (response && (response.code === 200 || response.code === 0)) {
            const data = response.data;
            const __extra__ = mixed
              ? yield select((state: any) => state)
              : null;
            yield put({
              type: "onUpdate",
              payload: data,
              __extra__,
            });
            return response || true;
          }
        }
        return false;
      },
    },
    reducers: {
      onFetch(state, { payload }) {
        const { list, total, __extra__ } = payload;
        const normalized = normalize(list, total);
        return reduce({ ...state, ...normalized }, __extra__);
      },

      onFetchPart(state, { payload }) {
        const { list, total, __extra__ } = payload;

        function getListByTree(tree: any[]) {
          return tree.reduce((prev, c) => {
            if (c.children) {
              prev = prev.concat(getListByTree(c.children));
            }
            prev = prev.concat({ ...c, children: undefined });
            return prev;
          }, []);
        }
        const treeList = getListByTree(state.allIds);
        const normalized = normalize(
          [].concat(treeList, list),
          total ? total : state.total + list.length
        );
        return reduce({ ...state, ...normalized }, __extra__);
      },

      onCreate(state, { payload }) {
        if (payload && payload.id) {
          const byId = { ...state.byId, [payload.id]: payload };
          const allIds = transform(byId);
          return reduce(
            { ...state, byId, allIds, total: state.total + 1 },
            payload.__extra__
          );
        } else {
          return state;
        }
      },

      onUpdate(state, { payload }) {
        if (payload) {
          if (payload.id) {
            const byId = { ...state.byId, [payload.id]: payload };
            const allIds = transform(byId);
            return reduce({ ...state, byId, allIds }, payload.__extra__);
          } else {
            //如果没有ID的话给他一个固定ID(__id__)
            const byId = { ...state.byId, __auto_id__: payload };
            const allIds = transform(byId);
            return reduce({ ...state, byId, allIds }, payload.__extra__);
          }
        } else {
          return state;
        }
      },

      onRemove(state, { payload }) {
        if (payload && payload.id) {
          const byId = { ...state.byId };
          delete byId[payload.id];
          const allIds = transform(byId);
          return reduce(
            { ...state, byId, allIds, total: state.total - 1 },
            payload.__extra__
          );
        } else {
          return state;
        }
      },
    },
  };
}
