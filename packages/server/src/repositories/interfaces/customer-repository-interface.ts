import { Customer } from '../../use-cases/interfaces/customer-interface'

export interface ICustomerRepository {
  findByEmail(name: string): Promise<Customer | null>
  findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: Customer[]; total: number }>
  create(Customer: Customer): Promise<void>
}
