export class DatabaseError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
