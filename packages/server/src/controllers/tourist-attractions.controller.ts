import { makeFetchTouristAttractionUseCase } from '../use-cases/factories/tourist-attraction/make-fetch-tourist-attraction.use-case'
import { TouristAttractionAlreadyExists } from '../use-cases/errors/tourist-attraction-already-exists'
import { makeCreateCityUseCase } from '../use-cases/factories/tourist-attraction/make-create-city'
import { makeCreateTouristAttractionUseCase } from '../use-cases/factories/tourist-attraction/make-create-tourist-attraction'
import { makeListTouristAttractionsUseCase } from '../use-cases/factories/tourist-attraction/make-list-tourist-attractions.use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class TouristAttractionsController {
  static async listTouristAttractions(req: Request, res: Response) {
    try {
      const registerQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
      })

      const { filter, page } = registerQuerySchema.parse(req.query)
      const listTouristAttractionsUseCase = makeListTouristAttractionsUseCase()
      const touristAttractions = await listTouristAttractionsUseCase.execute({
        filter,
        page,
      })

      return res.json(touristAttractions)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async fetchTouristAttractionById(req: Request, res: Response) {
    try {
      const registerParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = registerParamsSchema.parse(req.params)
      const fetchTouristAttractionByIdUseCase =
        makeFetchTouristAttractionUseCase()
      const touristAttraction =
        await fetchTouristAttractionByIdUseCase.execute(id)

      res.status(200).json(touristAttraction)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async createTouristAttractions(req: Request, res: Response) {
    try {
      const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        cityId: z.string().uuid(),
        latitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
      })

      const { name, description, cityId, latitude, longitude } =
        registerBodySchema.parse(req.body)

      const createTouristAttractionsUseCase =
        makeCreateTouristAttractionUseCase()

      await createTouristAttractionsUseCase.execute({
        name,
        description,
        cityId,
        latitude,
        longitude,
      })

      res.status(200).json({
        message: 'created successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionAlreadyExists) {
        return res.status(409).send({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }
      console.error(error)
      throw error
    }
  }

  static async createCity(req: Request, res: Response) {
    try {
      const createCityBodySchema = z.object({
        name: z.string(),
        state: z.string(),
        country: z.string(),
        iso: z.string().max(2),
        isCapital: z.coerce.boolean(),
        population: z.coerce.number(),
        populationProper: z.coerce.number(),
        latitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
      })

      const createCity = createCityBodySchema.parse(req.body)
      const createCityUseCase = makeCreateCityUseCase()
      await createCityUseCase.execute(createCity)

      res.status(200).json({
        message: 'created successfully.',
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }
      console.error(error)
      throw error
    }
  }
}
