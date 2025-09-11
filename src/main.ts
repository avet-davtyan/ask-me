import app from "./app";
import ENV from "./util/env.util";
import { logger } from "./util/logger.util";

function bootstrap() {

  app.listen(ENV.SERVER_PORT, () => {
    logger.info(`Server is running on port ${ENV.SERVER_PORT}`);
  });
}

bootstrap();

