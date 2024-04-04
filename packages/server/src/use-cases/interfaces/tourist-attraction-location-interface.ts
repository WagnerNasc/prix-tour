import { TouristAttraction } from './tourist-attraction-interface'

export interface TouristAttractionLocation extends TouristAttraction {
  state_name: string
  state_code: string
}
