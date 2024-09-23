import { Elysia } from 'elysia'

import { registerRestaurante } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia().use(registerRestaurante).use(sendAuthLink)

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
