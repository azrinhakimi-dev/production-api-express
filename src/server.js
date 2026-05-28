import app from './app.js';
import logger from '#config/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
  logger.info(`Listening on port ${PORT}`);
});
