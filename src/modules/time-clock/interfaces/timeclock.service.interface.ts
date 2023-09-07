export interface ITimeClockService {
  getAll(): Promise<any[]>;
  getById(id: number): Promise<any>;
  create(payload: any): Promise<any>;
  update(id: number, payload: any): Promise<any>;
}
export const ITimeClockService = Symbol('ITimeClockService');
