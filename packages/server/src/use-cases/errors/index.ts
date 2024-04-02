export class TouristAttractionAlreadyExists extends Error {
  constructor() {
    super('Tourist attraction already exists in this state.')
  }
}

export class TouristAttractionNotFound extends Error {
  constructor() {
    super('Tourist attraction not found.')
  }
}

export class CityNotFound extends Error {
  constructor() {
    super('City not found.')
  }
}

export class BadRequest extends Error {
  constructor() {
    super('Bad request error.')
  }
}

export class InternalServer extends Error {
  constructor() {
    super('Internal server error.')
  }
}
