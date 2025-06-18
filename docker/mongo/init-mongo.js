import { env } from '../../src/env'

db.createUser({
  user: env.MONGO_DATABASE_NAME,
  pwd: env.MONGO_DATABASE_PASSWORD,
  roles: [{ role: "root", db: "admin" }],
});