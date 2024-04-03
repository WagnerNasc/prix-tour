import { makeCreateCityUseCase } from '../use-cases/factories/city/make-create-city'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { makeListCitiesUseCase } from '@use-cases/factories/city/make-list-cities'

export class CitiesController {
  static async listCities(req: Request, res: Response) {
    try {
      const citiesQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
      })

      const { filter, page, limit } = citiesQuerySchema.parse(req.query)
      const citiesUseCase = makeListCitiesUseCase()
      const cities = await citiesUseCase.execute({
        filter,
        page,
        pageSize: limit,
      })

      return res.json(cities)
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      return res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async createCity(req: Request, res: Response) {
    try {
      const createCityBodySchema = z.object({
        name: z.string(),
        stateId: z.string(),
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

      return res.status(201).json({
        message: 'created successfully.',
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      return res.status(500).json({ message: 'Internal server error.' })
    }
  }
}
