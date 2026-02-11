import { type MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "../task/task.module";
import { MovieModule } from "../movie/movie.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getTypeOrmConfig } from "../../infra/config/typeorm.config";
import { ReviewModule } from "../review/review.module";
import { ActorModule } from "../actor/actor.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { ChatModule } from "../chat/chat.module";
import { PhoneModule } from "../phone/phone.module";
import { SoundcloundModule } from "@/modules/soundcloud/soundclound.module";
import { getSoundcloudConfig } from "@/infra/config/soundcloud.config";
import { FileModule } from "../file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'uploads'),
      serveRoot: '/static'
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: getTypeOrmConfig,
    //   inject: [ConfigService],
    // }),
    TaskModule,
    MovieModule,
    ReviewModule,
    ActorModule,
    PrismaModule,
    ChatModule,
    PhoneModule,
    SoundcloundModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSoundcloudConfig,
      inject: [ConfigService],
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
