export class TouristAttractionAlreadyExists extends Error {
  constructor() {
    super('Tourist attraction already exists in this state.')
  }
}
