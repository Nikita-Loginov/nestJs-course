import { DynamicModule, Module } from "@nestjs/common";
import { SoundcloudService } from "./soundclound.service";
import { HttpModule } from "@nestjs/axios";
import {
  ISoundcloundAsyncOptions,
  ISoundcloundOptions,
  SoundcloundOptionsSymbol,
} from "./interface/soundclound-options.interface";
import { SoundcloudController } from "./soundclound.controller";

@Module({})
export class SoundcloundModule {
  static forRoot(options: ISoundcloundOptions): DynamicModule {
    return {
      module: SoundcloundModule,
      imports: [HttpModule],
      controllers: [SoundcloudController],
      providers: [
        {
          provide: SoundcloundOptionsSymbol,
          useValue: options,
        },
        SoundcloudService,
      ],
      exports: [SoundcloudService],
      global: true,
    };
  }

  static forRootAsync(options: ISoundcloundAsyncOptions): DynamicModule {
    return {
      module: SoundcloundModule,
      imports: [HttpModule, ...(options.imports ?? [])],
      controllers: [SoundcloudController],
      providers: [
        {
          provide: SoundcloundOptionsSymbol,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        SoundcloudService,
      ],
      exports: [SoundcloudService],
      global: true,
    };
  }
}
