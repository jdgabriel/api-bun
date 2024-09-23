import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'

import { env } from '@env'
import { getManagedRestaurante } from '@routes/get-managed-restaurant'
import { getOrderDetails } from '@routes/get-order-details'
import { getProfile } from '@routes/get-profile'
import { registerRestaurante } from '@routes/register-restaurant'
import { sendAuthLink } from '@routes/send-auth-link'
import { signOut } from '@routes/sign-out'

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
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      default: {
        console.error(error)
        return new Response(null, { status: 500 })
      }
    }
  })
  .use(sendAuthLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurante)
  .use(registerRestaurante)
  .use(getOrderDetails)

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
