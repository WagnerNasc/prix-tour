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
  TouristAttractionsController.fetchTouristAttractionById,
)
routes.post(
  '/tourist-attractions',
  TouristAttractionsController.createTouristAttractions,
)
// routes.put('/tourist-attractions/:id', CustomerController.listCustomers)
// routes.delete('/tourist-attractions/:id', CustomerController.listCustomers)

/* City */

routes.post('/cities', TouristAttractionsController.createCity)

export default routes
