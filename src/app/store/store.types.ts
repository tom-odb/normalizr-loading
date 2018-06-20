import { Action } from 'redux';

export interface ProgressAction extends Action {
  loading?: boolean;
  error?: any;
  [key: string]: any;
}

export interface ProgressState<T = any> {
  loading: boolean;
  error: any;
  result: T;
  startFetching: number;
  lastUpdated: number;
}

export type ProgressReducer<T = any> = (state: T, action: ProgressAction) => T;

export interface ProgressOptions {
  type: string;
}

export type StateSelector<T = any> = (state: any) => T;
