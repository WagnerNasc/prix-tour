import { ListTouristAttractionsUseCaseRequest } from '@use-cases/tourist-attraction/list-tourist-attractions.use-case'
import { TouristAttraction } from '@use-cases/interfaces/tourist-attraction-interface'
import { OmitProps } from '@helpers/omit'
import { Optional } from '@helpers/optional'

export interface ITouristAttractionRepository {
  findById(id: string): Promise<{ data: TouristAttraction } | null>
  findManyWithFilter({
    page,
    pageSize,
    filter,
  }: ListTouristAttractionsUseCaseRequest): Promise<{
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
