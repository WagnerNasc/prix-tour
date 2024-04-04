import { TouristAttraction } from '@use-cases/interfaces/tourist-attraction-interface'
import { OmitProps } from '@helpers/omit'
import { Optional } from '@helpers/optional'
import { Paginated } from '@use-cases/interfaces/paginated-interface'

export interface ITouristAttractionRepository {
  findById(id: string): Promise<{ data: TouristAttraction } | null>
  findManyWithFilter({ page, pageSize, filter }: Paginated): Promise<{
    data: TouristAttraction[]
    total: number
  }>
  delete(TouristAttraction: TouristAttraction): Promise<void>
  update(
    TouristAttraction: Optional<
      OmitProps<TouristAttraction, 'cityId' | 'latitude' | 'longitude'>,
      'name' | 'imageLink'
    >,
  ): Promise<void>
  create(TouristAttraction: TouristAttraction): Promise<void>
}
