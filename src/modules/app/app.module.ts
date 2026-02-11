import { type MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "../task/task.module";
import { MovieModule } from "../movie/movie.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getTypeOrmConfig } from "../../infra/config/typeorm.config";
import { ReviewModule } from '../review/review.module';
import { ActorModule } from '../actor/actor.module';
import { PrismaModule } from "../../prisma/prisma.module";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { ChatModule } from "../chat/chat.module";
import { PhoneModule } from "../phone/phone.module";
import { SoundcloudModule } from "@/soundcloud/soundclound.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    SoundcloudModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}