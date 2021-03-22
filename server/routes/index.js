import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { status } from '../handlers/status';
import { errors } from '../handlers';
import { dropRoulette } from "../handlers/dropRoulette";


const router = new Router();

router.use(
  cors({ origin: true }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
);

router.get('/', status);
router.get('/roulette', dropRoulette)

// error handling
router.use(
  errors.notFound,
  errors.format,
  errors.handler,
);

export default router;
