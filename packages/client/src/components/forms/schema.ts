import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  description: z
    .string()
    .min(3, 'Descrição muito curta')
    .max(255, 'Descrição muito longa'),
  latitude: z.string().min(1, 'Latitude inválida'),
  longitude: z.string().min(1, 'Longitude inválida'),
  imageLink: z.string().url('URL inválida'),
  cityId: z.string().min(1, 'Selecione uma cidade'),
})
