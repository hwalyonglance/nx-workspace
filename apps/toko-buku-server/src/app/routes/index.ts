import { Router } from 'express';

import { APIIndexRouter } from './api/index';

const IndexRouter: Router = Router();

IndexRouter
	.use('/api', APIIndexRouter)

export { IndexRouter };
