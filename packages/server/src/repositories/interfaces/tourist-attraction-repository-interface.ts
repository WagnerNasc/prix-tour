import { TouristAttraction } from '@/use-cases/interfaces/tourist-attraction-interface'

export interface ITouristAttractionRepository {
  findById(id: string): Promise<{ data: TouristAttraction } | null>
  findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: TouristAttraction[]; total: number }>
  create(TouristAttraction: TouristAttraction): Promise<void>
}
