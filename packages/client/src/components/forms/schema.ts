import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  description: z
    .string()
    .min(3, 'Descrição muito curta')
    .max(255, 'Descrição muito longa'),
  latitude: z.string(),
  longitude: z.string(),
  image: z.string().url(),
  cityId: z.string(),
})
