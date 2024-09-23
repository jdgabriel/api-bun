import { Elysia, t } from 'elysia'

import jwt from '@elysiajs/jwt'
import { env } from '../env'
import { registerRestaurante } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restauranteId: t.Optional(t.String()),
      }),
    }),
  )
  .use(registerRestaurante)
  .use(sendAuthLink)

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
