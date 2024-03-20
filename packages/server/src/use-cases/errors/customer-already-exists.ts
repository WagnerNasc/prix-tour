export class CustomerAlreadyExists extends Error {
  constructor() {
    super('Customer already exists.')
  }
}
