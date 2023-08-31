# bookss-server

[@](https://bookkss.fly.dev) BE deployment, fly

### Local

Steps to run:

1. set `DATABASE_URL` and `SECRET` in .env

1. `npx prisma generate`

1. `npm run dev`

### fly deploy instructions

`tsc` then deploy

```
fly deploy
```

set fly secrets

```
fly secrets set DATABASE_URL=***
```

### Testing

currently using local db for testing
