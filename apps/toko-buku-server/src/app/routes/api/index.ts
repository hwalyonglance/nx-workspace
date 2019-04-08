import { Router } from 'express';

import { DBIndexRouter } from './db/index';

const APIIndexRouter: Router = Router();

APIIndexRouter
	.use('/db', DBIndexRouter)

export { APIIndexRouter };
