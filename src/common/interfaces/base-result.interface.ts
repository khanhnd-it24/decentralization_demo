import { Error } from '../errors/error';

export interface IBaseResult<T> {
  error?: Error | null;
  data?: T | null;
}
