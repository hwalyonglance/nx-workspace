/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { app, PORT } from './app/server';

app.get('/api', (req, res) => {
  res.send({message: `Welcome to rental-mobil-server!`});
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${PORT}`);
});
