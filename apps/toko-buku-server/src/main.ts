declare var __dirname: any, require: any, process: any;

import { app, PORT } from './app/server';

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	}
	console.log(`Listening at http://localhost:${PORT}`);
});
