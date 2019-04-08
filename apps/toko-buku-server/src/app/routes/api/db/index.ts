import { Router } from 'express';

import { FileIndexRouter } from './file/index';

const DBIndexRouter: Router = Router();

DBIndexRouter
	.use('/file', FileIndexRouter)

export { DBIndexRouter };
