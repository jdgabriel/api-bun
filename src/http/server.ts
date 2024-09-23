import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'

import { env } from '@env'
import { approveOrder } from '@routes/approve-order'
import { cancelOrder } from '@routes/cancel-order'
import { deliverOrder } from '@routes/deliver-order'
import { dispatchOrder } from '@routes/dispatch-order'
import { getManagedRestaurante } from '@routes/get-managed-restaurant'
import { getMonthReceipt } from '@routes/get-month.receipt'
import { getOrderDetails } from '@routes/get-order-details'
import { getOrders } from '@routes/get-orders'
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
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
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
  .use(getOrders)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(getMonthReceipt)

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
