import app from "./app";
import ENV from "./util/env.util";

function bootstrap() {

  app.listen(ENV.SERVER_PORT, () => {
    console.log(`Server is running on port ${ENV.SERVER_PORT}`);
  });
}

bootstrap();

