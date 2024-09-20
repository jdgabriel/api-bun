import { Elysia, t } from 'elysia'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

const app = new Elysia()
  .post(
    '/restaurants',
    async ({ body, set }) => {
      const { restaurantName, managerName, email, phone } = body

      const [manager] = await db
        .insert(users)
        .values([
          {
            name: managerName,
            email,
            phone,
            role: 'manager',
          },
        ])
        .returning()

      await db.insert(restaurants).values([
        {
          name: restaurantName,
          managerId: manager.id,
        },
      ])

      set.status = 204
    },
    {
      body: t.Object({
        restaurantName: t.String(),
        managerName: t.String(),
        email: t.String({ format: 'email' }),
        phone: t.String(),
      }),
    },
  )
  .get('/', () => {
    return {
      hello: 'world',
    }
  })

app.listen(3333, () => {
  console.log(`Server running at http://localhost:3333`)
})
