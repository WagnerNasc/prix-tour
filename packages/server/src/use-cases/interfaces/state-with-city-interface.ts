import { City } from './city-interface'

export interface StateWithCity extends City {
  stateName: string
  stateCode: string
}
