import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'
import { env } from '../env'

export const auth = new Elysia().use(
  jwt({
    secret: env.JWT_SECRET_KEY,
    schema: t.Object({
      sub: t.String(),
      restauranteId: t.Optional(t.String()),
    }),
  }),
)
