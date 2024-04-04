import { City } from './city-interface'

export interface StateCity extends City {
  stateName: string
  stateCode: string
}
