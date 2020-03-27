import { Reducer } from "redux";
import { EffectsCommandMap } from "dva";

export interface ResponseData {
  code: number;
  data: any;
}

export interface DuaApi {
  fetch?: (object: any) => Promise<ResponseData>;
  fetchPart?: (object: any) => Promise<ResponseData>;
  create?: (object: any) => Promise<ResponseData>;
  update?: (mutable: string | any, object?: any) => Promise<ResponseData>;
  remove?: (id: string) => Promise<ResponseData>;
  detail?: (id: string) => Promise<ResponseData>;
}

export interface Action {
  type?: string;
  payload: any;
}

export interface Map<T> {
  [key: string]: T;
}

export interface State<T> {
  byId: Map<T>;
  allIds: T[];
  total: number;
}

export type Effect = (action: Action, effects: EffectsCommandMap) => void;

export interface DuaModel<T> {
  namespace: string;
  state: State<T>;
  effects: {
    fetch: Effect;
    fetchPart: Effect;
    create: Effect;
    update: Effect;
    remove: Effect;
    detail: Effect;
  };
  reducers: {
    onFetch: Reducer<State<T>, any>;
    onFetchPart: Reducer<State<T>, any>;
    onCreate: Reducer<State<T>, any>;
    onUpdate: Reducer<State<T>, any>;
    onRemove: Reducer<State<T>, any>;
  };
}

export interface ListData {
  id: string;
  [key: string]: any;
}

export interface SingleTreeData {
  id: string;
  parentId?: string;
  [key: string]: any;
}

export interface MultipleTreeData {
  id: string;
  parentIds?: string[];
  [key: string]: any;
}

export interface Drive<T, S extends State<T> = State<T>> {
  normalize?: (list: T[], total?: number) => S;
  transform?: (byId: Map<T>) => T[];
  reduce?: (state: State<T>, s?: any) => S;
  mixed?: boolean;
}

export interface Drives<T, S extends State<T> = State<T>> {
  [key: string]: Drive<T, S>;
}

export interface Driver<T, S extends State<T> = State<T>> {
  get: (id: string) => Drive<T, S>;
  clone: (id: string, drive: Drive<T, S>) => Drive<T, S>;
  list: () => string[];
  install: (id: string, plugin: Drive<T, S>) => void;
}

export interface Option {
  type?: string;
  drive?: Drive<any>;
}
