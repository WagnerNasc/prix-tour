import { makeFetchTouristAttractionUseCase } from '@use-cases/factories/tourist-attraction/make-fetch-tourist-attraction'
import {
  BadRequest,
  CityNotFound,
  TouristAttractionNotFound,
} from '@use-cases/errors'
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
        page: z.coerce.number().default(1),
        pageSize: z.coerce.number().default(10),
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

      return res.status(200).json(touristAttractions)
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }

      return res.status(500).json({ message: 'Internal server error.' })
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

      return res.status(500).json({ message: 'Internal server error.' })
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

      return res.status(204).json({
        message: 'updated successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      return res.status(500).json({ message: 'Internal server error.' })
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

      return res.status(204).json({
        message: 'deleted successfully.',
      })
    } catch (error) {
      if (error instanceof TouristAttractionNotFound) {
        return res.status(404).send({ message: error.message })
      }

      return res.status(500).json({ message: 'Internal server error.' })
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

      return res.status(201).json({
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

      return res.status(500).json({ message: 'Internal server error.' })
    }
  }
}
