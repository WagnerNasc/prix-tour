import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import { ZodError } from 'zod'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
app.use(express.json())
app.use(helmet())

const corsOptions = {
  origin: 'http://localhost:5173',
}
app.use(cors(corsOptions))

/* pre handler log */
app.use(function (req: Request, _res: Response, next: NextFunction) {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

app.use(routes)

app.use(function (req: Request, res: Response, next: NextFunction) {
  if (!req.route) {
    res.status(404).json({ message: 'Route not found.' })
    return
  }
  next()
})

// TODO: adjust middleware
app.use((error: unknown, _req: Request, res: Response) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error.', issues: error.issues })
  } else {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

export default app
