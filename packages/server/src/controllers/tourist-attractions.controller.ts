import { makeFetchTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-fetch-tourist-attraction'
import {
  InternalServer,
  TouristAttractionAlreadyExists,
  TouristAttractionNotFound,
} from '@use-cases/errors'
import { makeCreateCityUseCase } from '../use-cases/factories/tourist-attraction/make-create-city'
import { makeCreateTouristAttractionUseCase } from '../use-cases/factories/tourist-attraction/make-create-tourist-attraction'
import { makeListTouristAttractionsUseCase } from '@use-cases/factories/tourist-attraction/make-list-tourist-attractions'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { makeUpdateTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-update-tourist-attraction'
import { makeInvalidTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-invalid-tourist-attraction'

export class TouristAttractionsController {
  static async listTouristAttractions(req: Request, res: Response) {
    try {
      const listTouristAttractionQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
      })

      const { filter, page } = listTouristAttractionQuerySchema.parse(req.query)
      const listTouristAttractionsUseCase = makeListTouristAttractionsUseCase()
      const touristAttractions = await listTouristAttractionsUseCase.execute({
        filter,
        page,
      })

      return res.json(touristAttractions)
    } catch (error) {
      throw new InternalServer()
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

      throw new InternalServer()
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
      })

      const { id } = updateTouristAttractionParamsSchema.parse(req.params)
      const { name, description } = updateTouristAttractionQuerySchema.parse(
        req.query,
      )
      const updateTouristAttractionByIdUseCase =
        makeUpdateTouristAttractionUseCase()

      await updateTouristAttractionByIdUseCase.execute({
        id,
        name,
        description,
      })

      res.status(200).json({
        message: 'updated successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      throw error
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

      throw new InternalServer()
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
      })

      const { name, description, cityId, latitude, longitude } =
        createTouristAttractionBodySchema.parse(req.body)

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

      throw new InternalServer()
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

      throw new InternalServer()
    }
  }
}
