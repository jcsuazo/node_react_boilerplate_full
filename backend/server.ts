import createServer from './createServer';
import { HttpException } from './helper/classes/HttpException';
var colors = require('colors/safe');

const app = createServer();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    colors.yellow.underline(`service is running on http://localhost:${PORT}`),
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: HttpException) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
