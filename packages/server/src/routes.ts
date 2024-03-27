import express from 'express'
import { TouristAttractionsController } from './controllers/tourist-attractions.controller'

const routes = express.Router()

/* Tourist Attractions */

routes.get(
  '/tourist-attractions',
  TouristAttractionsController.listTouristAttractions,
)
routes.get(
  '/tourist-attractions/:id',
  TouristAttractionsController.fetchTouristAttraction,
)
routes.post(
  '/tourist-attractions',
  TouristAttractionsController.createTouristAttraction,
)
routes.put(
  '/tourist-attractions/:id',
  TouristAttractionsController.updateTouristAttraction,
)
routes.delete(
  '/tourist-attractions/:id',
  TouristAttractionsController.invalidTouristAttraction,
)

/* City */

routes.get('/cities', TouristAttractionsController.listCities)
routes.post('/cities', TouristAttractionsController.createCity)

export default routes
