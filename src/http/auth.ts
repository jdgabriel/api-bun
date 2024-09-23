import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restauranteId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restauranteId: t.Optional(t.String()),
      }),
    }),
  )
  .derive({ as: 'global' }, ({ jwt, cookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        cookie.auth.value = token
        cookie.auth.httpOnly = true
        cookie.auth.maxAge = 60 * 60 * 24 * 7 // 7 days
        cookie.auth.path = '/'
      },
      signOut: () => {
        cookie.auth.remove()
      },
      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie.auth.value)
        if (!payload) {
          throw new Error('Unauthorized.')
        }
        return {
          userId: payload.sub,
          restauranteId: payload.restauranteId,
        }
      },
    }
  })
