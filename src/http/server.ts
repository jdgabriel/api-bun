import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'

import { getManagedRestaurante } from '@routes/get-managed-restaurant'
import { getProfile } from '@routes/get-profile'
import { registerRestaurante } from '@routes/register-restaurant'
import { sendAuthLink } from '@routes/send-auth-link'
import { signOut } from '@routes/sign-out'
import { env } from '../env'

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
  .use(sendAuthLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurante)
  .use(registerRestaurante)

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
