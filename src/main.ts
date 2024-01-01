import { ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import helmet from "helmet";

import { AppModule } from "./app.module";
import initSwagger from "./common/configs/swagger.config";
import { PrismaClientExceptionFilter } from "./common/exceptions/prisma.exceptions";

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  initSwagger(app);

  app.use(helmet());
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port, hostname);
}

bootstrap().then(() => {
  console.log(`Application is listening on IP ${hostname} port ${port}`);
});
