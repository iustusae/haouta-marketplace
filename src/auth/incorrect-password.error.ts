export class IncorrectPasswordError extends Error {
  constructor() {
    super('Wrong Password.');
  }
}
