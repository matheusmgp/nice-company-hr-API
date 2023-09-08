export interface IBaseRepository<T> {
  getAll(): Promise<any[]>;
  getById(id: number): Promise<any>;
  create(payload: T): Promise<any>;
  update(id: number, payload: any): Promise<any>;
  getByCpf(cpf: string): Promise<any>;
}
