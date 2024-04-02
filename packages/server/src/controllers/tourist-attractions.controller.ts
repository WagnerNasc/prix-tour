import { makeFetchTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-fetch-tourist-attraction'
import {
  BadRequest,
  CityNotFound,
  TouristAttractionNotFound,
} from '@use-cases/errors'
import { makeCreateCityUseCase } from '../use-cases/factories/city/make-create-city'
import { makeCreateTouristAttractionUseCase } from '../use-cases/factories/tourist-attraction/make-create-tourist-attraction'
import { makeListTouristAttractionsUseCase } from '@use-cases/factories/tourist-attraction/make-list-tourist-attractions'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { makeUpdateTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-update-tourist-attraction'
import { makeInvalidTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-invalid-tourist-attraction'
import { makeListCitiesUseCase } from '@use-cases/factories/tourist-attraction/make-list-cities'

export class TouristAttractionsController {
  static async listTouristAttractions(req: Request, res: Response) {
    try {
      const listTouristAttractionQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
        pageSize: z.coerce.number().min(10).max(50).default(10),
      })

      const { filter, page, pageSize } = listTouristAttractionQuerySchema.parse(
        req.query,
      )
      const listTouristAttractionsUseCase = makeListTouristAttractionsUseCase()
      const touristAttractions = await listTouristAttractionsUseCase.execute({
        filter,
        page,
        pageSize,
      })

      return res.json(touristAttractions)
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async fetchTouristAttraction(req: Request, res: Response) {
    try {
      const fetchTouristAttractionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = fetchTouristAttractionParamsSchema.parse(req.params)

      const fetchTouristAttractionByIdUseCase =
        makeFetchTouristAttractionUseCase()
      const touristAttraction =
        await fetchTouristAttractionByIdUseCase.execute(id)

      res.status(200).json(touristAttraction)
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async updateTouristAttraction(req: Request, res: Response) {
    try {
      const updateTouristAttractionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const updateTouristAttractionQuerySchema = z.object({
        name: z.string().optional(),
        description: z.string(),
        imageLink: z.string().url().optional(),
      })

      const { id } = updateTouristAttractionParamsSchema.parse(req.params)
      const { name, description, imageLink } =
        updateTouristAttractionQuerySchema.parse(req.query)
      const updateTouristAttractionByIdUseCase =
        makeUpdateTouristAttractionUseCase()

      await updateTouristAttractionByIdUseCase.execute({
        id,
        name,
        description,
        imageLink,
      })

      res.status(200).json({
        message: 'updated successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async invalidTouristAttraction(req: Request, res: Response) {
    try {
      const invalidTouristAttractionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = invalidTouristAttractionParamsSchema.parse(req.params)
      const invalidTouristAttractionByIdUseCase =
        makeInvalidTouristAttractionUseCase()

      await invalidTouristAttractionByIdUseCase.execute(id)

      res.status(200).json({
        message: 'deleted successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async createTouristAttraction(req: Request, res: Response) {
    try {
      const createTouristAttractionBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        cityId: z.string().uuid(),
        latitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
        imageLink: z.string().url().optional(),
      })

      const { name, description, cityId, latitude, longitude, imageLink } =
        createTouristAttractionBodySchema.parse(req.body)

      const createTouristAttractionsUseCase =
        makeCreateTouristAttractionUseCase()

      await createTouristAttractionsUseCase.execute({
        name,
        description,
        cityId,
        latitude,
        longitude,
        imageLink,
      })

      res.status(200).json({
        message: 'created successfully.',
      })
    } catch (error: any) {
      if (error instanceof CityNotFound) {
        return res.status(409).send({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      if (error instanceof BadRequest) {
        return res.status(400).json({
          message: error.message,
        })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }

  static async listCities(req: Request, res: Response) {
    try {
      const citiesQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
        pageSize: z.coerce.number().min(10).max(50).default(1),
      })

      const { filter, page, pageSize } = citiesQuerySchema.parse(req.query)
      const citiesUseCase = makeListCitiesUseCase()
      const cities = await citiesUseCase.execute({
        filter,
        page,
        pageSize,
      })

      return res.json(cities)
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      res.status(500).json({ message: 'Internal server error.' })
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

      res.status(200).json({
        message: 'created successfully.',
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      res.status(500).json({ message: 'Internal server error.' })
    }
  }
}
