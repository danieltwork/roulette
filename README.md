# Roulette

## Getting started

1. Run application in development mode:

```bash
$ yarn start
```

2. Visit [`localhost:3000`](http://localhost:3000)

**That's it!** :sunglasses:

## Scripts

* `$ yarn start` - Start application in development mode.

* `$ yarn prod:start` - Start application with `PM2`.

* `$ yarn prod:stop` - Stop application with `PM2`.

* `$ yarn prod:restart` - Restart application with `PM2`.

* `$ yarn build` - Make production build.

* `$ yarn lint` - Check code linting.

## Local environment configuration

To override configuration variables for local environment create `.env` file in project root with needed variables. Example:
```
NODE_ENV=development
PORT=3000
```
To find used variables check `configs/index.js` and `server/config.js`.

