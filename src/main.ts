import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptions } from "./common/filters/all-exceptions.filter";
import { SwaggerModule } from "@nestjs/swagger";
import { getSwaggerConfig } from "./infra/config/swagger.config";
import { MovieModule } from "./modules/movie/movie.module";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new AllExceptions());

  const config = getSwaggerConfig();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
    
  });
  SwaggerModule.setup("docs", app, documentFactory, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml'
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
